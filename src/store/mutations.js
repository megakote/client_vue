/*
  Слежат посредником между Экшинами (actions) и Хранилищем (store)
*/

export default {
  set(state, { type, items }) {
    state[type] = items
  },
  add(state, { type, items }) {
    state[type].push(items)
  },
  change(state, { type, id, count }) {
    let tempState = state[type]
    tempState.forEach(function(item, i, arr) {
      if (item.id == id) {
        state[type][i].count = count
      }
    })
  },
  remove(state, { type, id }) {
    let removeId = null
    state[type].forEach(function(item, i, arr) {
      if (item.id == id) {
        removeId = i
      }
    })
    state[type].splice(removeId, 1)
  }
}
