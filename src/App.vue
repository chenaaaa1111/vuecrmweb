<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>
 /* import navbar from './components/navBar.vue'*/

  export default {
    name: 'App',
    components: {
     /* navbar*/
    },
  }
</script>
<style>
  #app {
    height: 100%;
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;*/
    overflow:scroll;
  }
  html{
    overflow:hidden;
  }
  pd_30{
    padding-bottom: 30px;
  }
  hg_35{
    height:35px;
  }
</style>
