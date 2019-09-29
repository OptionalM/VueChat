import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';
import Chat from './components/Chat.vue';
import Login from './components/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Chat',
      component: Chat,
      beforeEnter: (to, from, next) => {
        if (store.state.username === undefined) {
          next('/login');
        }
        next();
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

export default router;
