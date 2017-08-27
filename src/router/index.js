import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Categorys from '@/components/pages/Categorys'
import items from '@/components/pages/ItemsList'
import item from '@/components/pages/item'
import cart from '@/components/pages/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/category/:id?',
      name: 'Categorys',
      component: Categorys,
      props: true
    },
    {
      path: '/items',
      name: 'Items',
      component: items
    },
    {
      path: '/item/:id',
      name: 'Product',
      component: item
    },
    {
      path: '/cart',
      name: 'Cart',
      component: cart
    },
    {
      path: '*',
      redirect: { name: 'Categorys' }
    }
  ]
})
