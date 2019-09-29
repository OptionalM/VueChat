/* eslint no-param-reassign: ["error", { "props": false }] */
import axios from 'axios';

export default {
  state: {
    currentJWT: '',
  },
  getters: {
    jwt: (state) => state.currentJWT,
    jwtData: (state, getters) => (state.currentJWT ? JSON.parse(atob(getters.jwt.split('.')[1])) : null),
    jwtSubject: (state, getters) => (getters.jwtData ? getters.jwtData.sub : null),
    jwtIssuer: (state, getters) => (getters.jwtData ? getters.jwtData.iss : null),
  },
  mutations: {
    setJWT(state, jwt) {
      // When this updates, the getters and anything bound to them updates as well.
      state.currentJWT = jwt;
    },
  },
  actions: {
    fetchJWT({ commit }, { username, password }) {
      console.log(process.env.API_PORT);
      return axios.post(`http://localhost:${process.env.VUE_APP_API_PORT}/auth`, { username, password })
        .then((res) => {
          commit('setJWT', res.data);
        });
    },
  },
};
