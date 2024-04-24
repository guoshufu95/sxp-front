<template>
  <div class="head">
    <div>
      <div class="head-logout">
        <el-button size="medium" type="primary" @click="logout">退出</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import {delToken} from "@/common/auth";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "sxpHeader",
  data(){
    return{

    }
  },
  methods: {
    // 退出当前用户
    logout(){
      delToken("token")
      this.$store.dispatch("removeToken2State")
      this.$router.push({ path: "/login"})
    }
  }
}
</script>

<style lang="css">
.head {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}
.head-logout{
  margin-right: 15px;
}
</style>
