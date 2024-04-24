<template>
  <div v-if="mList[0]">
    <label v-for="menu in mList" :key="menu.ID">
      <el-submenu :index="menu.path" v-if="menu.children">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span>{{ menu.label }}</span>
        </template>
        <label>
          <navItem :mList="menu.children"></navItem>
        </label>
      </el-submenu>
      <el-menu-item style="overflow: hidden" v-else :index="menu.path">
        <i class="el-icon-edit"></i>
        <span>{{ menu.label }}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: "navItem",
  props: {
    mList: {type: Array}
  },
  data() {
    return {

    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
