// 全局事件总线，做组件间的事件传递 （后续用vuex后，此文件就不用了）

import Vue from "vue";

export default new Vue();

/*
使用方法

import Bus from '@/helpers/bus'

Bus.$on('test', msg => {
  console.log(msg)
})

Bus.$emit('test', 'Hello Chayym')

*/
