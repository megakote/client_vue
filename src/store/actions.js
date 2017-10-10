/*
  Экшены ТОЛЬКО получают данные и посредством commit (mutation) передают в хранилище state
*/
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);
import Snotify from 'vue-snotify'
Vue.use(Snotify)
export default {
  addData({ commit }, data){    // Добавляет данные в объект store
    commit('add', { type: data.type, items: data.items })
  },
  addDepthData({ commit }, data){    // Добавляет данные во вложенный массив (например session.history)
    commit('addDepth', { type: data.type, items: data.items })
  },
  setData({ commit }, data){
    commit('set', { type: data.type, items: data.items })
  },
  keyboard_visible({ commit }, query){
    commit('set', { type: 'keyboard_visible', items: query })
  },
  keyboard_target({ commit }, query){
    commit('set', { type: 'keyboard_target', items: query })
  },
  modal_visible({ commit }, query){
    commit('set', { type: 'modal_visible', items: query })
  },
  searchProducts({ commit }, query){
    /*
      Получаем дочерние товары категории id
    */
    let data = []
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    Vue.http.get('http://client.my/api/search', {params: {q: query}}).then(response => {

      data = response.body;
      commit('set', { type: 'products', items: data })

    }, response => {
      // error callback
    });

  },
  removeFromCart({ commit }, id){
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    Vue.http.post('http://client.my/api/cart/remove', {id: id}).then(response => {
      let data = response.body;
      commit('set', { type: 'cart', items: data })

    }, response => {
      // error callback
    });

  },
  addCartProduct({ commit }, query){
    /*
      Добавляем товар в корзину на сервере
    */
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    Vue.http.post('http://client.my/api/cart/add', {data: query}).then(response => {
      let data = response.body;
      commit('set', { type: 'cart', items: data })

    }, response => {
      // error callback
    });
  },
  changeCount({ commit }, query){
    commit('change', { type: 'cart', id: query.id, count: query.val })
  },
  search_input({ commit }, query){
    commit('set', { type: 'search_input', items: query })
  },
  getProducts({ commit }, id){
    /*
      Получаем дочерние товары категории id
    */
    commit('set', { type: 'products', items: [] })
    let query
    let resource = Vue.resource('http://client.my/api/products{/id}')
    resource.get({id: id}).then(response => {

      query = response.body
      commit('set', { type: 'products', items: query })

    }, response => {
      // error callback
    });

  },
  getCategory({ commit }, id){
    /*
      Получаем список дочерних категорий для id
      Если id не передан, отдаем категории нулевого уровня
    */
    commit('set', { type: 'categorys', items: [] })
    let query = []
    let resource = Vue.resource('http://client.my/api/category{/id}')
    resource.get({id: id}).then(response => {

      if(response.body){
        query = response.body
      }
      commit('set', { type: 'categorys', items: query })

    }, response => {
      // error callback
    });
  },
  getCart({ commit }){
    /*
      Получаем список товаров в корзине
    */
    let query
    let resource = Vue.resource('http://client.my/api/cart')
    resource.get().then(response => {

      query = response.body;
      commit('set', { type: 'cart', items: query })

    }, response => {
      // error callback
    });
  },
  clearCart ({ commit }) {
    commit('set', { type: 'cart', items: [] })
  },
  addContacts ({ commit, state }, contacts) {
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    let data = JSON.stringify(contacts)
    Vue.http.post('http://client.my/api/cart/add_contacts', {contacts: data}).then(response => {
      /*
        TODO: Тут очищаем сессию и корзину
      */
      console.log(123)

    }, response => {
      // error callback
    });
  },
  completeOrder ({ commit }) {
    /*
      Отпрвляем завершенный заказ на сервер
    */
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    Vue.http.post('http://client.my/api/cart/complete',{}).then(response => {
      /*
        TODO: Тут очищаем сессию и корзину
      */
      commit('set', { type: 'cart', items: [] })

    }, response => {
      // error callback
    });
  },
  endSession ({ commit }) {
    /*
      TODO: Здесь закрываем сессию и отправляем данные на сервер
    */
  }
}