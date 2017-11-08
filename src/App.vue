<template>
  <v-app light >
    <top-bar :title='title' />
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <vue-snotify :class="'material'"></vue-snotify>
    </main>
    <bottom-banner />
    <keyboard-search />
    <full-screen-banners />
    <admin-zone />
    <overlay />
  </v-app>
</template>

<script>
  document.ondragstart=function(){return false}
  export default {
    data () {
      return {
        title: 'Клуб мастеров',
        history: [], // История переходов в сессии
        no_active_delay: 600, // Количество секунд простоя мыши, при котором пользователь считается неактивным
        now_no_active: 0, // Текущее количество секунд простоя мыши
      }
    },
    methods: {
    },
    computed: {
    },
    watch: {
      '$route' (to, from) {
        this.$store.dispatch('addDepthData', { type: ['session','history'], items: to.path })
      }
    },
    created: function () {
      this.$store.dispatch('getCart')
      // let date = new Date()
      // this.$store.dispatch('setData', { type : ['session', 'contacts', 'date'], items: date})
      this.$router.push({ name: 'Categorys'})
    },
    mounted: function () {
      let _this = this
      this.$nextTick(function () {
        document.onmousemove = () => {
          _this.now_no_active = 0
        }
        setInterval(function() {
          // Каждую секунду увеличиваем количество секунд простоя мыши
          _this.now_no_active++
        }, 1000)
        setInterval(function() {
          // Если простой слишком долгий то
          if (_this.now_no_active >= _this.no_active_delay) {
            // Если в корзину что-то положили
            if (_this.$store.getters.cartProducts.length > 0) {
              _this.$store.dispatch('completeOrder', ['timeout'])
            }
            _this.$store.dispatch('modal_visible', false)
            _this.$store.dispatch('search_input', '')
            _this.$router.push({ name: 'Categorys'})
           // _this.$store.dispatch('banners_visible', true)
          } else {
            //_this.$store.dispatch('banners_visible', false)
          }
        }, 1000)
      })
    }
  }
</script>

<style lang="stylus">
  @import './styles/vuetify'
</style>
<style lang="scss">
  @import './styles/fonts/fonts';
  @import './styles/fonts/material-icons';
  @import "~vue-snotify/styles/material.css";
  html {
    overflow-y: auto;
  }
  main {
    //высота моника - высота нижнего баннера - 1px потому что FF иначе дает скролл - высота верхней панели навигации
    //height: calc(100vh - 120px - 1px - 80px);
    //overflow: hidden;
    height: calc(1024px - 80px - 116px - 1px);
  }
  .application > main > .container {
    min-height: 0;
    height: 100%;
  }
  img {
    max-width: 100%;
  }
  #app {
    width: 1280px;
    height: 1024px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
  }
  .btn {
    height: auto;
    min-height: 36px;
  }
  * {
    cursor: none !important;
  }

  .application--light {
    // Ну стрем же!
    // background: #def0f9;
    color: rgba(0,0,0,0.87);
  }
</style>



<style lang="scss">
.snotify {
  width: 350px;
  .snotifyToast__title {
    font-size: 1.4em;
  }
}
</style>
<style lang="scss">
  .pagination {
    height: 45px;
    .pagination__navigation {
      height: 40px;
      width: 40px;
      margin: 0.3rem 20px;
    }
    .pagination__item {
      height: 40px;
      width: 40px;
      font-size: 17px;
      margin: 0.4rem;
    }
  }
  // Строчка в блоке ввода количества.
  .subheadline {
    padding: 16px;
  }

</style>