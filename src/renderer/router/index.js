import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import WelcomeView from '@/components/WelcomeView'
import InspireView from '@/components/InspireView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/welcome',
      name: 'welcome-view',
      component: WelcomeView
    },
    {
      path: '/inspire',
      name: 'inspire',
      component: InspireView
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
