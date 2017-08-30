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
      let row = event.target.parentElement.parentElement.parentElement.parentElement
      row.className += "animate"
      let obj = this
      setTimeout(function(){
        obj.$store.dispatch('removeFromCart', id)
        row.classList.remove("animate")
      }, 500);
      
      
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