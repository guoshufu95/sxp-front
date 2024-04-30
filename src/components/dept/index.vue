<template>
  <div>
    <div class="dept-head">
      <div class="search-dept">
        部门
        <el-input clearable v-model="deptQuery.name" placeholder="请输入部门名称"
                  style="margin-left: 15px"></el-input>
      </div>
      <div class="search-dept">
        状态
        <el-input clearable v-model="deptQuery.status" placeholder="请输入部门状态"
                  style="margin-left: 15px"></el-input>
      </div>
      <div class="search-dept">
        <el-button type="primary" @click="searchByParam">搜索</el-button>
        <el-button type="primary" @click="addDept">新增</el-button>
      </div>
    </div>
    <div class="dept-table">
      <el-table
          :data="dpList"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
            prop="label"
            label="部门名称"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="leader"
            label="部门负责人"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="status"
            label="在线状态"
            width="250"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="250"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editDept(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteDept(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="addDeptDialog" width="600px" :lock-scroll="false" :append-to-body="true"
                 @close="closeDeptAddDialog">
        <el-form ref="form" :model="addParams" :rules="rules" label-width="80px">
          <el-form-item label="上级部门" prop="parentId">
            <Treeselect
                v-model="addParams.parentId"
                :options="deptTree"
                placeholder="请选择部门"
            />
          </el-form-item>
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="addParams.name" type="text"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="name">
            <el-input v-model="addParams.leader" type="text"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="name">
            <el-input v-model="addParams.phone" type="text"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="name">
            <el-input v-model="addParams.email" type="text"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="addParams.status" placeholder="请选择启用状态">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right;" type="primary" @click="confirmAdd()">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="editDeptDialog" width="600px" :lock-scroll="false" :append-to-body="true"
                 @close="closeEditDialog">
        <el-form ref="form" :model="editParams" :rules="rules" label-width="80px">
          <el-form-item v-show="editParams.parentId !== 0" label="上级部门" prop="parentId">
            <Treeselect
                v-model="editParams.parentId"
                :options="deptTree"
                placeholder="请选择部门"
            />
          </el-form-item>
          <el-form-item label="部门名称" prop="label">
            <el-input v-model="editParams.label" type="text"></el-input>
          </el-form-item>
          <el-form-item label="负责人" prop="name">
            <el-input v-model="editParams.leader" type="text"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="name">
            <el-input v-model="editParams.phone" type="text"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="name">
            <el-input v-model="editParams.email" type="text"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="editParams.status" placeholder="请选择启用状态">
              <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right;" type="primary" @click="confirmUpdate()">确认</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {del, deptByParams, getDeptById, getDeptList, getDepts, insert, update} from "@/api/depts";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dept",
  components: {Treeselect},
  data() {
    return {
      deptQuery: {
        name: '',
        status: '',
      },
      dpList: [],
      addDeptDialog: false,
      editDeptDialog: false,
      deptTree: [],
      status: [{
        value: 1,
        label: "正常"
      }, {
        value: 0,
        label: "停用"
      }],
      addParams: {
        parentId: undefined,
        label: '',
        leader: '',
        phone: '',
        email: '',
        status: undefined,
      },
      editParams: {
        ID: 0,
        parentId: undefined,
        label: '',
        leader: '',
        phone: '',
        email: '',
        status: undefined,
      },
      rules: {
        parentId: [{required: true, message: '上级部门不能为空', trigger: 'blur'}],
        label: [{required: true, message: '部门名称不能为空', trigger: 'blur'}],
        leader: [{required: true, message: '负责人不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '电话不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
        status: [{required: true, message: '启用状态不能为空', trigger: 'blur'}],
      },
    }
  },
  created() {
    this.deptList()
  },
  methods: {
    //  首页部门信息
    deptList() {
      getDeptList().then(response => {
        if (response.code === 200) {
          this.dpList = response.data[0]
        } else {
          this.msgError('获取部门列表失败')
        }
      })
    },
    closeDeptAddDialog() {
      this.addParams = {}
      this.addDeptDialog = false
      this.$refs.form.resetFields()
    },
    closeEditDialog() {
      this.editParams = {}
      this.editDeptDialog = false
      this.$refs.form.resetFields()
    },
    // 条件查询
    searchByParam() {
      deptByParams(this.deptQuery).then(response => {
        if (response.code === 200) {
          this.dpList = response.data[0]
        } else {
          this.msgError('查询部门失败')
        }
      })
    },
    // 添加部门
    addDept() {
      this.addDeptDialog = true
      getDepts().then(response => {
        if (response.code === 200) {
          this.deptTree = response.data[0]
          console.log(this.deptTree)
        } else {
          this.msgError("查询部门失败")
        }
      })
    },
    // 确认添加按钮
    confirmAdd() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          console.log(this.addParams)
          insert(this.addParams).then(response => {
            if (response.code === 200) {
              this.msgSuccess('添加部门成功')
              this.addDeptDialog = false
              this.deptList()
            } else {
              this.msgError('添加部门失败')
            }
          })
        }
      })
    },
    // 编辑部门
    editDept(id) {
      getDepts().then(response => {
        if (response.code === 200) {
          this.deptTree = response.data[0]
        } else {
          this.msgError("查询部门失败")
        }
      })
      const param = {
        id: id
      }
      this.editDeptDialog = true
      getDeptById(param).then(response => {
        if (response.code === 200) {
          this.editParams = response.data[0]
        } else {
          this.msgError('查询dept信息失败')
        }
      })
    },
    // 确认更新按钮
    confirmUpdate() {
      update(this.editParams).then(response => {
        if (response.code === 200) {
          this.msgSuccess('更新部门信息成功')
          this.editDeptDialog = false
          this.deptList()
        } else {
          this.msgError('更新部门信息失败')
        }
      })
    },
    // 删除部门
    deleteDept(id) {
      const param = {
        id: id
      }
      del(param).then(response => {
        if (response.code === 200) {
          this.msgSuccess('删除部门成功')
          this.deptList()
        } else {
          this.msgError('删除部门失败')
        }
      })
    }
  }
}
</script>

<style lang="css">
.dept-head {
  white-space: nowrap;
  margin-top: 15px;
  width: 100vh;
  height: auto;
  display: flex;
}

.search-dept {
  margin-left: 30px;
  width: 200px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.dept-table {
  margin: 30px 30px;
}

</style>
