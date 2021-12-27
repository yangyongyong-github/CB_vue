import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import base from './base'
import user from './user'


export default [
   ...base,
   ...user,
   {
      name: '404',
      component: () => import('@/views/NotFound'),
      path: '*'
   }
];

