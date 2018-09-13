<template>
    <div>
        <span>VDOUYAMOVIE</span>  
        <div class="icon-search iconfont icon-sousuo" @click="switchTo"></div>
    </div>
</template>

<script>
export default {
  name: "mHead",
  methods:{
    switchTo(){
      this.$router.push({path:"/search"});
    }
  }
};
</script>

<style scoped>
@import "../assets/css/iconfont.css";
.head span{
  margin: 0 auto;
  line-height: 44px;
  font-weight: 700;
  color: #0f0e0e;
  letter-spacing: 3px;
}
.icon-search{
  position: absolute;
  width: 10%;
  right: 0px;
  top: 0;
  font-size: 20px;
  line-height: 44px;
}

</style>
