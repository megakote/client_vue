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
  banners_visible({ commit }, query){
    commit('set', { type: 'banners_visible', items: query })
  },
  admin_visible({ commit }, query){
    commit('set', { type: 'admin_visible', items: query })
  },
  keyboard_target({ commit }, query){
    commit('set', { type: 'keyboard_target', items: query })
  },
  modal_visible({ commit }, query){
    commit('set', { type: 'modal_visible', items: query })
  },
  more_info({ commit }, query){
    commit('set', { type: 'more_info', items: query })
  },
  top_bar_blocked({ commit }, query){
    commit('set', { type: 'top_bar_blocked', items: query })
  },
  searchProducts({ commit }, query){
    /*
      Получаем дочерние товары категории id
    */
    instance.post('search', {q: query})
      .then(function (response) {
        let data = (response.data) ? response.data : []
        commit('set', { type: 'products', items: data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  removeFromCart({ commit }, id){
    instance.post('cart/remove', {id: id})
      .then(function (response) {
        let data = response.data;
        commit('set', { type: 'cart', items: data })
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  addCartProduct({ commit, state }, query){
    /*
      Добавляем товар в корзину на сервере
    */
    instance.post('cart/add', {data: query})
      .then(function (response) {
        let data = response.data;
        commit('set', { tupe: 'in_progress', items: false})
        commit('set', { type: 'cart', items: data })
      })
      .catch(function (error) {
        commit('set', { tupe: 'in_progress', items: false})
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
    commit('set', { type: 'product', items: {image:[]} })
    instance.get('product/' + id)
      .then(function (response) {
        let data = response.data
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
    let cat_id = (id) ? '/' + id : ''
    instance.get('category' + cat_id)
      .then(function (response) {
        let data = (response.data) ? response.data : []
        data.push({
          'created_at':"",
          'guid':"00000000",
          'id':0,
          'image':"https://www.iconexperience.com/_img/o_collection_png/green_dark_grey/512x512/plain/arrow_right.png",
          'items_parent':0,
          'name':"Еще",
          'parent_id':"",
          'updated_at':"",
        })
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
    commit('setDepth', { type: ['session','contacts'], items: contacts })
    let data = JSON.stringify(contacts)
    instance.post('cart/add_contacts', {contacts: data})
      .catch(function (error) {
        console.log(error);
      });
  },
  completeOrder ({ commit }, [reason, cashin = 0]) {
    /*
      Отпрвляем завершенный заказ на сервер
    */
    commit('set', { type: 'cart', items: [] })
    commit('setDepth', { type: ['session','contacts'], items: {
        name: '',
        email: '',
        tel: '',
        address: '',
        date: new Date().toISOString().substring(0, 10),
        timeRange: ''
      } })
    commit('setDepth', { type: ['session','history'], items: [] })
    instance.post('cart/complete', {reason: reason, cashin: cashin})
      .then(function (response) {

      })
      .catch(function (error) {
        console.log(error);
      })
  },
  endSession ({ commit }) {
    /*
      TODO: Здесь закрываем сессию и отправляем данные на сервер
    */
  }
}