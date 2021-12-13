// axios封装统一接口
import axios from "axios";
import baseURLConfig from "./config-baseURL";
import { Message } from "element-ui";

// 对于所有 post 请求设置统一的 Content-Type
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// 服务端的线上接口地址 baseURL
axios.defaults.baseURL = baseURLConfig.baseURL;
// 是否使用跨域请求
axios.defaults.withCredentials = true;

// request(url,type,data) 函数
export default function request(url, type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      // 如果状态码不符合以下要求，则直接 catch
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400;
      }
    };
    if (type.toLowerCase() === "get") {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option)
      .then(res => {
        // 返回数据时，如果状态码是200说明请求成功，调用 resolve
        // Message 来自 element-ui 的提示
        if (res.status === 200) {
          resolve(res.data);
        } else {
          Message.error(res.data.msg);
          reject(res.data);
        }
      })
      .catch(err => {
        Message.error("网络异常");
        reject({ msg: "网络异常" });
      });
  });
}

// request('/auth/login', 'POST', {username: 'Chayym', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })
