import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Categorys from '@/components/pages/Categorys'
import items from '@/components/pages/ItemsList'
import item from '@/components/pages/item'
import cart from '@/components/pages/Cart'
import search from '@/components/pages/Search'

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
      path: '/products/:id',
      name: 'Products',
      component: items
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: item
    },
    {
      path: '/cart',
      name: 'Cart',
      component: cart
    },
    {
      path: '/search',
      name: 'Search',
      component: search
    },
    {
      path: '*',
      redirect: { name: 'Categorys' }
    }
  ]
})
