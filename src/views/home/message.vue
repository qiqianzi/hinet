<template>
    <div id="message" class="message" v-show="showLeft">
      <div class="headDiv">
        <span @click="showLeft" >
          <!--<i class="el-icon-menu"></i>-->
          <!--<i class="el-icon-caret-left"></i>-->
          <!--<i class="el-icon-caret-right"></i>-->
        </span>
        {{friendsName}}
      </div>
      <div class="refresh" @click="getMore()">
        <div v-if="messages">get more message</div>
        <div v-else>no message</div>
      </div>
      <msg v-for="(item, index) in messages" :message="item" :key="index" ></msg>
    </div>
</template>
<script>
  import msg from './msg.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      msg
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      friendsAvatar () {
        if (this.$store.state.friends) {
          for (let i = 0; i < this.$store.state.friends.length; i++) {
            if (this.currentId === this.$store.state.friends[i].id) {
              return this.$store.state.friends[i].avatar
            }
          }
        }
      },
      friendsName () {
        if (this.$store.state.friends) {
          for (let i = 0; i < this.$store.state.friends.length; i++) {
            if (this.currentId === this.$store.state.friends[i].id) {
              return this.$store.state.friends[i].username
            }
          }
        }
      },
      messages () {
        for (let i = 0; i < this.$store.state.message.length; i++) {
          if (this.currentId === this.$store.state.message[i].friendId) {
            return this.$store.state.message
          }
        }
      },
      currentId () {
        return this.$store.state.currentId
      },
      filterKey () {
        return this.$store.state.filterKey
      },
      showLeft () {
        console.log(this.$store.state.showLeft)
        return this.$store.state.showLeft
      }
    },
    watch: {
      currentId (val) {
        this.getMessage()
      },
      filterKey (val) {
        this.$store.commit('setCurrentId', -100)
      },
      messages (val) {
        this.scrollToBottom()
      }
    },
    mounted: function () {
      this.getMessage()
    },
    methods: {
      scrollToBottom: function () {
        this.$nextTick(() => {
          let div = document.getElementById('message')
          div.scrollTop = div.scrollHeight
        })
      },
      getMessage () {
        let data = {currentId: this.currentId, filterKey: this.filterKey}
        this.$http.post('/api/v1/chat/msg', data, {emulateJSON: true}).then((res) => {
          if (res.body.code === 1) {
            this.$store.commit('setMessage', res.body.message)
          }
        })
      }
    },
    getMore () {
//      this.$http.post('/api/v1/friend/getMore').then((res) => {
//        if (res.body.code === 1) {
//          this.$store.commit('setMessage', res.body.message)
//        }
//      })
    },
    showLeft () {
      this.$state.commit('showLeft', false)
    }
  }
</script>

<style scoped>
  .message {
    width: 100%;
    height: 400px;
    overflow: auto;
    border-bottom: 1px solid gray;
  }
  ul{
    list-style: none;
    margin:0;
    padding:0;
  }
  .refresh{
    display: inline-block;
    padding: 2px 18px;
    font-size: 16px;
    color: #fff;
    border-radius: 2px;
    background-color: #efdfdf;
    margin-top:5px;
    cursor: pointer;
  }
  .headDiv{
    height: 30px;
    background: lightgrey;
  }
  .headDiv>span{
    display: inline-block;
    height:30px;
    float: left;
    background: pink;
  }
  i{
    margin-top:5px;
  }
</style>
