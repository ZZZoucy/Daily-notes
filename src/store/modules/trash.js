// 对应 TrashDetail 状态

import Trash from "@/apis/trash";
import { Message } from "element-ui";

const state = {
  trashNotes: null,
  curTrashNoteId: null
};

const getters = {
  trashNotes: state => state.trashNotes || [],

  curTrashNote: (state, getters) => {
    if (!state.curTrashNoteId) return getters.trashNotes[0] || {};
    return state.trashNotes.find(note => note.id == state.curTrashNoteId) || {};
  },

  // 笔记属于哪个笔记本
  // vuex的跨模块获取数据
  belongTo: (state, getters, rootState, rootGetters) => {
    // console.log("1", state); //curTrashNoteId: "4697" , trashNotes: Array(13);
    // console.log("2", getters); //belongTo: (...),curBook: (...),curNote: (...),curTrashNote: (...),notebooks: (...),notes: (...),slug: (...),trashNotes: (...),username: (...)
    // console.log("3", rootState); //note: (...),notebook: (...),trash: (...),user: (...)
    // console.log("4", rootGetters); //belongTo: (...),curBook: (...),curNote: (...),curTrashNote: (...),notebooks: (...),notes: (...),slug: (...),trashNotes: (...),username: (...)
    let notebook =
      rootGetters.notebooks.find(
        notebook => notebook.id == getters.curTrashNote.notebookId
      ) || {};
    return notebook.title || "";
  }
};

const mutations = {
  setTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes;
  },

  addTrashNote(state, payload) {
    setTrashNotes.unshift(payload.note);
  },

  deleteTrashNote(state, payload) {
    state.trashNotes = state.trashNotes.filter(
      note => note.id != payload.noteId
    );
  },

  setCurTrashNote(state, payload) {
    state.curTrashNoteId = payload.curTrashNoteId;
  }
};

const actions = {
  getTrashNotes({ commit }) {
    return Trash.getAll().then(res => {
      commit("setTrashNotes", { trashNotes: res.data });
    });
  },
  // 彻底删除笔记
  deleteTrashNote({ commit }, { noteId }) {
    return Trash.deleteNote({ noteId }).then(res => {
      commit("deleteTrashNote", { noteId });
      Message.success(res.msg);
    });
  },
  // 恢复笔记本
  revertTrashNote({ commit }, { noteId }) {
    return Trash.revertNote({ noteId }).then(res => {
      commit("deleteTrashNote", { noteId });
      Message.success(res.msg);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
