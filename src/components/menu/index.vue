<template>
  <div>
    <div class="menu-head">
      <div class="search-menu">
        菜单名称
        <el-input clearable v-model="menuQuery.name" placeholder="角色名称"
                  style="margin-left: 15px"></el-input>
      </div>

      <div class="search-menu" style="margin-left: 50px">
        <el-button type="primary" @click="queryMenus">搜索</el-button>
        <el-button type="primary" @click="addMenu">新增</el-button>
      </div>
    </div>
    <div class="menu-table">
      <el-table
          :data="menuList"
          style=" width: 100%; margin-bottom: 20px;"
          row-key="label"
          height="75vh"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            prop="label"
            label="菜单名称"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="path"
            label="组件路径"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="icon"
            label="图标"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="hidden"
            label="是否隐藏"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="orderNum"
            label="排序"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
            width="250"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="250"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editMenu(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteMenu(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="addMenuDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeMenuAddDialog">
      <el-form ref="form" :model="addMenuParam" :rules="rules" label-width="80px">
        <el-form-item label="上级菜单" prop="parentId">
          <Treeselect
              v-model="addMenuParam.parentId"
              :options="menuss"
              placeholder="请选择菜单"
          />
        </el-form-item>
        <el-form-item label="菜单名" prop="label">
          <el-input v-model="addMenuParam.label" type="text"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" prop="path">
          <el-input v-model="addMenuParam.path" type="text"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="addMenuParam.icon" type="text"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input v-model="addMenuParam.orderNum" type="text"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="hidden">
          <el-input v-model="addMenuParam.hidden" type="text"></el-input>
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model="addMenuParam.redirect" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmAddMenu">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editMenuDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeMenuEditDialog">
      <el-form ref="form" :model="editMenuParam" :rules="rules" label-width="80px">
        <el-form-item label="上级菜单" prop="parentId">
          <Treeselect
              v-model="editMenuParam.parentId"
              :options="menuss"
              placeholder="请选择菜单"
          />
        </el-form-item>
        <el-form-item label="菜单名" prop="name">
          <el-input v-model="editMenuParam.label" type="text"></el-input>
        </el-form-item>
        <el-form-item label="菜单路由" prop="path">
          <el-input v-model="editMenuParam.path" type="text"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="editMenuParam.icon" type="text"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input v-model="editMenuParam.orderNum" type="text"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="hidden">
          <el-input v-model="editMenuParam.hidden" type="text"></el-input>
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model="editMenuParam.redirect" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmEditMenu">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {createMenu, deleteMenu, getMenuById, getMenus, getMenusByParam, updateMenu} from "@/api/menu";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Menu",
  components: {Treeselect},
  data() {
    return {
      menuList: [],
      menuQuery: {
        name: ''
      },
      menuss: [],
      addMenuDialog: false,
      editMenuDialog: false,
      addMenuParam: {
        parentId:undefined,
        label:'',
        path:'',
        icon:'',
        orderNum:undefined,
        hidden:'',
        redirect:''
      },
      editMenuParam: {
        parentId:undefined,
        label:'',
        path:'',
        icon:'',
        orderNum:undefined,
        hidden:'',
        redirect:''
      },
      rules: {
        label: [{required: true, message: '菜单名不能为空', trigger: 'blur'}],
        path: [{required: true, message: '菜单路由不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.listMenus()
    setTimeout(()=>{
      this.loading = false
    }, 2000)
  },
  methods: {
    // 菜单页面展示数据
    listMenus() {
      getMenus().then(response => {
        if (response.code === 200) {
          this.menuList = response.data[0]
        } else {
          this.msgError('获取菜单列表失败')
        }
      })
    },
    // 条件查询
    queryMenus() {
      getMenusByParam(this.menuQuery).then(response => {
        if (response.code === 200) {
          this.menuList = response.data[0]
        } else {
          this.msgError('获取菜单列表失败')
        }
      })
    },
    closeMenuAddDialog() {
      this.addMenuParam = {}
      this.$refs.form.resetFields()
    },
    closeMenuEditDialog() {
      this.editMenuParam = {}
      this.$refs.form.resetFields()
    },
    // 点击添加菜单按钮
    addMenu() {
      getMenus().then(response => {
        if (response.code === 200) {
          this.menuss = response.data[0]
        } else {
          this.msgError('获取菜单列表失败')
        }
      })
      console.log("sssssss: ", this.menuss)
      this.addMenuDialog = true
    },
    // 确认创建菜单按钮
    confirmAddMenu() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          createMenu(this.addMenuParam).then(response => {
            if (response.code === 200) {
              this.msgSuccess('创建菜单成功')
              this.listMenus()
              this.addMenuDialog = false
            } else {
              this.msgError('创建菜单失败')
            }
          })
        }
      })
    },
    // 编辑更新菜单
    editMenu(id) {
      getMenus().then(response => {
        if (response.code === 200) {
          this.menuss = response.data[0]
        } else {
          this.msgError('获取菜单列表失败')
        }
      })
      const param = {id: id}
      getMenuById(param).then(response => {
        if (response.code === 200) {
          this.editMenuParam = response.data[0]
          if (this.editMenuParam.parentId === 0) {
            this.editMenuParam.parentId = undefined
          }
        } else {
          this.msgError('更新菜单失败')
        }
      })

      this.editMenuDialog = true
    },
    // 确认更新按钮
    confirmEditMenu() {
      this.editMenuParam.hidden = this.editMenuParam.hidden.toString()
      console.log("xxxxxxx: ", this.editMenuParam)
      updateMenu(this.editMenuParam).then(response => {
        if (response.code === 200) {
          this.msgSuccess('更新菜单成功')
          this.listMenus()
          this.editMenuDialog = false
        } else {
          this.msgError('更新菜单失败')
        }
      })
    },
    //删除菜单
    deleteMenu(id) {
      const param = {id: id}
      this.$confirm('请确实是否删除该角色', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(param).then(response => {
          if (response.code === 200) {
            this.msgSuccess('删除菜单成功')
            this.listMenus()
          } else {
            this.msgError('删除菜单失败')
          }
        })
      })
    }
  }
}
</script>

<style lang="css">
.menu-head {
  white-space: nowrap;
  margin: 15px 30px;
  width: 100vh;
  height: auto;
  display: flex;

}

.search-menu {
  width: 300px;
  display: flex;
  align-items: center;
}

.menu-table {
  height: 100%;
  width: 100%;
  margin: 30px 30px;
  overflow: hidden;
}

</style>
