<template>
  <div>
    <div class="role-head">
      <div class="search-role-dept">
        名称
        <el-input clearable v-model="roleQuery.name" placeholder="角色名称"
                  style="margin-left: 15px"></el-input>
      </div>
      <div class="search-role-dept">
        权限字符
        <el-input clearable v-model="roleQuery.roleKey" placeholder="角色role-key"
                  style="margin-left: 15px;"></el-input>
      </div>
      <div class="search-role-dept">
        状态
        <el-input clearable v-model="roleQuery.status" placeholder="在线状态"
                  style="margin-left: 15px"></el-input>
      </div>
      <div class="search-role-dept">
        <el-button type="primary" @click="queryRoleByParam">搜索</el-button>
        <el-button type="primary" @click="addRole">新增</el-button>
      </div>
    </div>
    <div class="role-table">
      <el-table :data="roleList">
        <el-table-column
            prop="name"
            label="角色名"
            width="320"
        >
        </el-table-column>
        <el-table-column
            prop="roleKey"
            label="权限字符"
            width="320"
        >
        </el-table-column>
        <el-table-column
            prop="status"
            label="在线状态"
            width="320"
        >
        </el-table-column>
        <el-table-column
            prop="label"
            label="备注"
            width="320"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="320"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRole(scope.row.ID)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRole(scope.row.ID)">删除</el-button>
            <el-button type="text" size="small" @click="updateRoleStatus(scope.row.ID, scope.row.status)">
              {{ scope.row.status === '启用' ? '停用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="addRoleDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeAddRoleDialog">
      <el-form ref="form" :model="addParams" :rules="rules" label-width="80px">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="addParams.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="addParams.roleKey" type="text"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="sex">
          <el-select v-model="addParams.status" placeholder="请选择启用状态">
            <el-option
                v-for="item in st"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="roleSort">
          <el-input v-model="addParams.roleSort" type="text"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="label">
          <el-input v-model="addParams.label" type="text"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="deptIds">
          <Treeselect
              :multiple="true"
              v-model="addParams.deptIds"
              :options="depts"
              placeholder="请选择归属部门"
          />
        </el-form-item>
        <el-form-item label="菜单" prop="menusIds">
          <Treeselect
              :multiple="true"
              v-model="addParams.menuIds"
              :options="menus"
              placeholder="请选择菜单"
          />
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmAddRole()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editRoleDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeEditRoleDialog">
      <el-form ref="form" :model="editRoleParam" :rules="rules" label-width="80px">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="editRoleParam.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="editRoleParam.roleKey" type="text"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" prop="sex">
          <el-select v-model="editRoleParam.status" placeholder="请选择启用状态">
            <el-option
                v-for="item in st"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="roleSort">
          <el-input v-model="editRoleParam.roleSort" type="text"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="label">
          <el-input v-model="editRoleParam.label" type="text"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="deptIds">
          <Treeselect
              :multiple="true"
              v-model="editRoleParam.deptIds"
              :options="depts"
              placeholder="请选择归属部门"
          />
        </el-form-item>
        <el-form-item label="菜单" prop="menuIds">
          <Treeselect
              :multiple="true"
              v-model="editRoleParam.menuIds"
              :options="menus"
              placeholder="请选择菜单"
          />
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmEditRole()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addRole, deleteRole, getRoleById, getRoleByParams, roleList, updateRole, UpdateRoleStatus} from "@/api/role";
import {getDepts} from "@/api/depts";
import {getMenus} from "@/api/menu";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: "localRole",
  components: {Treeselect},
  data() {
    return {
      roleQuery: {
        name: '',
        roleKey: '',
        status: undefined,
      },
      addRoleDialog: false,
      editRoleDialog: false,
      st: [{
        value: 1,
        label: "启用"
      }, {
        value: 0,
        label: "禁用"
      }],
      depts: [],
      menus: [],
      addParams: {
        name: '',
        roleKey: '',
        status: '',
        roleSort:'',
        label: '',
        deptIds: undefined,
        menuIds: undefined,
      },
      editRoleParam: {
        name: '',
        roleKey: '',
        status: '',
        roleSort: '',
        label: '',
        deptIds: undefined,
        menuIds: undefined,
      },
      roleList: [],
      rules: {
        name: [{required: true, message: '角色名不能为空', trigger: 'blur'}],
        roleKey: [{required: true, message: '权限字符不能为空', trigger: 'blur'}],
        status: [{required: true, message: '启用状态不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
    this.roles()
  },
  methods: {
    // 角色列表
    roles() {
      roleList().then(response => {
        if (response.code === 200) {
          this.roleList = response.data[0]
          this.roleList.map(function (ele) {
            if (ele.status === 1) {
              ele.status = '启用'
            } else {
              ele.status = '停用'
            }
          })
        } else {
          this.msgError('查询角色列表失败')
        }
      })
    },
    // 参数查询
    queryRoleByParam() {
      getRoleByParams(this.roleQuery).then(response => {
        if (response.code === 200) {
          this.roleList = response.data[0]
        } else {
          this.msgError('查询角色列表失败')
        }
      })
    },
    // 添加角色
    addRole() {
      // 获取部门列表
      getDepts().then(response => {
        if (response.code === 200) {
          this.depts = response.data[0]
        } else {
          this.msgError("查询部门失败")
        }
      })
      // 获取菜单列表
      getMenus().then(response => {
        if (response.code === 200) {
          this.menus = response.data[0]
        } else {
          this.msgError("查询菜单失败")
        }
      })
      this.addRoleDialog = true
    },
    // 创建角色确认按钮
    confirmAddRole() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addRole(this.addParams).then(response => {
            if (response.code === 200) {
              this.msgSuccess('创建角色成功')
              this.roles()
              this.addRoleDialog = false
            } else {
              this.msgError('创建角色失败')
            }
          })
        }
      })
    },
    // 关闭创建角色dialog
    closeAddRoleDialog() {
      this.addParams = {}
      this.$refs.form.resetFields()
    },
    updateRoleStatus(id, status) {
      const param = {
        id: id,
        status: undefined
      }
      if (status === '启用') {
        param.status = 0
      } else {
        param.status = 1
      }
      UpdateRoleStatus(param).then(response => {
        if (response.code === 200) {
          this.msgSuccess('状态更新成功成功')
          this.roles()
        } else {
          this.msgError(response.message)
        }
      })
    },
    // 编辑角色按钮
    editRole(id) {
      // 获取部门列表
      getDepts().then(response => {
        if (response.code === 200) {
          this.depts = response.data[0]
        } else {
          this.msgError("查询部门失败")
        }
      })
      // 获取菜单列表
      getMenus().then(response => {
        if (response.code === 200) {
          this.menus = response.data[0]
        } else {
          this.msgError("查询菜单失败")
        }
      })
      const param = {
        id: id
      }
      getRoleById(param).then(response => {
        if (response.code === 200) {
          this.editRoleParam = response.data[0]
        } else {
          this.msgError(response.message)
        }
      })
      this.editRoleDialog = true
    },
    confirmEditRole() {
      this.$refs['form'].validate(valid => {
        if (valid){
          updateRole(this.editRoleParam).then(response => {
            if (response.code === 200) {
              this.msgSuccess('更新角色成功')
              this.roles()
              this.editRoleDialog = false
            } else {
              this.msgError('更新角色失败')
            }
          })
        }
      })
    },
    // 关闭编辑角色dialog
    closeEditRoleDialog() {
      this.addParams = {}
      this.$refs.form.resetFields()
    },
    deleteRole(id) {
      const param = {
        id: id
      }
      this.$confirm('请确实是否删除该角色', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(param).then(response => {
          if (response.code === 200) {
            this.roles()
            this.msgSuccess('删除角色成功')
          } else {
            this.msgError('删除角色失败')
          }
        })
      })
    }
  }
}
</script>

<style lang="css">
.role-head {
  white-space: nowrap;
  margin: 15px 30px;
  width: 100vh;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.search-role-dept {
  width: 180px;
}

.role-table {
  margin: 30px 30px;
}
</style>
