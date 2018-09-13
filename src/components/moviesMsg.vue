<template>
    <div class="movieMsg" v-if="done">
        <header>
            <div class="top">
                <span class="iconfont icon-fanhui" @click="back"></span>
                <span><span class="iconfont icon-baomihua"></span>VMOVIE</span>
                <span class="iconfont icon-fenxiang"></span>
            </div>
            <div class="img"><img :src="url(movieMsg.images.small)" @load="color" alt="" ></div>
        </header>
        <main>
            <div class="info">
                <div class="sec1">
                    <div class="details">
                        <span class="name">{{movieMsg.title}}</span>
                        <span class="genre">{{extractInfo(movieMsg)}}</span>
                        <span class="original">{{movieMsg['original_title']}}</span>
                        <span class="country">地区: {{movieMsg.countries.toString()}}</span>
                    </div>
                    <div class="grade">
                        <p>
                            <span>豆瓣评分</span>
                            <span>{{movieMsg.rating.average}}</span>
                            <span>☆☆☆☆☆</span>
                            <span>{{movieMsg['ratings_count']}}人</span>
                        </p>
                    </div>
                </div>
                <div class="sec2">
                    <span>想看</span>
                    <span>看过☆☆☆☆☆</span>
                </div>
            </div>
            <div class="abstract">
                <span>简介</span>
                <span>{{movieMsg.summary}}</span>
            </div>
            <div class="casts">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
            </div>
            <div class="comments">
                <div class="comments-tab">
                    <span @click="switchTab">短评</span><span @click="switchTab">影评</span><span class="bar"></span>
                </div>
                <ul class="small" v-show="tab==='短评'">
                    <li class="small-item" v-for="(comment, index) in comments" :key="index">
                        <img :src="url(comment.author.avatar)" alt="">
                        <div>
                            <span class="name-grade">{{comment.author.name}} ☆☆☆☆☆</span>
                            <span class="comments-content">{{comment.content}}</span>
                            <span class="time">{{splitStr(comment['created_at'])}}</span>
                        </div>
                    </li>
                    <li class="more">
                       <span>更多短评</span>
                    </li>
                </ul>

                <ul class="long" v-show="tab==='影评'">
                    <li class="long-item" v-for="(review, index) in reviews" :key="index">
                        <div class="title">{{review.title}}</div>
                        <div class="img-name-grade">
                            <img :src="url(review.author.avatar)" alt="">
                            <span class="name-grade">{{review.author.name}} ☆☆☆☆☆</span>
                        </div>
                        <div class="review-content">{{review.summary}}</div>
                        <div class="count-time">
                            <span class="count">{{review['useful_count']}}/{{review['useful_count']+review['useless_count']}}</span>
                            <span class="time">{{splitStr(review['created_at'])}}</span>
                        </div>
                    </li>
                    <li class="more">
                       <span>更多影评</span>
                    </li>
                </ul>
            </div>
        </main>
    </div>
    <div v-else></div>
</template>

