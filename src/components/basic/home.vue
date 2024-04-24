<template>
  <div class="home-box">
    <div class="header">
        <sxpHeader></sxpHeader>
    </div>
    <div class="sideBar">
    <sidebar></sidebar>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <bottom></bottom>
    </div>
  </div>
</template>

<script>
import sidebar from "@/components/basic/sidebar.vue";
import sxpHeader from "@/components/basic/header.vue";
import Bottom from "@/components/basic/footer.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {Bottom, sidebar, sxpHeader},
  created() {
  }
}
</script>

<style lang="css">
.home-box {
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.header {
  background: whitesmoke;
  width: 100%;
  height: 8vh;
}
.sideBar{
  width: 13%;
  height: 84vh;
  background: darkgray;
}
.main {
  width: 87%;
  height: 85%;
  background: white;
}
.footer {
  background: whitesmoke;
  width: 100%;
  height: 10vh;
}

</style>
