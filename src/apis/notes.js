// 和笔记相关的增删改查API

import request from "@/helpers/request";
import { friendlyDate } from "@/helpers/util";

const URL = {
  GET: "/notes/from/:notebookId",
  ADD: "/notes/to/:notebookId",
  UPDATE: "/notes/:noteId",
  DELETE: "/notes/:noteId"
};

export default {
  // 获取所有的笔记
  getAll({ notebookId }) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(":notebookId", notebookId))
        .then(res => {
          res.data = res.data
            .map(note => {
              note.createdAtFriendly = friendlyDate(note.createdAt);
              note.updatedAtFriendly = friendlyDate(note.updatedAt);
              return note;
            })
            .sort((note1, note2) => {
              return note1.updatedAt < note2.updatedAt;
            });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 更新笔记({更新哪个笔记},{标题,内容})
  updateNote({ noteId }, { title, content }) {
    return request(URL.UPDATE.replace(":noteId", noteId), "PATCH", {
      title,
      content
    });
  },
  // 删除笔记
  deleteNote({ noteId }) {
    return request(URL.DELETE.replace(":noteId", noteId), "DELETE");
  },
  // 添加笔记
  addNote(
    { notebookId },
    { title = "", content = "" } = { title: "", content: "" }
  ) {
    return new Promise((resolve, reject) => {
      request(URL.ADD.replace(":notebookId", notebookId), "POST", {
        title,
        content
      })
        .then(res => {
          res.data.createdAtFriendly = friendlyDate(res.data.createdAt);
          res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
    //return request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
  }
};
