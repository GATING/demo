import Vue from 'vue'
import VueRouter from 'vue-router'
import { flatten } from 'lodash'
import Layout from '@/layout'

Vue.use(VueRouter)

const rts = require.context('./modules', true, /\.js$/)
let children = flatten(rts.keys().map(e => rts(e).default))

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
