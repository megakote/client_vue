<template>
  <div id="overlay" v-if="modal_visible" @click="modal_close"></div>
</template>

<script>
export default {
  name: 'overlay',
  data () {
    return {

    }
  },
  props: [],
  methods: {
    modal_close () {
      this.$store.dispatch('modal_visible', false)
    }
  },
  computed: {
    modal_visible () {        
      return this.$store.getters.modal_visible
    }
  }
}
</script>

<style scss>
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;    
    background: rgba(0,0,0,0.7);
  }
</style>