/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msgs: [],
    username: undefined,
  },
  mutations: {
    addMsg(state, msg) {
      state.msgs.push(msg);
    },
    setMsgs(state, msgs) {
      state.msgs = msgs;
    },
    setUsername(state, username) {
      state.username = username;
    },
  },
});
