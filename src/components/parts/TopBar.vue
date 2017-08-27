<template>
  <v-card height="55px" style="position: relative">
    <v-bottom-nav style="position: relative" value="true" class="transparent">
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
          <v-icon v-badge="{ value: 6, left: true}">shopping_cart</v-icon>
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
  watch: {
    '$route' (to, from) {
      this.$parent.history.push(to)
    }
  }
}
</script>

<style scss>
  .toolbar__title {
    align-self: center;
    position: absolute;
    left: 0;
  }
  .cart_wrapper {
    position: absolute;
    right: 0;
  }
</style>