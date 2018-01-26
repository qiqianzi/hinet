/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const now = new Date()
const nowDate = now.getFullYear() + '-' + (parseInt(now.getMonth()) + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
const state = {
  // 当前用户
  user: {
    id: '',
    username: '',
    avatar: ''
  },
  // 会话列表
  friends: [{
    id: '',
    username: '',
    avatar: ''
  }],
  // 聊天记录
  message: [{
    id: '',
    userId: '',
    friendId: '',
    content: '',
    time: nowDate
  }],
  userId: '1',
  // 当前选中的会话
  currentId: '',
  // 过滤出只包含这个key的会话
  filterKey: '',
  // 添加好友搜索时的名字
  searchName: '',
  news: 1,
  showLeft: true,
  info: [{
    id: '',
    username: '',
    avatar: ''
  }]
}

const getters = {
  // getUser: state => state.user
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setUserId (state, id) {
    state.userId = id
  },
  setCurrentId (state, id) {
    state.currentId = id
  },
  setFriends (state, friend) {
    state.friends = friend
  },
  updateFriends (state, friend) {
    state.friends.push(friend)
  },
  selectFriend (state, id) {
    state.currentId = id
  },
  setMessage (state, message) {
    state.message = message
  },
  updateMessage (state, msg) {
    state.message.push(msg)
  },
  setFilterKey (state, filterKey) {
    state.filterKey = filterKey
  },
  setSearchName (state, searchName) {
    state.searchName = searchName
  },
  updateNews (state) {
    state.news = 0
  },
  showLeft (state, bool) {
    state.showLeft = bool
  },
  setInfo (state, info) {
    state.info = info
  }
}

export default new Vuex.Store({
  state, getters, mutations
})
