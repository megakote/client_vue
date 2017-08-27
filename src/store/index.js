import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    keyboard_visible: false,
    keyboard_target: null,
    modal_visible: false,
    search_input: '',
    results: [],
    categorys: [],
    products: [
      {
        id: 10,
        name: 'Финтифлюшка зеленая',
        price: 100,
        stock: 5,
        unit: 'шт'
      },
      {
        id: 11,
        name: 'Финтифлюшка красная',
        price: 100,
        stock: 5,
        unit: 'шт'
      },      
      {
        id: 12,
        name: 'Финтифлюшка розовая',
        price: 45,
        stock: 2,
        unit: 'шт'
      },      
      {
        id: 13,
        name: 'Финтифлюшка черная',
        price: 320,
        stock: 11,
        unit: 'шт'
      },      
      {
        id: 14,
        name: 'Финтифлюшка алая',
        price: 1,
        stock: 51,
        unit: 'шт'
      },      
      {
        id: 15,
        name: 'Финтифлюшка бирюзовая',
        price: 120,
        stock: 5,
        unit: 'шт'
      },      
      {
        id: 16,
        name: 'Финтифлюшка хакки',
        price: 9000,
        stock: 11,
        unit: 'кг'
      },
    ],
    cart: [
      {
        id: 10,
        count: 1
      }
    ]
  },
  getters: {
    results(state) {
      return state.results.map(item => {
        item.url = 'https://ru.wikipedia.org/wiki/' + item.title
        return item
      })
    },
    keyboard_visible(state) {
      return state.keyboard_visible
    },    
    products(state) {
      return state.products
    },  
    categorys(state) {
      return state.categorys
    },
    keyboard_target(state) {
      return state.keyboard_target
    },
    search_input(state) {
      return state.search_input
    },
    modal_visible(state) {
      return state.modal_visible
    }
  },
  mutations: {
    set(state, { type, items }) {      
      state[type] = items
    }
  },
  actions: {
    keyboard_visible({ commit }, query){
      commit('set', { type: 'keyboard_visible', items: query })
    },
    keyboard_target({ commit }, query){
      commit('set', { type: 'keyboard_target', items: query })
    },
    modal_visible({ commit }, query){
      if (query === false) {
        commit('set', { type: 'search_input', items: '' })
      }
      commit('set', { type: 'modal_visible', items: query })
    },  
    products({ commit }, query){
      commit('set', { type: 'products', items: query })
    },
    search_input({ commit }, query){
      commit('set', { type: 'search_input', items: query })
    },  
    getCategory({ commit }, id){
      let query = []
      if (id) {
        query = [
        {
          'id': 1,
          'name': 'Тут типа подкатегория длинное название',
          'img': 'category.jpg'
        },
        {
          'id': 2,
          'name': 'короткое название',
          'img': 'category.jpg'
        }
        ]
      } else {
        query = [{
          'id': 11,
          'name': 'Категория1',
          'img': 'category.jpg'
          },
          {
          'id': 12,
          'name': 'Категория2',
          'img': 'category.jpg'
          },
          {
          'id': 13,
          'name': 'Категория3',
          'img': 'category.jpg'
          },  
          {
          'id': 14,
          'name': 'Категория4',
          'img': 'category.jpg'
          },  
          {
          'id': 15,
          'name': 'Категория5',
          'img': 'category.jpg'
          },  
          {
          'id': 16,
          'name': 'Категория6',
          'img': 'category.jpg'
          },
          {
          'id': 17,
          'name': 'Категория7',
          'img': 'category.jpg'
          },
          {
          'id': 18,
          'name': 'Общестрой',
          'img': 'category.jpg'
          },  
          {
          'id': 19,
          'name': 'Кровельные материалы',
          'img': 'category.jpg'
          },  
          {
          'id': 20,
          'name': 'Категория20',
          'img': 'category.jpg'
          },  
          {
          'id': 21,
          'name': 'Категори21',
          'img': 'category.jpg'
          }
        ]
      }
      commit('set', { type: 'categorys', items: query })
    }
  }
})

export default store