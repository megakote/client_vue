<template>
  <div>
    <p>Карточка товара {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>