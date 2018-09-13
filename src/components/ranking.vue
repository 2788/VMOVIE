<template>
    <div>
        <ul class="rank-list">
           <li class="rank-items" v-for="(item, index) in items" :key="index" @click="switchTo(item)">
               <div class="por">
                   <div class="strip"></div>
                    <span class="number">{{index+1}}</span>
                    <div class="strip"></div>
               </div>
               <div class="movies">
                   <img :src="url(item.images.small)" alt="">
                    <ul class="info">
                        <li class="name">
                            {{item.title}}
                        </li>
                        <li class="grade">评分:  <span>{{item.rating.average}}</span> </li>
                        <li class="details">{{concat(item)}}</li>
                    </ul>
               </div>
            </li> 
        </ul>
    </div>
</template>

<script>
import Proccess from  '../assets/js/proccess.js'
export default {
  name: "ranking",
  methods: {
    concat(item) {
      let result = item.year + " /";
      for (let genre of item.genres) result += " " + genre;
      for (let people of item.casts) result += " / " + people.name;

      return result;
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
      return this.$store.state.ranking;
    }
  },
  mounted() {
    if (this.$el.children[0].className.indexOf("rank") !== -1)
      document.querySelector(".tabbar .strip").style.left = "66%";
    if (this.$store.state.ranking.length === 0)
      this.$store.dispatch("getRanking", this);
  }
};
</script>
<style scoped>
.rank-list {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.rank-items {
  display: flex;
  width: 90%;
  flex-flow: column nowrap;
  height: 260px;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
}

.por {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.por .strip {
  width: 20%;
  height: 1px;
  background: #e4e4e4;
}
.por span {
  display: block;
  margin: 0 10px;
  color: #ec1616;
}

.movies {
  display: flex;
  width: 90%;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  height: 150px;
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 1px 1px #e4e4e4;
}

.movies span {
  color: blue;
  font-weight: 400;
}

.movies img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 1px;
}
.movies .info {
  margin: 0 10px;
  text-align: left;
  flex: 1 1 auto;
  font-weight: 300;
  font-size: 10px;
}
.movies .name {
  font-size: 16px;
  font-weight: 500;
}
.movies .grade {
  margin: 5px 0;
}
</style>
