<template>
  <v-card height="100%">
    <v-layout grid-list-sm>
      <v-flex xs6>
        <div class="product_images">
          <div class="main_img"
            :style="'background-image: url(' + item.image[activeImage] + ')'"
            @click.stop="dialog.image = true"
          ></div>
          <ul class="product_images_thumbs">
            <li
              v-for="(image, i) in item.image"
              v-if="item.image.length > 1"
              :key="i"
              :class="{active: activeImage == i}"
              :style="'background-image: url('+ image +')'"
              @click="setActive(i)"
            >
            </li>
          </ul>
        </div>
      </v-flex>
      <v-flex xs6>
        <h2>{{ item.name }}</h2>
        <h6>{{ item.parent }}</h6>
        <span class="price"><b>Цена:</b> {{ item.price }} р.</span>
        <span class="stock"><b>На складе:</b> {{ item.count }} {{ item.unit }}</span>
        <div class="actions_wrapper">
          <v-btn primary large dark @click.stop="dialogShow">
            <v-icon>add_shopping_cart</v-icon>
            <span>В корзину</span>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

    <div class="description" @click.stop="descriptionDialogShow()" v-html="item.description"></div>

    <v-dialog v-model="dialog.description" width="100%" lazy absolute>
      <v-card>
        <v-card-title class="headline">{{item.name}}</v-card-title>
        <v-card-text v-html="item.description"></v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog.image" width="auto" :content-class="'image_popup'">
      <img :src="item.image[activeImage]" :alt="item.name" />
    </v-dialog>
    <v-dialog v-model="dialog.state" width="460px" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">{{ item.name }}</div>
        </v-card-title>
        <span class="subheadline">Доступно для заказа: {{ item.count }}{{ item.unit }}</span>
        <v-card-text>Введите количество</v-card-text>
          <number-input
            :val="1"
            :min="1"
            :max="item.count"
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
export default {
  name: 'item',
  data () {
    return {
      dialog: {
        state: false,
        description: false,
        image: false,
      },
      activeImage: 0
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    item () {
      return this.$store.getters.product
    },
  },
  methods: {
    setActive (i) {
      this.activeImage = i
    },
    countChange (id, val) {
      this.count = val
    },
    addCart () {
      this.$store.dispatch('addCartProduct', {id: this.id, count: this.item.count})
      this.dialog.state = false
      this.$snotify.success('Добавлен в корзину ' + this.item.count + ' ' + this.item.unit, this.item.name, {
        timeout: 5000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      });
    },
    getProduct () {
      this.$store.dispatch('getProduct', this.id)
    },
    dialogShow () {
      this.dialog.state = true
    },
    descriptionDialogShow () {
      this.dialog.description = true
    }
  },
  mounted: function() {
    this.activeImage = 0
    this.getProduct()
  }
}
</script>

<style lang="scss">
  .image_popup {
    box-shadow: none !important;
  }
  .btn__content {
    padding: 5px 15px ;
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