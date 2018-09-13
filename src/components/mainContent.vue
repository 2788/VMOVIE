<template>
    <div>
        <div class="tabbar">
        <div class="inTheaters" @click="switchTab">正在热映</div>
        <div class="comingSoon" @click="switchTab">即将上映</div>
        <div class="ranking" @click="switchTab">排行榜</div>
        <div class="strip"></div>
        </div>
        <div class="wrap">
        <transition :name="transitionName">
          <router-view class="child-view"></router-view>
        </transition>
        </div>
    </div>
</template>

<script>
export default {
  name: "mainContent",
  data(){
    return{
      transitionName: 'slide-left'
    }
  },
  methods:{
    switchTab(ev){
      let strip = document.querySelector('.strip');
      strip.style.left = ev.target.offsetLeft + 'px';
      this.$router.push({path:"/main/"+ev.target.className});
    }
  },
  watch: {
    '$route' (to, from) {
      let  tmp = ['inTheaters','comingSoon', 'ranking']
      const curIndex = tmp.indexOf(to.path.substring(to.path.lastIndexOf('/')+1));

      const oldIndex = tmp.indexOf(from.path.substring(from.path.lastIndexOf('/')+1));

      this.transitionName = oldIndex>curIndex ? 'slide-right' : 'slide-left';
    }
  }
};
</script>

<style >
.tabbar{
  position: relative;
  display: flex;
  width: 100%;
  line-height: 40px;
}
.tabbar .inTheaters {
  flex: 1 1 auto;
  width: 33%;
}

.tabbar .comingSoon {
  flex: 1 1 auto;
  width: 33%;
}

.tabbar .ranking {
  flex: 1 1 auto;
  width: 33%;
}

.tabbar .strip{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 33%;
  height: 1px;
  background: black;
  transition: all 0.3s ease;
}

.wrap{
  position: relative;
}

</style>
