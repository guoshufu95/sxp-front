<template>
  <div class="side">
    <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        :router = "true"
        active-text-color="#ffd04b">
      <div style="overflow: hidden" v-if="mm.length > 0">
        <nav-item :m-list="mm"></nav-item>
      </div>

    </el-menu>
  </div>
</template>

<script>
 import {menus} from "@/api/sidebar";
import NavItem from "@/components/basic/navItem.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "sidebar",
  components: {NavItem},
  created() {
    menus().then(response => {
      if (response.code === 200) {
        this.mm = response.data[0]
      } else {
        this.msgError('获取菜单失败')
      }
    })
  },
  data() {
    return {
      mm:[],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

}
</script>

<style lang="css">

.side {
  height: 100%;
  width: 100%;
}

.el-menu-vertical {
  width: 100%;
  height: 100%;
}

</style>
