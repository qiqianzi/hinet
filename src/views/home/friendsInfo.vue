<template>
  <div class="list">
    <ul>
    <li style="position: relative" v-for="item in friends" :class="{ active: item.id === currentId }" @click="selectFriend(item.id)">
    <img style="position: absolute;left: 30px;bottom: 5px" class="avatar" width="30" height="30" :alt="currentId" :src="item.avatar">
    <span class="name">{{item.username}}</span>
    </li>
    </ul>
    {{currentId}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
      filterKey () {
        return this.$store.state.filterKey
      },
      friends () {
        return this.$store.state.friends
      },
      currentId () {
        return this.$store.state.currentId
      }
    },
    mounted: function () {
      this.getFriends()
    },
    watch: {
      filterKey (val) {
        // console.log('改变了')
        this.getFriends()
      },
      currentId (val) {
        this.getFriends()
      }
    },
    methods: {
      getFriends () {
        let data = null
        if (this.$store.state.filterKey !== null && this.$store.state.filterKey !== undefined) {
          data = {'filterKey': this.$store.state.filterKey}
        }
        this.$http.post('/api/v1/friend/list', data, {emulateJSON: true}).then((res) => {
          if (res.body.code === 1) {
            this.$store.state.friends = []
//            this.$store.commit('setFriends', res.body.friends)
            this.$store.commit('setFriends', res.body.users)
//            console.log(res.body.friends)
            // this.$store.state.friends = res.body.friends
//            console.log(this.$store.state.friends)
          }
        })
      },
      selectFriend (id) {
        // console.log('您点击了id:' + id)
        this.$store.commit('setCurrentId', id)
      }
    }
  }
</script>

<style scoped>
  .list{
    overflow: auto;
    height: 500px;
  }
  ul{
    padding-left: 0;
    margin:0;
  }
  li {
    /*padding: 12px 15px;*/
    padding: 10px 5px;
    border-bottom: 1px solid #292C33;
    cursor: pointer;
    transition: background-color .1s;
    list-style: none;
    /*width: 100%;*/

  }
  li img{
    width: 30px;
    height: 30px;
  }
  .avatar, .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
  }
  .active{
    background: silver;
  }

</style>
