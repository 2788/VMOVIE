import Vue from 'vue'
import Router from 'vue-router'
import inTheaters from '../components/inTheaters'
import comingSoon from '../components/comingSoon'
import moviesMsg from '../components/moviesMsg'
import searchPage from '../components/searchPage'
import ranking from '../components/ranking'
import mainView from '../components/mainView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/main',
      name: 'main',
      component: mainView,
      children:[
        {
          path: 'inTheaters',
          component:inTheaters
        },
        {
          path: 'comingSoon',
          component:comingSoon
        },
        {
          path: 'ranking',
          component:ranking
        },
      ]
    },
    {
      path: '/movie/:id',
      name: 'moviesMsg',
      component: moviesMsg
    },
    {
      path: '/search',
      name: 'search',
      component: searchPage
    }
  ],
})
