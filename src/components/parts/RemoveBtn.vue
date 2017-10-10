<template>
  <div class="remove_btn" @click="remove">
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
  props: ['id','name'],
  methods: {
    remove (event) {
      this.$store.dispatch('removeFromCart', this.id)
      this.$snotify.warning('Удалено', this.name, {
        timeout: 3000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false
      });
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