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
    //высота моника - высота нижнего баннера - - высота верхней панели навигации
    height: calc(100vh - 120px - 80px); 
    overflow: hidden;
  }
  .application > main > .container {
    min-height: 0;
    height: 100%;
  }
  // * {
  //   cursor: none !important;
  // }
</style>