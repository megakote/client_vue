import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'





Vue.use(Vuex)
Vue.use(VueResource);

const store = new Vuex.Store({
  state: {
    keyboard_visible: false,
    keyboard_target: null,
    modal_visible: false,
    top_bar_blocked: false,
    search_input: '',
    results: [],
    categorys: [],
    products: [],
    cart: [],
    session: { //Данные активной сессии
      startTime: Date.now() / 1000 | 0, // Время старта сессии в unixTime формате (только секунды)
      endTime: 0, // Время закрытия сессии, вычисляется при отправке на сервер.
      history: [], // История посещений
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