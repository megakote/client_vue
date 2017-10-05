<template>
  <v-app light >
    <top-bar :title='title' />
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <bottom-banner />
    <keyboard-search />
    <overlay/>
  </v-app>
</template>

<script>
  export default {
    data: function () {
      return {
        title: 'Клуб мастеров',
        history: [] // История переходов в сессии
      }
    },
    methods: {
    },
    computed: {
      url () {
        //return this.$resource('http://client.my')
      }
    },
    watch: {
      '$route' (to, from) {
        this.$store.dispatch('addDepthData', { type: ['session','history'], items: to.path })
      }
    },
    created: function () {
      this.$store.dispatch('getCart')
    }
  }
</script>

<style lang="stylus">
  @import './styles/vuetify'
</style>
<style lang="scss">
  @import './styles/fonts/fonts';
  @import './styles/fonts/material-icons';
  html {
    overflow-y: auto;
  }
  main {
    //высота моника - высота нижнего баннера - 1px потому что FF иначе дает скролл - высота верхней панели навигации
    //height: calc(100vh - 120px - 1px - 80px);
    //overflow: hidden;
    height: calc(1024px - 80px - 116px);
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
  // * {
  //   cursor: none !important;
  // }
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
</style>