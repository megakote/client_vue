// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import TopBar from '@/components/parts/TopBar'
import BottomBanner from '@/components/parts/BottomBanner'
import Pagination from '@/components/parts/Pagination'
import SearchBlock from '@/components/parts/SearchBlock'
import Overlay from '@/components/parts/Overlay'
import Keyboard from '@/components/parts/Keyboard'
import VueKeyboard from 'vue-keyboard'
import BuyBtn from '@/components/parts/BuyBtn'
import RemoveBtn from '@/components/parts/RemoveBtn'
import NumberInput from '@/components/parts/NumberInput'


Vue.use(Vuetify)
Vue.config.productionTip = false


Vue.component('top-bar', TopBar)
Vue.component('bottom-banner', BottomBanner)
Vue.component('pagination', Pagination)
Vue.component('search-block', SearchBlock)
Vue.component('overlay', Overlay)
Vue.component('keyboard-new', Keyboard)
Vue.component('keyboard', VueKeyboard)
Vue.component('buy-btn', BuyBtn)
Vue.component('remove-btn', RemoveBtn)
Vue.component('number-input', NumberInput)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
