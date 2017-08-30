/*
  Экшены ТОЛЬКО получают данные и посредством commit (mutation) передают в хранилище state
*/

export default {
  setData({ commit }, data){
    commit('set', { type: query.type, items: data.query })
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
    let query = [      
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
      {
        id: 17,
        name: 'Финтифлюшка хакки',
        price: 9000,
        stock: 11,
        unit: 'кг'
      },      
      {
        id: 18,
        name: 'Финтифлюшка хакки',
        price: 9000,
        stock: 11,
        unit: 'кг'
      },      
      {
        id: 19,
        name: 'Финтифлюшка хакки',
        price: 9000,
        stock: 11,
        unit: 'кг'
      },      
      {
        id: 20,
        name: 'Финтифлюшка хакки',
        price: 9000,
        stock: 11,
        unit: 'кг'
      }
    ]
    commit('set', { type: 'products', items: query })
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
    if (id) {
      query = [
        {
          'id': 1,
          'name': 'Тут типа подкатегория длинное название',
          'img': 'category.jpg',
          'childrens': true
        },
        {
          'id': 2,
          'name': 'короткое название',
          'img': 'category.jpg',
          'childrens': true
        }
      ]
    } else {
      query = [
        {
        'id': 11,
        'name': 'Категория1',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 12,
        'name': 'Категория2',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 13,
        'name': 'Категория3',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 14,
        'name': 'Категория4',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 15,
        'name': 'Категория5',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 16,
        'name': 'Категория6',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 17,
        'name': 'Категория7',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 18,
        'name': 'Общестрой',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 19,
        'name': 'Кровельные материалы',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 20,
        'name': 'Категория20',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 21,
        'name': 'Категори21',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 13,
        'name': 'Категория3',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 14,
        'name': 'Категория4',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 15,
        'name': 'Категория5',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 16,
        'name': 'Категория6',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 17,
        'name': 'Категория7',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 18,
        'name': 'Общестрой',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 19,
        'name': 'Кровельные материалы',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 20,
        'name': 'Категория20',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 21,
        'name': 'Категори21',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 13,
        'name': 'Категория3',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 14,
        'name': 'Категория4',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 15,
        'name': 'Категория5',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 16,
        'name': 'Категория6',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 17,
        'name': 'Категория7',
        'img': 'category.jpg',
        'childrens': false
        },
        {
        'id': 18,
        'name': 'Общестрой',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 19,
        'name': 'Кровельные материалы',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 20,
        'name': 'Категория20',
        'img': 'category.jpg',
        'childrens': false
        },  
        {
        'id': 21,
        'name': 'Категори21',
        'img': 'category.jpg',
        'childrens': false
        }
      ]
    }
    commit('set', { type: 'categorys', items: query })
  }
}