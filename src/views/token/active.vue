<template>
  <div id="jhz">激活中……</div>
  <!--<button id="jhz" @click="getToken">激活中……</button>-->
</template>
<script type="application/javascript">
  export default {
    data () {
      return {
        Token: {}
      }
    },
    mounted: function () {
      var obj = this
      console.log(obj.$route.query.token)
//        obj.Token = getQuery('token')
//        console.log(obj.Token)
      let Token = {'Token': obj.$route.query.token}
//      alert(obj.Token)
      console.log(Token)
      obj.$http.post('/api/v1/user/activate', Token, {emulateJSON: true}).then((res) => {
        if (res.body.code === 1) {
          alert('您已成功激活,请您去往登录页面……')
//          obj.$router.push('/')
        } else {
//          alert('Error')
          alert(Token)
        }
      })
    }
  }
//    methods: {
//      getToken () {
//        function getQuery (key) {
//          var query = window.location.search.substr(1).split('&')
//          for (var i = 0; i < query.length; i++) {
//            var key1 = query[i].split('=')
//            if (key1.length === 2) {
//              if (decodeURIComponent(key1[0]) === key) {
//                return decodeURIComponent(key1[1])
//              }
//            }
//          }
//        }
//        var thi = this
//        thi.Token = getQuery('token')
//        console.log(thi.Token)
//        thi.$http.post('/api/v1/user/activate', thi.Token).then((res) => {
//          if (res.body.code === 1) {
//            alert('您已成功激活,为您返回到登录页面……')
//            thi.$router.push('/login')
//          } else {
//          alert('Error')
//            alert(thi.Token)
//          }
//        })
//      }
//    }
//  }
</script>
<style scoped>
  body {
    background: ghostwhite;
  }
  #jhz
  {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    margin-top: 200px;
    font: 38px 微软雅黑;
    color: lightskyblue;
  }
</style>
