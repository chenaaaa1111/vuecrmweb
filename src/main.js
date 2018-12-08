// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入 vue-router，并使用
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入 vue-resource，并使用
import VueResource from 'vue-resource'

Vue.use(VueResource)

// 导入 axios，并使用
import axios from 'axios'

Vue.prototype.axios = axios

// 导入element UI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

//公共全局引用
import adminApi from './assets/js/util'

Vue.prototype.adminApi = adminApi;


/*import Select from './common/select'
Vue.component(Select.name, Select);*/


/*使用 router.beforeEach 注册一个全局的 before 钩子：*/

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(1);
    if (localStorage.getItem('user_key')) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  } else {
    next();
  }
});






/*router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    localStorage.removeItem('logopage');
  }
  let user = JSON.parse(localStorage.getItem('logopage'));
  if (!user && to.path != '/login') {
    next({ path: '/login', })
  } else {
    next()
  }
})*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
