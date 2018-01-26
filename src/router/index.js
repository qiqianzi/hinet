import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/login'
import Active from '../views/token/active'
import Home from '../views/home/home.vue'
// import selfInfo from '@/views/home/selfInfo.vue'
// import friendsInfo from '@/views/home/friendsInfo.vue'
// import message from '@/views/home/message.vue'
// import text from '@/views/home/send.vue'
import addFriend from '../views/home/addFriend.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import selfInfo from '@/components/selfInfo.vue'
// import device from '@/components/device.vue'
// import First from '../views/first/first.vue'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'hash',
  routes: [
    // {
    //   path: '/',
    //   name: '首页面',
    //   component: First,
    //   hidden: true
    // },
    {
      path: '/',
      name: '登录注册页面',
      component: Login
    },
    {
      path: '/active',
      name: '验证页面',
      component: Active
    },
    {
      path: '/home',
      name: '',
      component: Home
      // children: [
      //   {path: 'add', component: addFriend, name: '添加朋友'}
      // ]
      // // redirect: '/home/device',
      // children: [
      //   { path: 'selfInfo', component: selfInfo, name: '我的信息' },
      //   { path: 'friendsInfo', component: friendsInfo, name: '好友信息' },
      //   { path: 'message', component: message, name: '消息' },
      //   { path: 'text', component: text, name: '发送区域' }
      // ]
    },
    {
      path: '/add',
      name: '添加好友',
      component: addFriend
    }
  ]
})
