import Vue from 'vue';
import Router from 'vue-router';
import Chat from './components/Chat.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat,
    },
  ],
});

export default router;
