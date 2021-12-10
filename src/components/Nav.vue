<template>
  <div class="nav">
    <header>
      <img class="logo" src="../assets/logo.svg" alt="logo" />
    </header>
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
    <footer>
      <a href="https://www.zhihu.com/" target="_blank">
        <img src="../assets/知乎.svg" alt="github" />
      </a>
      <a href="https://juejin.cn/" target="_blank">
        <img src="../assets/掘金.svg" alt="github" /> </a
      ><a href="https://github.com/" target="_blank" class="right">
        <img src="../assets/github.svg" alt="github" />
      </a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style lang="less" scoped>
.nav {
  border-bottom: 1px solid #ccc;
  position: relative;

  header {
    position: absolute;
    width: 90px;
    .logo {
      width: 50px;
      margin: 0;
      margin-left: 40px;
    }
  }
  main {
    margin-left: 90px;
    margin-right: 190px;
    padding: 16px 40px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    a {
      margin: 0 18px;
    }
  }
  footer {
    width: 190px;
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 30px;
      margin-top: 10px;
      margin-left: 18px;
    }
  }
}

@media (max-width: 550px) {
  main {
    visibility: hidden;
    height: 52px;
  }
}
</style>
