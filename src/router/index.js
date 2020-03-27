import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const auth = router.app.$options.store.state.token.access_token

  if (auth && (to.path.indexOf('register') !== -1 || to.path.indexOf('login') !== -1)) {
    next('/')
  } else {
    next()
  }
});

export default router
