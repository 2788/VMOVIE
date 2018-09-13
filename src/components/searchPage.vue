<template>
    <div class="search">
        <div class="header">
            <span class="iconfont icon-fanhui" @click="back"></span>
            <input class="search-input" type="text" placeholder="搜索电影名" @keydown.enter="search">
        </div>
        <div class="tips" v-if="show">        
                <div class="title">分类</div>
                <div class="classify-wrap" @click="search">
                <span>爱情</span>
                <span>喜剧</span>
                <span>动作</span>
                <span>科幻</span>
                <span>动画</span>
                <span>悬疑</span>
                <span>惊悚</span>
                <span>恐怖</span>
                <span>犯罪</span>
                <span>同性</span>
                <span>音乐</span>
                <span>歌舞</span>
                <span>战争</span>
                </div>
            <div class="history">
                <div class="title">历史搜索</div>
                <div>秘密花园</div>
            </div>
        </div>
        <div v-else>
          <ul class="result-list">
            <li class="item" v-for="(item, index) in items" :key="index" @click="switchTo(item)">
                <img :src="url(item.images.small)" alt="">
                <ul class="info">
                    <li class="name">
                        {{item.title}}
                    </li>
                    <li class="details">{{concat(item)}}</li>
                </ul>
            </li>
        </ul>
        </div>
    </div>
</template>


<script>
import Proccess from '../assets/js/proccess.js'
export default {
  data() {
    return {
      show: true,
      searchContent: ""
    };
  },
  methods: {
    switchTo(item) {
      this.$router.push({ path: "/movie/" + item.id });
    },
    concat(item) {
      let result = item.rating.average + "/";
      for (let people of item.casts) result += people.name + "/";
      return result + "/" + item.year;
    },
    search(ev) {
      if (ev.target.className === "search-input") {
        this.searchContent = ev.target.value;
        this.$store.dispatch("getSearchResult", this);
      } else if (ev.target.className !== "classify-wrap") {
        this.searchContent = ev.target.innerText;
        this.$store.dispatch("getClassifyResult", this);
      }
    },
    back(){
      if(!this.show){
        this.show = !this.show;
      }else{
        this.$router.push({path:'/main/inTheaters'});
      }
    },
    url(str){
      return Proccess.urlProccess(str);
    }
  },
  computed: {
    items() {
      return this.$store.state.searchResult;
    }
  }
};
</script>

<style scoped>
.search .header {
  padding: 10px 40px 10px 43px;
  background: #d44439;
}
.search .header span {
  position: absolute;
  left: 5px;
  top: 3px;
  padding: 3px 10px;
  font-size: 24px;
  color: #fff;
}

.search input {
  width: 100%;
  border-bottom: 1px solid #ebebeb5b;
  color: #fff;
}

::-webkit-input-placeholder {
  font-weight: 500;
  color: #d9d9d9b5;
}

.search .tips {
  box-sizing: border-box;
  padding: 20px;
}

.tips .title {
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  line-height: 30px;
}

.tips .classify-wrap {
  display: flex;
  flex-flow: row wrap;
}

.classify-wrap span {
  display: block;
  flex: 0 1 auto;
  border: 0.8px solid #c7c7c7;
  padding: 2px 4px;
  border-radius: 5px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.history {
  text-align: left;
}

.history div:nth-child(2) {
  line-height: 30px;
  border-bottom: 1px solid #ebebeb5b;
}

.result-list {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
.result-list .item {
  width: 100%;
  display: flex;
  padding: 10px;
  border-top: 1px solid #e4e4e4;
  height: 100px;
  box-sizing: border-box;
}
.result-list .item img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #f0efef;
}

.result-list .item .info {
  margin: 0 10px;
  text-align: left;
  flex: 1 1 auto;
}
.result-list .item .info {
  font-weight: 300;
  font-size: 10px;
}
.result-list .item .info li {
  margin: 5px 0;
}
.result-list .item .info .name {
  font-size: 16px;
  font-weight: 500;
}
</style>
