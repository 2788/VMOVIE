<template>
    <div>
        <ul class="inTheaters-list">
            <li class="item" v-for="(item, index) in items" :key="index" @click="switchTo(item)">
                <img :src="url(item.images.small)" alt="">
                <ul class="info">
                    <li class="name">
                        {{item.title}}
                    </li>
                    <li class="grade">评分: {{item.rating.average}}</li>
                    <li class="director">导演: {{concat(item.directors)}}</li>
                    <li class="cast">主演: {{concat(item.casts)}}</li>
                </ul>
                <div class="peopleNumber"><span>{{flat(item.collect_count)}}</span>
                    <span>看过</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Proccess from  '../assets/js/proccess.js'
export default {
  name: "inTheaters",
  methods: {
    concat(item) {
      let result = "";
      for (let people of item) result += people.name + " / ";

      return result.substring(0, result.length - 2);
    },
    flat(number) {
      if (number >= 10000) return (number / 10000).toFixed(1) + "万人看过";
      return number + "人看过";
    },
    switchTo(item){
      this.$router.push({path:'/movie/'+item.id});
    },
    url(str){
      return Proccess.urlProccess(str);
    }
  },
  computed: {
    items() {
      return this.$store.state.inTheaters;
    }
  },
  mounted() {
    if (this.$el.children[0].className.indexOf("inTheaters") !== -1)
      document.querySelector(".tabbar .strip").style.left = "0%";
    if (this.$store.state.inTheaters.length === 0)
      this.$store.dispatch("getInTheaters", this);
  }
};
</script>

<style scoped>
.inTheaters-list {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.item {
  width: 100%;
  display: flex;
  padding: 10px;
  border-top: 1px solid #e4e4e4;
  height: 150px;
  box-sizing: border-box;
}
.item img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #f0efef;
}

.item .info {
  margin: 0 10px;
  text-align: left;
  flex: 1 1 auto;
}
.item .info {
  font-weight: 300;
  font-size: 10px;
}
.item .info li {
  margin: 5px 0;
}
.item .info .name {
  font-size: 16px;
  font-weight: 500;
}
.item .peopleNumber {
  flex: 0 0 auto;
  width: 20%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}
.peopleNumber span {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-weight: 300;
  font-size: 12px;
  color: red;
  /* border: 1px solid red; */
}

.peopleNumber span:last-child{
    font-size: 16px;
    border: 1px solid red;
    border-radius: 5px;
    font-weight: 400;
    padding: 5px 0;
}
</style>
