import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './../views/Layout.vue'
import cookie from 'vue-cookie'

Vue.use(VueRouter)

const routes = [{
  path: "/",
  name: "Layout",
  redirect: "/index",
  component: Layout,
  children: [
    {
      path: "/index",
      name: "Index",
      meta:{
        routerName: {
          parentName: "首页",
          childName: ""
        }
      },
      
      component: () =>
        import("../views/Home/index.vue")
    },
    {
      path:"/tapedata",
      name:'tapedata',
      meta:{
        routerName: {
          parentName: "盘口数据",
          childName: ""
        }
      },
      
      component: () => import("../views/TapeData/tapedata.vue")
    },
    {
      path:'/order-show',
      name:'order-show',
      meta:{
        routerName: {
          parentName: "订单显示",
          childName: ""
        }
      },
      component: () => import("../views/OrderShow/ordershow.vue")
    },
    {
      path:'/datacount',
      name:'datacount',
      meta:{
        routerName: {
          parentName: "数据统计",
          childName: ""
        }
      },
      component: () => import('../views/DataCount/datacount.vue')
    },
    {
      path:'/datacount-date',
      name:'datacount-date',
      meta:{
        routerName: {
          parentName: "数据日统计",
          childName: ""
        }
      },
      component: () => import('../views/DataCountDay/datacountday.vue')
    },
    {
      path:'/match',
      name:'march',
      meta:{
        routerName: {
          parentName: "匹配历史",
          childName: ""
        }
      },
      component: () => import('../views/MatchHistory/matchhistory.vue')
    },
    {
      path:'/platform',
      name:'platform',
      meta:{
        routerName: {
          parentName: "供应商管理",
          childName: ""
        }
      },
      component: () => import('../views/PlatformAgent/platformagent.vue')
    },
    {
      path:'/plugin',
      name:'plugin',
      meta:{
        routerName: {
          parentName: "注册管理",
          childName: "注册平台管理"
        }
      },
      component: () => import('../views/PluginAgent/pluginagent.vue')
    },
    {
      path:'/means',
      name:'means',
      meta:{
        routerName: {
          parentName: "注册管理",
          childName: "注册资料管理"
        }
      },
      component: () => import('../views/PluginAgent/pluginmeans.vue')
    },
    {
      path:'/betsuser',
      name:'betsuser',
      meta:{
        routerName: {
          parentName: "下注管理",
          childName: "下注账号管理"
        }
      },
      component: () => import('../views/BetsAgent/betsuser.vue')
    },
    {
      path:'/betssoftware',
      name:'betssoftware',
      meta:{
        routerName: {
          parentName: "下注管理",
          childName: "下注软件管理"
        }
      },
      component: () => import('../views/BetsAgent/betssoftware.vue')
    },
    {
      path:'/betsusermeans',
      name:'betsusermeans',
      meta:{
        routerName: {
          parentName: "下注管理",
          childName: "账号注册资料管理" 
        }
      },
      component: () => import('../views/BetsAgent/betsusermeans.vue')
    },
    {
      path:'/seting-menu',
      name:'seting-menu',
      meta:{
        routerName: {
          parentName: "菜单管理",
          childName: ""
        }
      },
      component: () => import('../views/SetingMenu/setingmenu.vue')
    },
    {
      path:'/user-list',
      name:'user-list',
      meta:{
        routerName: {
          parentName: "用户管理",
          childName: "用户列表"
        }
      },
      component: () => import('../views/UserAgent/useragent.vue')
    },
    {
      path:'/role-list',
      name:'role-list',
      meta:{
        routerName: {
          parentName: "用户管理",
          childName: "角色列表"
        }
      },
      component: () => import('../views/UserAgent/roleagent.vue')
    },
  ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import ('../views/Login/Login.vue')
  },
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.path !== "/login"){
    let token = cookie.get('Admin-Token')
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
});

export default router
