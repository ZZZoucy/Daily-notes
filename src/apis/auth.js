// 将所有的接口封装成 API
// 这个文件主要是做登录验证的
import request from "@/helpers/request";

const URL = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  GET_INFO: "/auth"
};

export default {
  register({ username, password }) {
    return request(URL.REGISTER, "POST", { username, password });
  },

  login({ username, password }) {
    return request(URL.LOGIN, "POST", { username, password });
  },

  logout() {
    return request(URL.LOGOUT);
  },

  getInfo() {
    return request(URL.GET_INFO);
  }
};
