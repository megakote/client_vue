<template>
  <div class="remove_btn" @click="remove(id)">
    <v-btn primary fab small dark>
      <v-icon>close</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'remove_btn',
  data () {
    return {

    }
  },
  props: ['id'],
  methods: {
    remove (id) {
      console.log(id)
      this.$store.dispatch('removeFromCart', id)
    }
  },
  computed: {

  }
}
</script>

<style scss>
  .remove_btn {
  }
</style>