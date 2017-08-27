// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import TopBar from '@/components/parts/TopBar'
import Pagination from '@/components/parts/Pagination'
import SearchBlock from '@/components/parts/SearchBlock'
import Overlay from '@/components/parts/Overlay'
import Keyboard from '@/components/parts/Keyboard'
import VueKeyboard from 'vue-keyboard'
import BuyBtn from '@/components/parts/BuyBtn'


Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.component('top-bar', TopBar)
Vue.component('pagination', Pagination)
Vue.component('search-block', SearchBlock)
Vue.component('overlay', Overlay)
Vue.component('keyboard-new', Keyboard)
Vue.component('keyboard', VueKeyboard)
Vue.component('buy-btn', BuyBtn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
