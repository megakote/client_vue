// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import VueResource from 'vue-resource'
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
import StepThree from '@/components/parts/cart/step-three'


import VueMask from 'v-mask'

Vue.use(VueMask);
Vue.use(VueResource);
Vue.use(Vuetify)

Vue.config.productionTip = false


Vue.component('top-bar', TopBar)
Vue.component('bottom-banner', BottomBanner)
Vue.component('pagination', Pagination)
Vue.component('search-block', SearchBlock)
Vue.component('overlay', Overlay)
Vue.component('keyboard-search', Keyboard)
Vue.component('keyboard', VueKeyboard)
Vue.component('buy-btn', BuyBtn)
Vue.component('remove-btn', RemoveBtn)
Vue.component('number-input', NumberInput)
Vue.component('step-three', StepThree)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
