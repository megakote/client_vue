/*
  Экшены ТОЛЬКО получают данные и посредством commit (mutation) передают в хранилище state
*/
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

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
  getProducts({ commit }, id){
    /*
      Получаем дочерние товары категории id 
    */
    let query = []
    let resource = Vue.resource('http://client.my/api/products{/id}')
    resource.get({id: id}).then(response => {
      
      query = response.body;
      commit('set', { type: 'products', items: query })

    }, response => {
      // error callback
    }); 
    
  },
  removeFromCart({ commit }, id){
    commit('remove', { type: 'cart', id: id })
  },
  addCartProduct({ commit, state }, query){
    let cart = state.cart
    let alreadyHave = false
    cart.forEach(function(item, i, arr) {
      if (item.id == query.id) {        
       alreadyHave = true
      }
    })
    if(alreadyHave){      
      commit('change', { type: 'cart', id: query.id, count: query.count })
    } else {
      commit('add', { type: 'cart', items: {id: query.id, count: query.count } })
    }
    
  },
  changeCount({ commit }, query){
    commit('change', { type: 'cart', id: query.id, count: query.val })
  },
  search_input({ commit }, query){
    commit('set', { type: 'search_input', items: query })
  },
  getCategory({ commit }, id){
    /*
      Получаем список дочерних категорий для id
      Если id не передан, отдаем категории нулевого уровня
    */
    let query = []
    let resource = Vue.resource('http://client.my/api/category{/id}')
    resource.get({id: id}).then(response => {
      
      query = response.body;
      commit('set', { type: 'categorys', items: query })

    }, response => {
      // error callback
    });    
  }
}