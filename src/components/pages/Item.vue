<template>
  <v-card height="100%">
    <v-layout grid-list-sm>
      <v-flex xs6>
        <div class="product_images">
          <div class="main_img" :style="'background-image: url(http://client.my/prods_images/' + guid + '/' + images[activeImage] + ')'"></div>
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
<!--           <number-input
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
        <!-- <div class="description" v-html="description"></div> -->
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog.state" width="500px" lazy absolute>
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
    },
    dialogShow () {
      this.dialog.state = true
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
  .layout .flex {
    padding-left: 15px;
    padding-right: 15px;
  }

  .product_images {
    padding: 20px 15px 40px;
    .main_img {
      height: 400px;
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
    margin-top: 60px;
  }
</style>