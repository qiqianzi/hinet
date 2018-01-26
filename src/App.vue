<template>
  <div id="app" >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    /*background: lightgray repeat;*/
    background:lavender repeat;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0;
    width: 800px;
    height: 600px;
    margin:0 auto;
    margin-top:50px;

  }
</style>
