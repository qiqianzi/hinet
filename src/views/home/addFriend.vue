<template>
  <div id="addFriend">
    <router-link to='/home'>去聊天</router-link>
    <br/>
    <br>
    <el-input placeholder="请输入名称" v-model="username" class="input-with-select" style="width:200px;border-right:none">
    </el-input><el-button @click="clearInput" style="width:40px;height:40px;padding:2px;border-left:none" icon="el-icon-close"></el-button>
    <el-button type="primary" @click="searchFriend" style="width:70px;">查询</el-button>

    <el-table :data="this.users[0]" border style="width:500px;margin-top: 3px;" 　header-align="center">
      <el-table-column type="index" width="50" header-align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="100" header-align="center" ></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200" header-align="center"></el-table-column>
      <el-table-column label="操作" width="150"  header-align="center">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="addFriend(scope.$index, scope.row)" style="width:100px;">
            添加
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <router-link to='/home'>去聊天</router-link>
    <br/>
    <br>
    <el-input placeholder="请输入名称" v-model="username" class="input-with-select" style="width:200px;border-right:none">
    </el-input><el-button @click="clearInput" style="width:40px;height:40px;padding:2px;border-left:none" icon="el-icon-close"></el-button>
    <el-button type="primary" @click="searchFriend" style="width:70px;">查询</el-button>

    <ol>
      <li v-for="item in users[0]" >
        <img class="avatar" width="50px" height="50px"  :alt="currentId" :src="item.avatar">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="name">{{item.username}}</span>
        <button id="operate">{{item.username}}</button>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'addFriend',
  data () {
    return {
      username: '',
      users: [],
      user: []
    }
  },
  computed: {
    currentId () {
      return this.$store.state.currentId
    },
    searchName () {
      return this.$store.state.searchName
    }
  },
  methods: {
    searchFriend () {
      this.$store.commit('setSearchName', this.username)
      if (this.username) {
        let data = {'username': this.$store.state.searchName}
        this.$http.post('/api/v1/friend/search', data, {emulateJSON: true}).then((res) => {
          if (res.body.code === 1) {
            this.users = []
            this.users.push(res.body.users)
            console.log(this.users)
            console.log(this.users[0])
          }
        })
      }
    },
    clearInput: function () {
      this.username = ''
      this.$store.state.searchName = ''
      this.users = []
    },
    addFriend (index, row) {
      this.user = this.users[0]
      this.$store.state.currentId = this.user[index].username
      this.$confirm('您确定要添加:"' + this.currentId + '"为好友吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.$store.state.currentId)
        let data = {'username': this.$store.state.currentId, 'email': localStorage.email}
        this.$http.post('/api/v1/friend/add', data, {emulateJSON: true})
          .then(res => {
            if (res.body.code === 1) {
              alert('已成功添加')
              // alert('已向对方发送好友申请')
            } else if (res.body.code === -1) {
              alert('此用户已存在您的好友列表，不能重复添加!')
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      })
    }
  }
}
</script>
<style scoped>
#addFriend{
  margin:0 auto;
  width: 100%;
  height: 1000px
}
  ol{
    width: 500px;
    height: 100%;
    margin: 0 auto;
  }
  li{
    background: lightskyblue;
    width: 100%;
    height: 80px;
    margin:10px auto;
  }
  li > img{
    width: 50px;
    height: 50px;
  }
  #operate{
    display: inline-block !important;
    width: 100px;
    height: 50px;
    background-color:#41b883;
    border: 0px;
    margin-left:50px;
  }
</style>
