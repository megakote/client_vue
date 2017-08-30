import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    keyboard_visible: false,
    keyboard_target: null,
    modal_visible: false,
    search_input: '',
    results: [],
    categorys: [],
    products: [],
    cart: [
        {
          id: 10,
          name: 'Финтифлюшка зеленая',
          price: 100,
          count: 1,
          stock: 10,
          unit: 'шт'
        },
        {
          id: 11,
          name: 'Финтифлюшка красная',
          price: 500,
          count: 2,
          stock: 3,
          unit: 'шт'
        }, 
    ]
  },
  getters,
  mutations,
  actions
})

export default store