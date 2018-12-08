import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'//登录页面
import navBar from '../components/navBar'//导航页面
import logopage from '../pages/logopage'//logo页面
import juese from '../pages/juese'//角色管理页面
import store from '../pages/store'//门店管理页面
import store_add from '../pages/store_add'//门店管理新增页面
import store_adit from '../pages/store_adit'//门店管理编辑页面
import user_statistics from '../pages/user_statistics'//用户统计页面
import facility from '../pages/facility'//设备管理页面
import facility_sn from '../pages/facility_sn'//设备管理页面
import facility_details from '../pages/facility_details'//设备管理_详情页面
import facility_add_ipc from '../pages/facility_add_ipc'//设备管理_详情页面_添加IPC
import device_image_setting from '../pages/device_image_setting'//设备管理_详情页面_设备镜像设置


Vue.use(Router)


/*在创建的 router 对象中，如果不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
添加 mode: 'history' 之后将使用 HTML5 history 模式，该模式下没有 # 前缀，而且可以使用 pushState 和 replaceState 来管理记录。*/

/*js 中配置路由
一、首先要定义route,  一条路由的实现。它是一个对象，由两个部分组成： path和component.  path 指路径，component 指的是组件。如：{path:’/home’, component: home}
　　　　我们这里有两条路由，组成一个routes:
const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About }
]
* 二、最后创建router 对路由进行管理，它是由构造函数 new vueRouter() 创建，接受routes 参数。
const router = new VueRouter({
      routes // routes: routes 的简写
})
* 三、配置完成后，把router 实例注入到 vue 根实例中,就可以使用路由了
const app = new Vue({
  router
}).$mount('#app')
　　执行过程：当用户点击 router-link 标签时，会去寻找它的 to 属性， 它的 to 属性和 js 中配置的路径{ path: '/home', component: Home}  path 一一对应，从而找到了匹配的组件， 最后把组件渲染到 <router-view> 标签所在的地方。所有的这些实现才是基于hash 实现的。
*
* */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
      // children: [{ path: '/juese', name: 'juese', component: juese }]
    },
    {
      path: '',
      name: 'navBar',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requiresAuth: true,
      },
      component: navBar,
      redirect: '/',
      children: [
        {path: '/', name: 'logopage', component: logopage},
        {path: '/juese', name: 'juese', component: juese},
        {
          path: '/store', name: 'store', component: store,
          children: [
            {path: '/store_adit', name: 'store_adit', component: store_adit},
            /*{path: '/store_add', name: 'store_add', component: store_add}*/
            ]
        },
        {path: '/store_add', name: 'store_add', component: store_add},
        {path: '/user_statistics', name: 'user_statistics', component: user_statistics},
        {path: '/facility', name: 'facility', component: facility},
        {path: '/facility_sn', name: 'facility_sn', component: facility_sn},
        {path: '/facility_details', name: 'facility_details', component: facility_details},
        {path: '/facility_add_ipc', name: 'facility_add_ipc', component: facility_add_ipc},
        {path: '/device_image_setting', name: 'device_image_setting', component: device_image_setting}
      ]
    }
    /* {
       path: 'logopage',
       name: 'logopage',
       component: logopage
       // children: [{ path: '/juese', name: 'juese', component: juese }]
     },
     {
       path: '/juese',
       name: 'juese',
       component: juese
     },
     {
       path: '/store',
       name: 'store',
       component: store
     },*/
  ]

})
