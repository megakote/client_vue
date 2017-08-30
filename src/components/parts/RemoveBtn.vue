<template>
  <div class="remove_btn" @click="remove(id)">
    <v-btn primary fab meduim dark>
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
      this.$store.dispatch('removeFromCart', id)
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">
  .remove_btn {
    .btn--floating {
      height: 46px;
      width: 46px;
      .icon {
        font-size: 30px;
      }
    }
  }
</style>