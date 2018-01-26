<template>
  <div id="h">
    <el-dropdown>
    <span class="el-dropdown-link">
    <i class="el-icon-menu"></i>      <!--<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>-->
    <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <el-button type="text"  @click="dialogFormVisible0 = true">编辑个人资料</el-button>
      </el-dropdown-item>
    <el-dropdown-item>
      <el-button type="text"  @click="dialogFormVisible = true">添加好友</el-button></el-dropdown-item>
    <el-dropdown-item>
      <el-button type="text"  @click="dialogFormVisible2 = true">消息通知 <div v-if="1 === 0">{{info}}</div></el-button>
    </el-dropdown-item>
      <el-dropdown-item>
        <el-button type="text"  @click="dialogFormVisible3 = true">发起聊天 <div v-if="1 === 0">{{info}}</div></el-button>
      </el-dropdown-item>

    <el-dropdown-item divided><span @click="logOut" style="display:block;">退出登录</span></el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>

    <!--<el-button type="text"  @click="dialogFormVisible = true">添加好友</el-button>-->
    <el-dialog  title="添加好友" :visible.sync="dialogFormVisible" center>
      <el-input v-model="username" auto-complete="off" style="width: 200px" ></el-input>
      <el-button @click="clearInput" style="width:40px;height:40px;padding:2px;border-left:none" icon="el-icon-close"></el-button>
      <el-button @click="searchFriend" style="width:80px;height:40px;">查询</el-button>
      <span style="color:red" v-show="showHead">*以下查找结果均为您[未添加]的用户</span>
      <ul style="height: 500px;overflow: auto">
        <div v-show="showHead">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>头像</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>昵称</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>操作</span>
        </div>
        <li v-for="(item, index) in users[0]" style="width: 340px;height: 50px;position: relative">
          {{index + 1}}&nbsp;&nbsp;
          <img class="avatar" width="40px" height="40px"  :alt="currentId" :src="item.avatar">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="display: inline-block;width: 100px;height: 20px;" class="name">{{item.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button size="small" type="primary" @click="addFriend(index)" style="width:100px;position: absolute;top: 9px">
            添加
            </el-button>
        </li>
      </ul>
    </el-dialog>

    <!--<el-button type="text"  @click="dialogFormVisible2 = true">消息通知 <div v-if="1 === 0">{{info}}</div></el-button>-->
    <el-dialog  title="消息通知" :visible.sync="dialogFormVisible2" center>
      <ul style="height: 500px;overflow: auto">
        <li v-for="(item, index) in info" style="width: 340px;height: 50px;position: relative">
          {{index + 1}}&nbsp;&nbsp;
          <img class="avatar" width="40px" height="40px"  :alt="currentId" :src="item.avatar">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="display: inline-block;width: 100px;height: 20px;" class="name">{{item.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button size="small" type="primary" @click="accept(index)" style="width:100px;position: absolute;top: 9px">
            接受
            </el-button>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'head',
    data () {
      return {
        dialogFormVisible0: false,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        formLabelWidth: '90px',
        form: {},
        username: '',
        users: [],
        user: [],
        showHead: false
      }
    },
    computed: {
      news () {
        return this.$store.state.news
      },
      userId () {
        return this.$store.state.userId
      },
      currentId () {
        return this.$store.state.currentId
      },
      searchName () {
        return this.$store.state.searchName
      },
      info () {
        return this.$store.state.info
      },
      friends () {
        return this.$store.state.friends
      }
    },
    mounted: function () {
      let obj = this
      obj.$http.post('/api/v1/friend/noteinfo')
        .then(res => {
          if (res.body.code === 1) {
            obj.dialogFormVisible2 = false
            obj.$store.commit('setInfo', res.body.users)
            console.log(res.body.users)
            console.log(obj.$store.state.info)
//            console.log(obj.user[index].id)
            // alert('已向对方发送好友申请')
          }
        })
    },
    methods: {
//      showDialog () {
//        this.dialogFormVisible = true
//      },
//      showMessage () {
//        // console.log('您有一条新消息')
//        this.$store.commit('updateNews')
//      },
      searchFriend () {
        this.$store.commit('setSearchName', this.username)
        if (this.username) {
          let data = {'username': this.$store.state.searchName}
          this.$http.post('/api/v1/friend/search', data, {emulateJSON: true}).then((res) => {
            if (res.body.code === 1) {
              this.showHead = true
              this.users = []
              this.users.push(res.body.users)
              console.log(this.users)
            }
          })
        }
      },
      clearInput: function () {
        this.username = ''
        this.$store.state.searchName = ''
        this.users = []
      },
      addFriend (index) {
        let obj = this
        this.user = obj.users[0]
        obj.$confirm('您确定要添加:"' + obj.user[index].username + '"为好友吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {userId: obj.userId, id: obj.user[index].id, username: obj.user[index].username}
          obj.$http.post('/api/v1/friend/add', data, {emulateJSON: true})
            .then(res => {
              if (res.body.code === 1) {
//                alert('已成功添加')
                obj.dialogFormVisible = false
                obj.showHead = false
//                obj.$store.commit('setCurrentId', obj.user[index].id)
//                obj.log(obj.$store.state.currentId)
                console.log(obj.user[index].id)
                // alert('已向对方发送好友申请')
              }
            })
            .catch()
        }).catch(() => {
          obj.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
      },
      accept (index) {
        console.log(index)
        let obj = this
        let data = {id: obj.$store.state.info[index].id}
        obj.$http.post('/api/v1/friend/agree', data, {emulateJSON: true})
          .then(res => {
            if (res.body.code === 1) {
              alert('已成功添加')
              obj.$store.commit('updateFriends', obj.$store.state.info[index])
              obj.$store.commit('setCurrentId', obj.$store.state.info[index].id)
//              obj.$store.commit('setFriends', obj.$store.state.info)
              console.log(obj.$store.state.info)
              console.log(obj.$store.state.friends)
              obj.dialogFormVisible2 = false
//              obj.log(obj.$store.state.currentId)
//              obj.log(obj.user[index].id)
              // alert('已向对方发送好友申请')
            }
          })
      },
      logOut () {
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  #h{
    width: 50px;
    float: right;
    position: relative;
    top: 25px;
    right: 5px;
    background: lightgoldenrodyellow;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  .el-dialog--center > div{
    width: 400px;
    height: 400px;
  }
  ul,li{
    list-style: none;
    margin:5px 2px;
  }
  li:hover{
    background: linen;
  }
  li> img{
    width: 40px;
    height: 40px;
    margin-top:5px;
  }
  img{
    width: 40px;
    height: 40px;
  }

  #ajax-base64, img{
    width: 40px;
    height: 40px;
  }

  .el-message-box > button{
    /*width: 30px;*/
    /*height: 25px;*/
  }
  .el-message-box__btns > button{
    width: 30px !important;
    height: 25px !important;
    background: pink;
  }
  .el-icon--right{
    margin:0;
  }
</style>
