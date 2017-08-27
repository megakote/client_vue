<template>
  <v-app light>
    <top-bar :title='title'/>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>   
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
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
  .toolbar {
    height: 70px;
  }
  .footer {
    height: 36px;
  }
  main {
    height: calc(100vh - 36px - 70px);
    overflow: hidden;
  }
  .application > main > .container {
    min-height: 0;
    height: 100%;
  }
</style>