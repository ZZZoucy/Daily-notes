// 对应 Avatar/NotebookList

import Auth from "@/apis/auth";
import router from "@/router";

const state = {
  user: null
};

const getters = {
  // 未登录时展示‘未’，登录后头像展示出用户名的第一个字符
  username: state => (state.user === null ? "未登录" : state.user.username),
  slug: state => (state.user === null ? "未" : state.user.username.charAt(0))
};

const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};

const actions = {
  // 登录
  login({ commit }, { username, password }) {
    return Auth.login({ username, password }).then(res => {
      commit("setUser", { user: res.data });
    });
  },

  // 注册
  register({ commit }, { username, password }) {
    return Auth.register({ username, password }).then(res => {
      commit("setUser", { user: res.data });
    });
  },

  // 注销
  logout({ commit }, payload = { path: "/login" }) {
    return Auth.logout().then(res => {
      commit("setUser", { user: null });
      console.log(payload);
      router.push(payload);
    });
  },

  // 检查是否登录
  // 未登录，跳转至登录界面
  // 登录了，对应将头像展示出用户名的第一个字符
  checkLogin({ commit, state }, payload = { path: "/" }) {
    if (state.user !== null) return Promise.resolve();
    return Auth.getInfo().then(res => {
      if (!res.isLogin) {
        console.log("jump");
        router.push(payload);
      } else {
        commit("setUser", { user: res.data });
      }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
