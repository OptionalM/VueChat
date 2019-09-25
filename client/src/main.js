import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

// Connect to the Socket
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:4200',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
