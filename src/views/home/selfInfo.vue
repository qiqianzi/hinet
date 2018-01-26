<template>
  <div class="selfInfo">
    <header>
      <img style="margin-top: 10px;" class="avatar" :alt="username" :src="avatar">&nbsp;&nbsp;&nbsp;
      <span class="name" width="20%" height="20%">{{username}} id:{{id}}</span>

      <!--<el-dropdown>-->
        <!--<span class="el-dropdown-link">-->
          <!--<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
        <!--</span>-->
        <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item><topHead></topHead></el-dropdown-item>-->
          <!--&lt;!&ndash;<span><topHead></topHead></span>&ndash;&gt;-->
          <!--<el-dropdown-item>狮子头</el-dropdown-item>-->
          <!--<el-dropdown-item divided><span @click="logOut" style="display:block;">退出登录</span></el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <topHead></topHead>
    </header>
    <footer>
      <input class="search" style="color: #fff" type="text" placeholder="search by username..." @keyup="onKeyup">
    </footer>
  </div>
</template>

<script>
  import topHead from './head'
  export default {
    data () {
      return {
      }
    },
    components: {
      topHead
    },
    computed: {
      id () {
        this.$store.commit('setUserId', this.$store.state.user.id)
//        console.log(this.$store.state.user.id)
        return this.$store.state.user.id
      },
      username () {
        return this.$store.state.user.username
      },
      avatar () {
        return this.$store.state.user.avatar
      },
      friends () {
        return this.$store.state.friends
      }
    },
    mounted: function () {
      this.getUser()
    },
    methods: {
      getUser () {
        let data = {username: localStorage.username, password: localStorage.password}
        this.$http.post('/api/v1/friend/self', data, {emulateJSON: true}).then((res) => {
          if (res.body.code === 1) {
            this.$store.commit('setUser', res.body.user)
          }
        })
      },
      onKeyup (e) {
        this.search(e.target.value)
      },
      search (e) {
        this.$store.commit('setFilterKey', e)
      },
      logOut () {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .selfInfo {
    width: 200px;
    height: 99px;
    border-bottom: solid 1px lightgray;
  }
  header{
    width: 100%;
    height: 60px;
  }
  header img{
    width: 40px;
    height: 40px;
  }
  footer{
    width: 100%;
    height: 40px;
  }
  .search {
    width: 160px;
    margin:0 auto;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #3a3a3a;
    border-radius: 4px;
    outline: none;
    /*background-color: #26292E;*/
    background-color: linen;
  }

</style>
