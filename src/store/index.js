import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
const d = new Date()
var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}
let date = d.toLocaleString("ru", options)
const store = new Vuex.Store({
  state: {
    banners_visible: false,
    admin_visible: false,
    keyboard_visible: false,
    keyboard_target: null,
    modal_visible: false,
    top_bar_blocked: false,
    search_input: '',
    results: [],
    categorys: [],
    product: {
      image: [],
    },
    products: [],
    cart: [],
    session: { //Данные активной сессии
      startTime: Date.now() / 1000 | 0, // Время старта сессии в unixTime формате (только секунды)
      endTime: 0, // Время закрытия сессии, вычисляется при отправке на сервер.
      history: [], // История посещений
      contacts: {
        name: '',
        email: '',
        tel: '',
        address: '',
        date: new Date().toISOString().substring(0, 10),
        timeRange: ''
      },
      cart: [], // Корзина
    },
    config: {
      id: '000', // Айдишник терминала
      canCash: false, // Имеет ли возможность принимать наличные
      canPrint: false, // Имеет ли возможность печатать чеки
      idleSession: 0, // Минимальное время сессии (по истечении этого времени, после последнего действия будет начата новая)
    }
  },
  getters,
  mutations,
  actions
})

export default store