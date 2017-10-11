<template>
  <v-card class="search-block" v-if="visible && modalVisible" transition="scale-transition">
    <v-text-field
      autofocus
      v-model="search_input"
      name="input-1-3"
      label="Что ищем ?"
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
    }
  },
  props: ['visible'],
  methods: {
    show: function(e) {
      this.$store.dispatch('keyboard_visible', true)

    }
  },
  computed: {
    modalVisible: function() {
      return this.$store.getters.modal_visible
    },
    search_input: function() {
      return this.$store.getters.search_input
    }
  },
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