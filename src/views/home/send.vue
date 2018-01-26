<template>
  <div class="send" v-show="showLeft">
    <div id="tool" class="tool">
      <i class="el-icon-document"></i>
    </div>
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: ''
      }
    },
    computed: {
      userId () {
        return this.$store.state.userId
      },
      friends () {
        for (let i = 0; i < this.$store.state.friends.length; i++) {
          if (this.$store.state.currentId === this.$store.state.friends[i].id) {
            return this.$store.state.friends[i]
          }
        }
      },
      messages () {
        return this.$store.state.message
      },
//      messages () {
//        for (let i = 0; i < this.$store.state.friends.length; i++) {
//          if (this.$store.state.currentId === this.$store.state.friends[i].username) {
//            return this.$store.state.friends[i].messages
//          }
//        }
//      },
      currentId () {
        return this.$store.state.currentId
      },
      showLeft () {
        console.log(this.$store.state.showLeft)
        return this.$store.state.showLeft
      }
    },
    methods: {
      onKeyup (e) {
        if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
          this.sendMessage(this.$store.state.userId, this.$store.state.currentId, this.content)
          this.content = ''
        }
      },
      sendMessage (userId, currentId, content) {
        this.$http.post('/api/v1/chat/send', {userId: userId, currentId: currentId, content: content}, {emulateJSON: true}).then((res) => {
          if (res.body.code === 1) {
            this.$store.commit('updateMessage', res.body.messages)
            console.log(res.body.messages)
//            console.log(this.$store.state)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .send {
    padding: 2px;
    height: 196px;
    border: solid 1px #ddd;
    /*background: palegoldenrod;*/
  }

  textarea {
    /*padding: 10px;*/
    height: 90%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
  .tool{
    height: 20px;
  }
  i{
    float: left;
    position: absolute;
    left: 20px;
  }
</style>
