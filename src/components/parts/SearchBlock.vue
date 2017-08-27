<template>
  <v-card class="search-block" v-if="visible && modalVisible" transition="scale-transition">
    <v-text-field
      autofocus
      v-model="search_input"
      name="input-1-3"
      label="Hint Text"
      single-line      
      @focus="show"
      data-layout="normal"
    ></v-text-field>
  </v-card>
</template>

<script>
export default {
  name: 'search-block',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  props: ['visible'],
  methods: {
    show: function(e) {
      //console.log(document.getElementById("search_input"))
      this.$store.dispatch('keyboard_visible', true)
      
    }
  },
  // watch: {
  //   visible: function () {
  //     this.$store.dispatch('keyboard_target', document.getElementById("search_input"))
  //   }
  // },
  computed: {
    modalVisible: function() {
      return this.$store.getters.modal_visible
    },
    search_input: function() {
      return this.$store.getters.search_input
    }
  }
}
</script>

<style scss>
  .search-block {
    position: absolute;
    left: 50%;
    bottom: -90px;
    background: #FFF;
    z-index: 10;
    height: 90px !important;
    width: 500px;    
    margin-left: -250px;
    padding: 0 30px;
  }
</style>