<script>
import Color from "../assets/js/Color.js";
import Proccess from '../assets/js/proccess.js'
export default {
  name: "movieMsg",
  data() {
    return {
      done: false,
      tab: "短评",
      show:false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    switchTab(ev) {
      console.log("123");
      var bar = document.querySelector(".comments-tab .bar");
      this.tab = ev.target.innerText;
      if (this.tab === "影评") {
        bar.style.left = "50%";
        return;
      }
      bar.style.left = "0";
    },
    extractInfo(obj) {
      if (Object.keys(obj).length === 0) return "";
      let result = obj.year + " /";
      for (let genre of obj.genres) result += " " + genre;
      for (let people of obj.casts) result += " / " + people.name;
      return result;
    },
    splitStr(str) {
      return str.split(/\s+/)[0];
    },
    color() {
      var img = document.querySelector(".movieMsg img");
      var h = document.querySelector(".movieMsg header");
      var colorThief = new Color();
      var img1 = new Image();
      img1.crossOrigin = "";
      img1.onload = function() {
        let c = colorThief.getColor(img1);
        let result = `rgb(${c})`;
        h.style.background = result;
        let fontColor;
        const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
        if (grayLevel >= 192) {
          // 若为浅色，把文字设置为黑色
          fontColor = "#000";
        } else {
          fontColor = "#fff";
        }
        h.style.color = fontColor;
      };
      img1.src = img.src;
    },
    url(str){
      return Proccess.urlProccess(str);
    }
  },
  computed: {
    movieMsg() {
      return this.$store.state.movieMsg;
    },
    comments() {
      return this.$store.state.comments;
    },
    reviews() {
      return this.$store.state.reviews;
    }
  },
  watch: {
    "$store.state.id": function(n, o) {
      if (n !== undefined) this.done = true;
    }
  },
  mounted() {
    this.$store.dispatch("getMovieMsg", this);
    this.$store.dispatch("getComments", this);
    this.$store.dispatch("getReviews", this);
  }
};
</script>

<style scoped>

.movieMsg {
  background: rgba(249, 248, 248, 0.952);
}

header {
  width: 100%;
  height: 420px;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
}

header .top {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  height: 40px;
  line-height: 44px;
  font-weight: 700;
}

.top {
  padding: 0 20px;
}
header .img {
  display: block;
  /* height: 380px; */
  flex: 0 1 auto;
  box-sizing: border-box;
}

.img img {
  display: block;
  margin: 20px auto;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  height: 340px;
}

.info > div:first-child {
  display: flex;
}

.info .details {
  text-align: left;
  width: 70%;
  margin: 20px;
  font-size: 12px;
}
.details .name {
  font-size: 20px;
  font-weight: 700;
}

.details span {
  display: block;
}

.info .grade {
  width: 20%;
  margin: 20px;
  box-shadow: 0px 0px 4px #bebcbc;
  border: 1px solid #fff;
  font-size: 12px;
  line-height: 20px;
  background: #fff;
}
.info .grade p {
  padding: 5px;
}
.info .grade p span {
  display: block;
  text-align: center;
}

.info .grade p span:nth-child(2){
  font-weight: 600;
  font-size: 16px;
}

.sec2 {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.sec2 span {
  display: block;
  border: 1px solid rgba(240, 158, 6, 0.961);
  border-radius: 5px;
  line-height: 40px;
  color: rgba(240, 158, 6, 0.961);
  font-weight: 500;
}

.sec2 > span:first-child {
  width: 20%;
  margin-left: 20px;
}
.sec2 > span:last-child {
  width: 60%;
  margin-right: 20px;
}

.abstract {
  margin-top: 20px;
  padding: 0 20px 20px 20px;
  border-top: 1px solid rgba(230, 229, 229, 0.733);
  border-bottom: 1px solid rgba(230, 229, 229, 0.733);
}
.abstract span {
  display: block;
  text-align: left;
}

.abstract span:first-child {
  font-size: 14px;
  font-weight: 300;
  line-height: 40px;
}

.casts {
  display: none;
}

.comments-tab {
  position: relative;
  background: rgba(173, 170, 170, 0.158);
}
.comments-tab span {
  display: inline-block;
  width: 50%;
  line-height: 50px;
}

.comments-tab .bar {
  position: absolute;
  width: 50%;
  height: 1px;
  left: 0;
  bottom: 0;
  background: black;
  transition: 0.5s all ease;
}

.small-item {
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 10px;
}

.small-item img {
  margin-right: 20px;
  border-radius: 50%;
}

.small-item > div {
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
}
.small-item .name-grade {
  font-size: 16px;
  font-weight: 600;
}
.small-item .comments-content {
  padding: 5px 0;
}
.small-item .time {
  font-size: 12px;
  font-weight: 300;
}

.long-item {
  padding: 20px;
  text-align: left;
}

.long-item .title {
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
}

.long-item .img-name-grade {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
}
.long-item img {
  border-radius: 50%;
  height: 25px;
  width: 25px;
  margin-right: 10px;
}

.long-item .review-content {
  font-weight: 300;
}

.long-item .count-time {
  display: flex;
  font-weight: 300;
}
.count-time span {
  flex: 1 1 auto;
}

.count-time .time {
  text-align: right;
}


.name-grade{
  font-weight: 500;
}

.more {
  color: green;
  padding-bottom: 20px;
}
</style>
