import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex);

const state = {
  user: ls.getItem('user'),
  token: ls.getItem('token')
};

const mutations = {
  UPDATE_USER(state, user) {
    state.user = user;
    ls.setItem('user', user)
  },
  UPDATE_TOKEN(state, token) {
    state.token = token;
    ls.setItem('token', token);
  }
};

const actions = {
  login({ commit }, user) {
    if (user) commit('UPDATE_USER', user);
  },
  theToken({ commit }, token) {
    if (token) commit('UPDATE_TOKEN', token);
  },
  logout({ commit }) {
    commit('UPDATE_USER', {});
    commit('UPDATE_TOKEN', {});
    router.push({ name: 'Home', params: { logout: true } })
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store
