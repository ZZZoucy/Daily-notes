<template>
  <div class="nav">
    <img src="../assets/logo.svg" alt="logo" />
    <main>
      <a
        href="https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML"
        target="_blank"
        >HTML文档</a
      >
      <a
        href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference"
        target="_blank"
        >CSS参考</a
      >
      <a
        href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript"
        target="_blank"
        >JavaScript教程</a
      >
      <a href="https://cn.vuejs.org/v2/guide/" target="_blank">Vue文档</a>
      <a href="https://cli.vuejs.org/zh/guide/" target="_blank">Vue CLI文档</a>
      <a
        href="https://zh-hans.reactjs.org/docs/getting-started.html"
        target="_blank"
        >React文档</a
      >
      <a href="http://nodejs.cn/api/" target="_blank">Node.js文档</a>
    </main>
    <a href="https://github.com/" target="_blank" class="right">
      <img src="../assets/github.svg" alt="github" />
    </a>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  main {
    padding: 16px;
    font-weight: bold;
    a {
      margin: 0 18px;
    }
  }
  img {
    width: 50px;
    margin: 0;
    margin-left: 40px;
  }
  .right img {
    width: 30px;
    margin-top: 10px;
    margin-right: 40px;
  }
}
@media (max-width: 500px) {
  main {
    display: none;
  }
}
</style>
