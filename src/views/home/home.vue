<template>
  <div id="a">
    <!--<div class="head">-->
      <!--<a @click="logOut">退出登录</a>-->
      <!--<topHead></topHead>-->
      <!--<router-link to='home/add'>添加朋友</router-link>-->
    <!--</div>-->
    <div class="sidebar" A v-show="showLeft">
      <selfInfo></selfInfo>
      <friendsInfo></friendsInfo>
    </div>
    <div class="main">
      <message></message>
      <send></send>
    </div>
  </div>
</template>
<script>
  import topHead from './head'
  import selfInfo from './selfInfo'
  import friendsInfo from './friendsInfo'
  import message from './message'
  import send from './send'

  export default {
    components: {
      topHead,
      selfInfo,
      friendsInfo,
      message,
      send
    },
    computed: {
      showLeft () {
        console.log(this.$store.state.showLeft)
        return this.$store.state.showLeft
      }
    },
    methods: {
//      logOut () {
//        this.$router.push('/')
//      }
    }
  }
</script>

<style scoped>
  #a{
    width: 100%;
    height: 100%;
    /*background: oldlace;*/
  }
  .sidebar {
    float: left;
    width: 200px;
    height:100%;
    color: #f4f4f4;
    background: lightblue;
  }
  .main {
    width: 600px;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: ghostwhite;
  }
  .text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    }
  .head{
    width: 100%;
    height: 50px;
    /*background: oldlace;*/
  }

</style>
