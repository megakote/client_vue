/*
  Экшены ТОЛЬКО получают данные и посредством commit (mutation) передают в хранилище state
*/
import Vue from 'vue'
import Snotify from 'vue-snotify'

Vue.use(Snotify)

import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://backend.my/api/',
  //timeout: 1000,
  // headers: {
  //   'Accept': 'application/json',
  //   //'Content-type': 'application/json'
  // },
  // responseType: 'json',
});

export default {
  // sendPost ({ commit }, url, data = {}) {
  //   axios.post('url', data)
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // },
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
  top_bar_blocked({ commit }, query){
    commit('set', { type: 'top_bar_blocked', items: query })
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
    instance.post('cart/add', {data: query})
      .then(function (response) {
        let data = response.data;
        commit('set', { type: 'cart', items: data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  changeCount({ commit }, query){
    commit('change', { type: 'cart', id: query.id, count: query.val })
  },
  search_input({ commit }, query){
    commit('set', { type: 'search_input', items: query })
  },
  getProduct({ commit }, id){
    console.log(id)
    commit('set', { type: 'product', items: [] })
    instance.get('product/' + id)
      .then(function (response) {
        let data = response.data
        if (data.image[0] == "nothing/nothing.jpg") {
          data.images[0] = "/static/images/no_photo.jpg"
        } else {
          let images = data.image.map(function(image) {
            return "http://client.my/prods_images/" + data.guid + '/' + image
          });
          data.images = images
        }
        commit('set', { type: 'product', items: data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getProducts({ commit }, id){
    /*
      Получаем дочерние товары категории id
    */
    commit('set', { type: 'products', items: [] })
    instance.get('products/' + id)
      .then(function (response) {
        let data = response.data
        commit('set', { type: 'products', items: data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getCategory({ commit }, id = ''){
    /*
      Получаем список дочерних категорий для id
      Если id не передан, отдаем категории нулевого уровня
    */
    commit('set', { type: 'categorys', items: [] })

    instance.get('category/' + id)
      .then(function (response) {
        let data = (response.data) ? response.data : []
        commit('set', { type: 'categorys', items: data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getCart({ commit }){
    /*
      Получаем список товаров в корзине
    */
    instance.get('cart')
      .then(function (response) {
        let query = response.data;
        commit('set', { type: 'cart', items: query })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  // clearCart ({ commit }) {
  //   commit('set', { type: 'cart', items: [] })
  // },
  addContacts ({ commit, state }, contacts) {

    instance.post('cart/add_contacts', {contacts: data})
      .catch(function (error) {
        console.log(error);
      });
  },
  completeOrder ({ commit }, reason) {
    /*
      Отпрвляем завершенный заказ на сервер
    */
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    Vue.http.post('http://client.my/api/cart/complete',{reason: reason}).then(response => {

      // Тут очищаем сессию и корзину
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