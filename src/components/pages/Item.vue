<template>
  <v-card height="100%">
    <v-layout grid-list-sm>
      <v-flex xs6>
        <div class="product_images">
          <div class="main_img" :style="'background-image: url(http://client.my/public/prods_images/' + guid + '/' + images[activeImage] + ')'"></div>
          <ul class="product_images_thumbs">
            <li
              v-for="(image, i) in images"
              v-if="images.length > 1"
              :key="i"
              :class="{active: activeImage == i}"
              :style="'background-image: url(http://client.my/public/prods_images/' + guid + '/' + image + ')'"
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
          <number-input
            :val="count"
            :min="1"
            :max="stock"
            @change="countChange"
          />
          <v-btn primary large dark @click.stop="addCart">
            <v-icon>add_shopping_cart</v-icon>
            <span>В корзину</span>
          </v-btn>
        </div>
        <!-- <div class="description" v-html="description"></div> -->
      </v-flex>
    </v-layout>
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
      name: 'Финтифлюшка',
      category: 'Родительская категория',
      guid: 123,
      price: 100,
      count: 1,
      stock: 10,
      unit: 'шт',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint fugit laboriosam voluptatum doloremque nulla deleniti accusamus consequatur laudantium voluptates, autem, quidem, neque iste quod vitae maiores voluptatem totam distinctio delectus.',
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
    }
  },
  mounted: function() {
    this.count = 1
    this.activeImage = 0
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