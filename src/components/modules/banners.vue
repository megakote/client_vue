<template>
  <div
    v-if="banner_visible"
    class="banner"
    :style="'background-image: url(' + images[activeImage] + ')'"
  >
  </div>
</template>

<script>
import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://backend.my/api/'
});
export default {
  name: 'banner',
  data () {
    return {
      images: [],
      activeImage: 0,
      delay: 8, // Через сколько секунд сменять баннер
      timer: '',
      banner_active: false,
    }
  },
  computed: {
    banner_visible () {
      return this.$store.getters.banners_visible
    }
  },
  watch: {
    banner_visible (e) {
      let delay = this.delay * 1000
      let _this = this
      if (e && !this.banner_active) {
        this.banner_active = true
        this.timer = setInterval(function() {
          if (_this.activeImage + 1 == _this.images.length){
            _this.activeImage = 0
          } else {
            _this.activeImage++
          }
        }, delay)
      } else {
        this.banner_active = false
        clearInterval(this.timer)
      }
    }
  },
  mounted () {
    let _this = this
    instance.get('getbanners')
      .then(function (response) {
        _this.images = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style scss>
  .banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    transition: all .5s;
  }
</style>