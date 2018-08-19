import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import home from '@/page/home'
import item from '@/page/item'
import score from '@/page/score'

Vue.use(Router)

export default new Router({
  // mode:history,
  routes: [
    
    {
      path: '/',
      // name: 'App',// 父路由存在会报错
      component: App,
      children:[
        {
          path:'',
          name:'home',
          component:home
        },
        {
          path:'item',
          name:'item',
          component:item
        },
        {
          path:'score',
          name:'score',
          component:score
        },
      ]
    }
  ]
})
