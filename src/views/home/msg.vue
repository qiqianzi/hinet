<template>
  <div class="msg" style="position:relative;">
    <p><span>{{message.time}}</span></p>
    <span class="spanDiv" v-if="message.userId === user.id"></span>
    <img id="friend"  :src="friendsAvatar" alt="" v-if="message.userId !== user.id">
    <div class="text" v-if="message.userId !== user.id">{{message.content}}</div>
    <div class="text2" v-if="message.userId === user.id">{{message.content}}</div>
    <img id="my" v-bind:src="user.avatar" alt="" v-if="message.userId === user.id">
    <span class="spanDiv"  v-if="message.userId !== user.id"></span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    props: ['message'],
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
      }
    }
  }
</script>

<style scoped>
  span {
    display: inline-block;
    padding: 0 18px;
    font-size: 12px;
    color: #fff;
    border-radius: 2px;
    background-color: #dcdcdc;
  }
  .text {
    display: inline-block;
    padding: 0 5px;
    max-width: calc(100% - 100px);
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    /*background-color: #EEFBEC;*/
    background: lightgreen;
  }
  .text2 {
    display: inline-block;
    padding: 0 5px;
    max-width: calc(100% - 100px);
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: yellow;
  }
  img{
    width: 32px;
    height: 32px;
  }
  .text,#friend{
    float: left;
    margin-left:5px;
  }
  .text2{
    float: right;
    margin-right:45px;
  }
  #my{
    position: absolute;
    right:5px
  }
  p{
    margin: 5px 0 2px 0;
  }
  .spanDiv{
    display:inline-block;
    padding:0;
    width: 32px;
    height: 32px;
    background: transparent;
  }
</style>
