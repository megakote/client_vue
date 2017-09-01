<template>
  <v-card height="100%">
    <v-layout grid-list-sm>
      <v-flex xs6>
        <div class="product_images">
          <div class="main_img" :style="'background-image: url(/static/images/' + images[activeImage] + ')'"></div>
          <ul class="product_images_thumbs">
            <li 
              v-for="(image, i) in images" 
              :key="i"
              :class="{active: activeImage == i}"
              :style="'background-image: url(/static/images/' + image + ')'"
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
        <div class="description">{{ description }}</div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      name: 'Финтифлюшка',
      category: 'Родительская категория',
      price: 100,
      count: 1,
      stock: 10,
      unit: 'шт',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint fugit laboriosam voluptatum doloremque nulla deleniti accusamus consequatur laudantium voluptates, autem, quidem, neque iste quod vitae maiores voluptatem totam distinctio delectus.',
      images: ['product.jpg','product2.jpg','product3.jpg'],
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
  watch: {
    id: function () {      
      /*
       Тут запрашиваем инфу для товара из базы
      */
    }
  }
}
</script>

<style lang="scss" scoped>
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
      .input-number, 
      .input-number-decrement, 
      .input-number-increment {
        height: 60px;
        width: 60px !important;
        line-height: 60px;
      }
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