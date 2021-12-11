<template>
  <div class="detail" id="notebook-list">
    <Nav />
    <a href="#" class="btn" @click.prevent="onCreate"
      ><i class="iconfont icon-plus"></i> 新建笔记本</a
    >
    <main>
      <div class="layout">
        <div class="x">
          <p>目录</p>
          <img src="../assets/images/暂存箱.svg" alt="暂存箱" />
          <h3>笔记本({{ notebooks.length }})</h3>
        </div>
        <div class="book-list">
          <router-link
            v-for="notebook in notebooks"
            :key="notebook.id"
            :to="`/note?notebookId=${notebook.id}`"
            class="notebook"
          >
            <div>
              <span class="iconfont icon-notebook"></span> {{ notebook.title }}
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import { friendlyDate } from "@/helpers/util";
import { mapState, mapActions, mapGetters } from "vuex";
//window.Notebooks = Notebooks

export default {
  data() {
    return {};
  },
  components: { Nav },

  created() {
    this.checkLogin({ path: "/login" });
    this.getNotebooks();
  },

  computed: {
    ...mapGetters(["notebooks"])
  },

  methods: {
    ...mapActions([
      "getNotebooks",
      "addNotebook",
      "updateNotebook",
      "deleteNotebook",
      "checkLogin"
    ]),

    // 新建笔记本
    onCreate() {
      // 新建笔记本的弹出框
      this.$prompt("输入新笔记本标题", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不超过30个字符"
        // 如果用户点确认，则进行下面的操作，否则什么都不做
      }).then(({ value }) => {
        this.addNotebook({ title: value });
      });
    },
    // 修改笔记本标题
    onEdit(notebook) {
      let title = "";
      this.$prompt("输入新笔记本标题", "修改笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        // 编辑时input框里给初始值
        inputValue: notebook.title,
        inputErrorMessage: "标题不能为空，且不超过30个字符"
      }).then(({ value }) => {
        this.updateNotebook({ notebookId: notebook.id, title: value });
      });
    },
    // 删除笔记本
    onDelete(notebook) {
      this.$confirm("确认要删除笔记本吗", "删除笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deleteNotebook({ notebookId: notebook.id });
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list.less);
</style>
