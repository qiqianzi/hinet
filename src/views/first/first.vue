<template>
  <div id="first">
    <div id="header">
      <a href="#" @click="toLoin">{{$t('message.manage')}}</a>
      <el-dropdown>
      <span class="el-dropdown-link">
        {{$t('message.settings')}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>fdss</el-dropdown-item>
          <el-dropdown-item>3434</el-dropdown-item>
          <el-dropdown-item divided>查看</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div id="content">
      <el-input placeholder="请输入地址,格式如:phto.dada" v-model="address"></el-input>
      <el-button type="primary" v-on:click="jump">{{$t('message.jump')}}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'first',
    data () {
      return {
        locale: '中文',
        address: ''
      }
    },
    methods: {
      toLoin () {
        this.$router.push('/login')
      },
      jump () {
        window.location.href = window.location.protocol + '//' + this.address + '.' + window.location.host
      }
    }
  }
</script>

<style>
  body {
    height: 100%;
    /*background: beige;*/
    background: oldlace;
    margin: 0;
    padding: 0;
  }

  #first {
  }

  #header {
    height: 34px;
    border-bottom: 1px solid gainsboro;
    /*margin-top:10px;*/
  }

  a {
    font-size: 16px;
    color: #000;
  }

  #content {
    margin-top: 300px;
  }

  .el-input {
    width: 360px;
  }

  .el-button {
    width: 80px;
  }
</style>
