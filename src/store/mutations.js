/*
  Слежат посредником между Экшинами (actions) и Хранилищем (store)
*/

export default {
  set(state, { type, items }) {
    state[type] = items
  },
  setDepth(state, { type, items }) {
    state[type[0]][type[1]] = items
  },
  setDepthDeeper(state, { type, items }) {
    state[type[0]][type[1]][type[2]] = items
  },
  add(state, { type, items }) {
    state[type].push(items)
  },
  addDepth(state, { type, items }) {
    state[type[0]][type[1]].push(items)
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
