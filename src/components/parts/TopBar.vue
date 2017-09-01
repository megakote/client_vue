<template>
  <v-card height="80px" style="position: relative">
    <v-bottom-nav style="position: relative; height: 100%;" value="true" class="transparent">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat light class="teal--text" @click="back">
        <!-- <span>Recents</span> -->
        <v-icon>history</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" :to="{ name: 'Categorys' }">        
        <v-icon>folder</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" @click="modalSearchShow">
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="cart_wrapper">
        <v-btn flat light class="teal--text" :to="{ name: 'Cart' }">          
          <v-icon v-badge="{ value: cartCount, left: true}">shopping_cart</v-icon>
        </v-btn>
      </div>
    </v-bottom-nav>
    <search-block :visible="searchVisible"/>
  </v-card>
</template>

<script>
export default {
  name: 'TopBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchVisible: false
    }
  },
  props: ['title'],
  methods: {
    back: function () {
      this.$router.go(-1)
      //console.log(this.$parent.history)
    },
    modalSearchShow: function() {
      this.searchVisible = true
      this.$store.dispatch('modal_visible', true)
    }
  },
  computed: {
    cartCount () {
      return this.$store.getters.cartProducts.length
    }
  }
}
</script>

<style lang="scss">
  .toolbar__title {
    align-self: center;
    position: absolute;
    left: 10px;
  }
  .cart_wrapper {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
  }
  .icon {
    font-size: 40px;
  }
  .badge::after {
    font-size: 15px;
  }

  .btn--floating.btn--small {
    height: 50px;
    width: 50px;
    .icon {
      font-size: 27px;
    }
  }
</style>