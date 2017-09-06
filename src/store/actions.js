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

    let resource = Vue.resource('http://client.my/api/cart/')
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

    resource.get({id: id}).then(response => {
      
      query = response.body;
      commit('set', { type: 'categorys', items: query })

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
  getCategory({ commit }, id){
    /*
      Получаем список дочерних категорий для id
      Если id не передан, отдаем категории нулевого уровня
    */
    let query
    let resource = Vue.resource('http://client.my/api/category{/id}')
    resource.get({id: id}).then(response => {
      
      query = response.body;
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
    /* TODO: Доделать очистку корзины */
  },
  completeOrder ({ commit, state }, contacts) {
    /*
      Отпрвляем завершенный заказ на сервер
    */

    //let query
    //let resource = Vue.resource('http://client.my/api/cart/complete')
  
    //resource.save('', data).then(response => {
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true
    let data = JSON.stringify(contacts)
    Vue.http.post('http://client.my/api/cart/complete', {contacts: data}).then(response => {
      console.log(data)
      console.log(response)
      /*
        TODO: Тут очищаем сессию и корзину
      */
      //commit('set', { type: 'cart', items: query })

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