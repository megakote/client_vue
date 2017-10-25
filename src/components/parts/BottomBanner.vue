<template>
  <div class="text-xs-center bottom_banner_wrapper">
    <img src="/static/images/banner.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BottomBanner',
  data () {
    return {

    }
  },
  props: [],
  computed:{
    pages: function() {

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