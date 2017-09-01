<template>
  <v-app light >
    <top-bar :title='title' />
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <bottom-banner />
    <keyboard-new />
    <overlay/>
  </v-app>
</template>

<script>
  export default {
    data: function () {
      return {
        title: 'Server Name',
        history: [] // История переходов в сессии
      }
    },
    methods: {
    },
    watch: {
      '$route' (to, from) {
        this.$store.dispatch('addDepthData', { type: ['session','history'], items: to.path })
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'

</style>
<style lang="scss">
  html {
    overflow-y: auto;
  }
  main {
    //высота моника - высота нижнего баннера - 1px потому что FF иначе дает скролл - высота верхней панели навигации
    height: calc(100vh - 120px - 1px - 80px); 
    overflow: hidden;
  }
  .application > main > .container {
    min-height: 0;
    height: 100%;
  }
  img {
    max-width: 100%;
  }
  // * {
  //   cursor: none !important;
  // }
</style>