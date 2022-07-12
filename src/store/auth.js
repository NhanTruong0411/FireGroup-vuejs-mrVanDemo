import api from "@/plugins/api";
import cookie from "@/plugins/cookie";
let token = cookie.get('test_token')

// STATE
const state = {
  user: null,
  token: token ? token : '',
};


// GETTERS = computed
const getters = {
  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.token;
  },
};


// MUTATIONS = setters for getters
const mutations = {
  // set user
  setUser(state, payload) {
    state.user = payload;
  },
  // set token
  setToken(state, payload) {
    state.token = payload;
    cookie.set("test_token", payload, {
      expires: 7,
    });
  },
  // remove user
  removeUser(state) {
    state.user = null;
  },
  // remove token
  removeToken(state) {
    state.token = "";
    cookie.remove("test_token");
  },
};


// ACTIONS
const actions = {
  async login({ commit }, payload) {
    try {
      let res = await api.AUTH.login(payload);
      let { status, data } = res;
      if (status && data) {
        commit("setToken", data.token);
      }
      return res;
    } catch (error) {
      throw error;
    }
  },

  async register({ commit }, payload) {
    try {
      let res = await api.AUTH.register(payload);
      let { status, data } = res;
      if (status && data) {
        commit("setToken", data.token);
      }
      return res;
    } catch (error) {
      throw error;
    }
  },

  async fetchUser({ commit }) {
    try {
      let res = await api.AUTH.fetchUser();
      let { data } = res;
      if (data) {
        commit("setUser", data);
      }
      return res;
    } catch (error) {
      throw error;
    }
  },

  logout({ commit }) {
    commit("removeUser");
    commit("removeToken");
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
