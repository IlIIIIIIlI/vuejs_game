import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/waiting',
    name: 'Waiting',
    component: () => import('../views/Waiting.vue')
  },
  {
    path: '/background',
    name: 'Background',
    component: () => import('../views/Background.vue')
  },
  {
    path: '/NewGame',
    name: 'NewGame',
    component: () => import('../views/NewGame.vue')
  },
  {
    path: '/JoinGame',
    name: 'JoinGame',
    component: () => import('../views/JoinGame.vue')
  },
  {
    path: '/ChooseYourRole',
    name: 'ChooseYourRole',
    component: () => import('../views/ChooseYourRole.vue')
  },
  {
    path: '/RoleDescription',
    name: 'RoleDescription',
    component: () => import('../views/RoleDescription.vue')
  },
  {
    path: '/ChapterBackground',
    name: 'ChapterBackground',
    component: () => import('../views/ChapterBackground.vue')
  },
  {
    path: '/Discussion',
    name: 'Discussion',
    component: () => import('../views/Discussion.vue')
  },
  {
    path: '/RoleDescription',
    name: 'RoleDescription',
    component: () => import('../views/RoleDescription.vue')
  },
  {
    path: '/RoleBackground',
    name: 'RoleBackground',
    component: () => import('../views/RoleBackground.vue')
  },
  {
    path: '/Ready',
    name: 'Ready',
    component: () => import('../views/Ready.vue')
  },
  {
    path: '/Discussion',
    name: 'Discussion',
    component: () => import('../views/Discussion.vue')
  },
  {
    path: '/IndividualBackground',
    name: 'IndividualBackground',
    component: () => import('../views/IndividualBackground.vue')
  },
  {
    path: '/Outcome',
    name: 'Outcome',
    component: () => import('../views/Outcome.vue')
  },
  {
    path: '/Reflection',
    name: 'Reflection',
    component: () => import('../views/Reflection.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
