/*
  Геттеры ТОЛЬКО возвращают данные из хранилища state
*/

export default {
    results(state) {
      return state.results.map(item => {
        item.url = 'https://ru.wikipedia.org/wiki/' + item.title
        return item
      })
    },
    contacts(state) {
      return state.session.contacts
    },
    banners_visible(state) {
      return state.banners_visible
    },
    admin_visible(state) {
      return state.admin_visible
    },
    keyboard_visible(state) {
      return state.keyboard_visible
    },
    products(state) {
      return state.products
    },
    product(state) {
      return state.product
    },
    cartProducts(state) {
      return state.cart
    },
    categorys(state) {
      return state.categorys
    },
    more_info(state) {
      return state.more_info
    },
    keyboard_target(state) {
      return state.keyboard_target
    },
    search_input(state) {
      return state.search_input
    },
    modal_visible(state) {
      return state.modal_visible
    },
    top_bar_blocked(state) {
      return state.top_bar_blocked
    }
}