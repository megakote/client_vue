<template>
    <v-toolbar>     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon large @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>      
      <v-btn icon large :to="{ name: 'Categorys' }">
        <v-icon>folder</v-icon>
      </v-btn>      
      <v-btn icon large>
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon large :to="{ name: 'Cart' }">
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script>
export default {
  name: 'TopBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['title'],
  methods: {
    back: function () {
      this.$router.go(-1)
      //console.log(this.$parent.history)
    }
  },
  watch: {
    '$route' (to, from) {
      this.$parent.history.push(to)
    }
  }
}
</script>