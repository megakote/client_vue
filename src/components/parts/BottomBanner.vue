<template>
  <div class="text-xs-center bottom_banner_wrapper">
    <img :src="src" alt="">
  </div>
</template>

<script>
export default {
  name: 'BottomBanner',
  data () {
    return {
      img: '/static/images/banner.png'
    }
  },
  props: [],
  computed:{
    src: function() {
      return this.img + '?hash=' + Math.random(0,9999999)
    }
  }
}
</script>

<style lang="scss">
  .bottom_banner_wrapper {
    height: 116px;
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>