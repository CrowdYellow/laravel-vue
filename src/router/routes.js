export default [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
]