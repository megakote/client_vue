<template>
  <v-card height="100%">
    <v-layout grid-list-sm>
      <v-flex xs6>
        <div class="product_images">
          <div class="main_img"
            :style="'background-image: url(http://client.my/prods_images/' + guid + '/' + images[activeImage] + ')'"
            @click.stop="dialog.image = true"
          ></div>
          <ul class="product_images_thumbs">
            <li
              v-for="(image, i) in images"
              v-if="images.length > 1"
              :key="i"
              :class="{active: activeImage == i}"
              :style="'background-image: url(http://client.my/prods_images/' + guid + '/' + image + ')'"
              @click="setActive(i)"
            >
            </li>
          </ul>
        </div>
      </v-flex>
      <v-flex xs6>
        <h2>{{ name }}</h2>
        <h6>{{ category }}</h6>
        <span class="price"><b>Цена:</b> {{ price }} р.</span>
        <span class="stock"><b>На складе:</b> {{ stock }} {{ unit }}</span>
        <div class="actions_wrapper">
          <!--<number-input
            :val="count"
            :min="1"
            :max="stock"
            @change="countChange"
          /> -->
          <v-btn primary large dark @click.stop="dialogShow">
            <v-icon>add_shopping_cart</v-icon>
            <span>В корзину</span>
          </v-btn>
        </div>

      </v-flex>

    </v-layout>
    <div class="description" @click.stop="descriptionDialogShow()" v-html="description"></div>
    <v-dialog v-model="dialog.description" width="100%" lazy absolute>
      <v-card>
        <v-card-title class="headline">{{name}}</v-card-title>
        <v-card-text v-html="description"></v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog.image" width="auto" :content-class="'image_popup'">
      <img :src="'http://client.my/prods_images/' + guid + '/' + images[activeImage] " :alt="name" />
    </v-dialog>
    <v-dialog v-model="dialog.state" width="460px" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">{{ name }}</div>
        </v-card-title>
        <v-card-text>Введите количество</v-card-text>
          <number-input
            :val="count"
            :min="1"
            :max="stock"
            :id="id"
            :full=true
            @change="countChange"
          />
        <v-card-actions>

          <v-btn class="darken-1" error @click.native="dialog.state = false">
            <v-icon left dark>block</v-icon>
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" primary @click.native="addCart">
            Добавить
            <v-icon right dark>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
  name: 'item',
  data () {
    return {
      dialog: {
        state: false,
        description: false,
        image: false,
      },
      name: '',
      category: '',
      guid: 0,
      price: 0,
      count: 1,
      stock: 0,
      unit: '',
      description: '',
      images: [],
      activeImage: 0
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    setActive (i) {
      this.activeImage = i
    },
    countChange (id, val) {
      this.count = val
    },
    addCart () {
      this.$store.dispatch('addCartProduct', {id: this.id, count: this.count})
      this.dialog.state = false
      this.$snotify.success('Добавлен в корзину ' + this.count + ' ' + this.unit, this.name, {
        timeout: 5000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      });
    },
    dialogShow () {
      this.dialog.state = true
    },
    descriptionDialogShow () {
      this.dialog.description = true
    }
  },
  mounted: function() {
    this.count = 1
    this.activeImage = 0
    // Сбросим старые данные, чтобы не было мельканий
    this.name = ''
    this.category = ''
    this.price = 0
    this.stock = 0
    this.guid = 0
    this.unit = ''
    this.description = ''
    this.images = []
    // Закончили сброс )
    let data
    let id = this.id
    let resource = Vue.resource('http://client.my/api/product{/id}')
    resource.get({id: id}).then(response => {
      data = response.body;
      this.name = data.name
      this.category = data.parent
      this.price = data.price
      this.stock = data.count
      this.guid = data.guid
      this.unit = data.unit
      this.description = data.description
      this.images = data.image
    }, response => {
      // error callback
    });

  }
}
</script>

<style lang="scss">
  .image_popup {
    box-shadow: none !important;
  }
</style>
<style lang="scss" scoped>
  .card {
    padding: 10px 5px;
  }
  .layout .flex {
    padding-left: 15px;
    padding-right: 15px;
  }

  .image_popup {
    img {
      max-height: 100%;
    }
  }
  .product_images {
    padding: 20px 15px 40px;
    .main_img {
      //height: 400px;
      height: 300px;
      margin-bottom: 50px;
      background-position: center center;
      background-size: contain;
      border: 1px solid #dae2e6;
      border-radius: 2px;
    }
    .product_images_thumbs {
      list-style-type: none;
      display: flex;
      justify-content: center;
      padding: 0;
      li {
        width: 100px;
        height: 100px;
        margin: 0 10px;
        border: 1px solid transparent;
        background-position: center center;
        background-size: contain;
        &.active {
          border: 1px solid #CCC;
        }
      }
    }
  }

  h2 {
    font-size: 40px;
    margin-bottom: 10px;
    line-height: 50px;
    margin-top: 15px;
  }

  h6 {
    font-weight: 400;
    margin-bottom: 40px;
  }

  .actions_wrapper {
    display: flex;
    justify-content: flex-start;
    margin-top: 60px;
    .input-number_wrapper {
      margin-right: 50px;
    }
  }

  .price,
  .stock {
    font-size: 30px;
    display: block;
  }

  .description {
    margin-top: 20px;
    height: 250px;
    padding: 0 15px;
    overflow: hidden;
    box-shadow: inset 0px -18px 12px -1px rgba(255, 255, 255, 0.75);
  }
</style>