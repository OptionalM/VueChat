import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';
import Chat from './components/Chat.vue';
import SelectUsername from './components/SelectUsername.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'chat',
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
      name: 'username',
      component: SelectUsername,
    },
  ],
});

export default router;
