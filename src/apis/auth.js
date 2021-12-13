// 将所有的接口封装成 API 再使用，便于统一维护管理
import request from "@/helpers/request";

const URL = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  GET_INFO: "/auth"
};

export default {
  // 注册
  register({ username, password }) {
    return request(URL.REGISTER, "POST", { username, password });
  },
  // 登录
  login({ username, password }) {
    return request(URL.LOGIN, "POST", { username, password });
  },
  // 注销
  logout() {
    return request(URL.LOGOUT);
  },
  // 获取用户信息
  getInfo() {
    return request(URL.GET_INFO);
  }
};
