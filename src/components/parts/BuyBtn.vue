<template>
  <div class="buy_btn" @click="buy(id)">
    <v-btn color="primary" fab small dark>
      <v-icon>add_shopping_cart</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'overlay',
  data () {
    return {

    }
  },
  props: ['id'],
  methods: {
    buy (id) {
      //this.$store.dispatch('modal_visible', false)
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
  .buy_btn {
  }
</style>