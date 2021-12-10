<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => (notes = val)"></note-sidebar>
    <div class="note-detail">
      <div class="note-empty" v-show="!curBook.id">请创建笔记本后</div>
      <div class="note-empty" v-show="!curNote.id">选择或创建笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span class="iconfont icon-delete" @click="onDeleteNote"></span>
          <span
            class="iconfont"
            :class="isShowPreview ? 'icon-edit' : 'icon-eye'"
            @click="isShowPreview = !isShowPreview"
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model:value="curNote.title"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="输入标题"
          />
        </div>
        <div class="editor">
          <codemirror
            v-model="curNote.content"
            :options="cmOptions"
            v-show="!isShowPreview"
            @input="onUpdateNote"
            @inputRead="statusText = '正在输入...'"
          ></codemirror>
          <!--  <textarea v-show="isShowPreview"  v-model:value="curNote.content" @input="onUpdateNote" @keydown="statusText='正在输入...'" placeholder="输入内容, 支持 markdown 语法"></textarea>-->
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "@/components/NoteSidebar.vue";
// 引入基于 Codemirror，适用于 Vue 的 Web 代码编辑器
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/theme/neat.css";
// 这个引入主要是为了使用 debounce 节流函数
import _ from "lodash";
// 这个引入主要是为了实现 html 和 markdown 的转换
import MarkdownIt from "markdown-it";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

let md = new MarkdownIt();

export default {
  components: {
    NoteSidebar,
    codemirror
  },

  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false,
      cmOptions: {
        tabSize: 4,
        mode: "text/x-markdown",
        theme: "neat",
        lineNumbers: false,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  },

  created() {
    this.checkLogin({ path: "/login" });
  },

  computed: {
    ...mapGetters(["notes", "curNote", "curBook"]),

    previewContent() {
      return md.render(this.curNote.content || "");
    }
  },

  methods: {
    ...mapMutations(["setCurNote"]),
    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),
    // 保存笔记
    // 如果用户输入太快，更新的频率太高了，这时候也没必要改一个字符就自动保存一次
    // 所以可以使用节流函数 debounce，300ms以内的输入会合并成一次自动保存（发一次请求）
    onUpdateNote: _.debounce(function() {
      if (!this.curNote.id) return;
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content
      })
        .then(data => {
          // 修改完成，显示已保存
          this.statusText = "已保存";
        })
        .catch(data => {
          // 出错，显示保存出错
          this.statusText = "保存出错";
        });
    }, 3000),

    // 删除笔记
    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then(data => {
        // 并且路由做一个跳转
        this.$router.replace({ path: "/note" });
      });
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId });
    next();
  }
};
</script>

<style lang="less">
@import url(../assets/css/note-detail.less);
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
