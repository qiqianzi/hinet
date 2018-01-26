<template>
  <div id="login" class="note" >
    <select v-model="locale" style="width: 80px;height: 36px;">
      <option value="English" >English</option>
      <option value="中文" >中文</option>
    </select>
    <router-view/>

    <div class="login-wrap" v-show="showLogin">
      <br>
      <h3>{{$t('message.login')}}</h3><br>
      <p v-show="showTishi">{{tishi}}</p>
      {{$t('message.email')}}:&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入邮箱" v-model="username"><br>
      {{$t('message.password')}}:&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" v-model="password">
      <button class="login" @click="login">{{$t('message.login')}}</button>
      <span @click="ToRegister">{{$t('message.no2')}}</span>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <br>
      <h3>{{$t('message.register')}}</h3><br>
      <p v-show="showTishi">{{tishi}}</p>
      {{$t('message.email')}}:&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入邮箱" v-model="email"><br>
      {{$t('message.username')}}:&nbsp;&nbsp;&nbsp;<input type="text" placeholder="请输入昵称" v-model="username"><br>
      {{$t('message.password')}}:&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" v-model="password"><br>
      <div id="gender">
        {{$t('message.sex')}}:
        <el-radio-group style="width: 208px" v-model="gender">
          <el-radio :label="0">{{$t('message.mail')}}</el-radio>
          <el-radio :label="1">{{$t('message.femail')}}</el-radio>
        </el-radio-group>
      </div>
      <br>
      {{$t('message.avatar')}}：
      <input type="file" id="ajax-base64" name="avatar" style="display: none" >
      <img id="img" src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%3F%3E%0A%3Csvg%20width%3D%22153%22%20height%3D%22153%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%3Cg%3E%0A%20%20%3Ctitle%3ENo%20image%3C/title%3E%0A%20%20%3Crect%20id%3D%22externRect%22%20height%3D%22150%22%20width%3D%22150%22%20y%3D%221.5%22%20x%3D%221.500024%22%20stroke-width%3D%223%22%20stroke%3D%22%23666666%22%20fill%3D%22%23e1e1e1%22/%3E%0A%20%20%3Ctext%20transform%3D%22matrix%286.66667%2C%200%2C%200%2C%206.66667%2C%20-960.5%2C%20-1099.33%29%22%20xml%3Aspace%3D%22preserve%22%20text-anchor%3D%22middle%22%20font-family%3D%22Fantasy%22%20font-size%3D%2214%22%20id%3D%22questionMark%22%20y%3D%22181.249569%22%20x%3D%22155.549819%22%20stroke-width%3D%220%22%20stroke%3D%22%23666666%22%20fill%3D%22%23000000%22%3E%3F%3C/text%3E%0A%20%3C/g%3E%0A%3C/svg%3E"
           alt="" title="头像框"><br><br>

      <button class="register" @click="register">{{$t('message.register')}}</button>
      <span @click="ToLogin">{{$t('message.no')}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        email: '',
        id: '',
        username: '',
        password: '',
        gender: 0,
        avatar: '',
        avatarBody: '',
        ava: '',
        form: [{
          name: ''
        }],
        locale: '中文'
      }
    },
    watch: {
      locale (val) {
        const languages = {
          '中文': 'Chinese'
        }
        console.log(arguments)
        this.locale = val || 'English'
        this.$i18n.locale = languages[this.locale] || this.locale
      }
    },
    mounted: function () {
      $('#img').click(function () {
        $('#ajax-base64').click()
      })
      var t = this

      $('#ajax-base64').change(function (event) {
        t.avatar = event.target.files[0]
        var reader = new FileReader()
        reader.onload = function (readerEvt) {
          t.avatarBody = btoa(readerEvt.target.result)
          $('img').attr('src', 'data:' + event.target.files[0].type + ';base64,' + t.avatarBody)
          t.ava = 'data:' + event.target.files[0].type + ';base64,' + t.avatarBody
        }
        reader.readAsBinaryString(t.avatar)
      })
    },
    methods: {
      register () {
        if (this.email === '' || this.username === '' || this.password === '') {
          alert('请输入邮箱或用户名或密码')
        } else {
          let data = {'email': this.email, 'username': this.username, 'password': this.password, 'gender': this.gender, 'type': this.avatar.type, 'avatar': this.avatarBody}
          this.$http.post('/api/v1/user/register', data, {emulateJSON: true}).then((res) => {
            if (res.body.code === 1) {
              localStorage.email = this.email
              localStorage.username = this.username
              /* 注册成功之后再跳回登录页 */
              // this.$router.push('/active')
              alert('正在注册……请去往邮箱验证')
            }
          })
        }
      },
      ToRegister () {
        this.showRegister = true
        this.showLogin = false
      },
      ToLogin () {
        this.showRegister = false
        this.showLogin = true
      },
      login () {
        let data = {username: this.username, password: this.password}
        this.$http.post('/api/v1/user/login', data, {emulateJSON: true}).then((res) => {
          if (res.body.code === 1) {
            localStorage.username = this.username
            localStorage.password = this.password
            setTimeout(function () {
              this.$router.push('/home')
            }.bind(this), 1000)
          } else {
            this.tishi = '登录失败'
            this.showTishi = true
          }
        })
      }
    }
  }
</script>
<style scoped>
  body,.login-wrap,h3,p{
    margin:0;
    padding:0;
  }
  input{display:inline-block; width:200px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
  p{color:red;}
  button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
  span{cursor:pointer;}
  #ajax-base64,img{
    width: 200px;
    height: 200px;
  }
  #gender{
    margin:0 auto;
  }
  .login,.register{
    width: 100px;
  }
</style>
