<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.child-view {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  transition: all 0.5s cubic-bezier(.55,0,.1,1);
  width: 100%;
}

.slide-left-enter{
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-enter-to{
  -webkit-transform: translate(0%, 0);
  transform: translate(0%, 0);
}

.slide-left-leave{
  -webkit-transform: translate(0%, 0);
  transform: translate(0%, 0);
}

.slide-left-leave-to{
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.slide-right-enter{
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.slide-right-enter-to{
  -webkit-transform: translate(0%, 0);
  transform: translate(0%, 0);
}

.slide-right-leave{
  -webkit-transform: translate(0%, 0);
  transform: translate(0%, 0);
}

.slide-right-leave-to{
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

</style>
