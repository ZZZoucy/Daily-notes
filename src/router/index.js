import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import NoteDetail from "@/components/NoteDetail.vue";
import NotebookList from "@/components/NotebookList.vue";
import TrashDetail from "@/components/TrashDetail.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/notebooks",
      component: NotebookList
    },
    {
      path: "/notebooks",
      component: NotebookList
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/note",
      component: NoteDetail
    },
    {
      path: "/trash",
      component: TrashDetail
    }
  ]
});
