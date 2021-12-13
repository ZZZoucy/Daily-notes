<!-- Sidebar组件是每一个页面都有的，可以在 App.vue 中全局引用  -->
<template>
  <div id="sidebar">
    <Avatar />
    <div class="icons">
      <router-link to="/note" title="笔记">
        <i class="iconfont icon-note"></i>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"></i>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-trash"></i>
      </router-link>
    </div>
    <div class="login">
      <router-link to="/login" title="登录">
        <i class="iconfont icon-login"></i>
      </router-link>
    </div>
    <div class="logout">
      <i class="iconfont icon-logout" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import { mapActions } from "vuex";

export default {
  components: {
    Avatar
  },

  methods: {
    // 注销账号
    ...mapActions(["logout"]),
    // 注销账号成功后跳转至 login 页面
    onLogout() {
      this.logout({ path: "/login" });
    }
  }
};
</script>

<style lang="less" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
}
.icons {
  margin-top: 15px;

  a {
    padding: 6px 0;
    display: block;
  }
}

.icons .router-link-active {
  background-color: #5e6266;
}
.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.login {
  position: absolute;
  bottom: 50px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}
.iconfont {
  color: #fff;
  font-size: 16px;
}
</style>
