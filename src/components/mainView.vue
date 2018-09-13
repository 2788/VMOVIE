<template>
    <div class="main-view">
        <m-head class="head"></m-head>
        <main-content class="mainContent">

        </main-content>
    </div>
</template>

<script>
import mainContent from "./mainContent";
import mHeader from "./mHeader";
export default {
  name: "main-view",
  components: {
    "main-content": mainContent,
    'm-head': mHeader
  },
  methods: {
    checkTab(ev) {
      if (ev.target.innerText.indexOf("热映") !== -1)
        this.$route.push({ parth: "/main/inTheaters" });
      else this.$route.push({ parth: "/main/comingSoon" });
    }
  }
};
</script>

<style scoped>
.main-view {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  align-items: center;
}
.head {
  flex: 1 1 auto;
  margin-top: 10px;
  display: flex;
  width: 100%;
  position: relative;
  text-align: center;
}
.mainContent {
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  margin-top: 10px;
  flex-flow: column nowrap;
}
</style>
