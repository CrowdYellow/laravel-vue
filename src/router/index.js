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
  const app = router.app
  const store = app.$options.store
  const auth = store.state.token.access_token

  app.$message.hide()
  if (!auth && to.meta.auth) {
    next({name: 'Login'})
  } else if (auth && (to.path.indexOf('register') !== -1 || to.path.indexOf('login') !== -1)) {
    next({name: 'Home'})
  } else {
    next()
  }
});

export default router
