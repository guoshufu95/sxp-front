<template>
  <div>
    <div class="head-user-local">
      <div class="search">
        <div>
          用户名
        </div>
        <el-input clearable v-model="query.username" placeholder="请输入用户名" style="margin-left: 15px"></el-input>
      </div>
      <div class="search">
        手机号
        <el-input clearable v-model="query.phone" placeholder="请输入手机号" style="margin-left: 15px"></el-input>
      </div>
      <div class="search">
        在线状态
        <el-input clearable v-model="query.status" placeholder="请输入在线状态" style="margin-left: 15px"></el-input>
      </div>
      <div class="search">
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
      <div class="search" >
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </div>
    <div class="table-user-local">
      <el-table
          :data="list"
      >
        <el-table-column
            prop="username"
            label="用户名"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="nick_name"
            label="别名"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号码"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="last_login_time"
            label="上次登录时间"
            width="200"
        >
        </el-table-column>
        <el-table-column
            prop="status"
            label="在线状态"
            width="200"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUser(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="delUser(scope.row.id)">删除</el-button>
            <el-button type="text" size="small" @click="updateStatus(scope.row.id, scope.row.status==='在线'?'下线':'上线')">{{scope.row.status==='在线'?'下线':'上线'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="detailDialog" width="600px" :lock-scroll="false" :append-to-body="true" @close="closeDetailDialog">
      <el-form v-if="detailUser" ref="form" :rules="rules" :model="detailUser" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="detailUser.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="nick_name">
          <el-input v-model="detailUser.nick_name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="detailUser.sex" placeholder="请选择性别">
            <el-option
                v-for="item in gender"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="depts">
          <Treeselect
              :multiple="true" value = "detailUser.depts"
              v-model="detailUser.depts"
              :options="depts"
              placeholder="请选择归属部门"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="detailUser.email" type="text"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="detailUser.phone" type="text"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="detailUser.remark" type="text"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmUpdate(detailUser.id)">确认修改</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="addDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeAddDialog">
      <el-form v-if="addUser" ref="form" :model="addUser" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUser.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUser.password" type="text"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="nick_name">
          <el-input v-model="addUser.nick_name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addUser.sex" placeholder="请选择性别">
            <el-option
                v-for="item in gender"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="depts">
          <Treeselect
              :multiple="true"
              v-model="addUser.depts"
              :options="depts"
              placeholder="请选择归属部门"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUser.email" type="text"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="addUser.phone" type="text"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addUser.remark" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmAdd()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {del, getById, getByParams, getUser, insert, update, updateStatus} from '@/api/user'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {getDepts} from "@/api/depts";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "LocalUser",
  // eslint-disable-next-line vue/no-unused-components
  components: {Treeselect},
  data() {
    return {
      list: [],
      query: {
        username: '',
        phone: '',
        status: ''
      },
      upStatus:{
        id:0,
        status:0
      },
      depts: [],
      gender: [{
        value: "1",
        label: "男"
      }, {
        value: "2",
        label: "女"
      }],
      test:[2,3],
      value: '',
      deptOptions: undefined,
      detailDialog: false,
      detailUser: {
        id:'',
        username: '',
        nick_name: '',
        sex: '',
        email: '',
        phone: '',
        remark: '',
        depts: undefined,
      },
      addDialog: false,
      addUser: {
        username: '',
        password: '',
        nick_name: '',
        sex: '',
        email: '',
        phone: '',
        remark: '',
        depts: undefined,
      },
      rules: {
        username: [{required: true, message: '参数名称不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        nick_name: [{required: true, message: '别名称不能为空', trigger: 'blur'}],
        sex: [{required: true, message: '性别不能为空', trigger: 'blur'}],
        depts: [{required: true, message: '部门不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '电话号码不能为空', trigger: 'blur'}],
      }
    }
  },
  created() {
  this.listUsers()
  },
  methods: {
    // 用户列表展示
    listUsers() {
      getUser().then(response => {
        if (response.code === 200) {
          this.list = response.data[0]
        } else {
          this.msgError("获取用户列表失败")
        }
      })
    },
    // 条件查询
    search() {
      getByParams(this.query).then(response => {
        if (response.code === 200) {
          this.list = response.data[0]
        } else {
          this.msgError("查询用户失败")
        }
      })
    },
    // 添加用户dialog展开
    add() {
      getDepts().then(response => {
        if (response.code === 200) {
          this.depts = response.data[0]
        } else {
          this.msgError("查询部门失败")
        }
      })
      this.addDialog = true
    },
    // 关闭添加用户的dialog
    closeAddDialog() {
      this.$refs.form.resetFields()
    },
    // 关闭新增用户的dialog
    closeDetailDialog(){
      this.$refs.form.resetFields()
    },
    /// 添加用户确认按钮
    confirmAdd() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          insert(this.addUser).then(response => {
            if (response.code === 200) {
              this.msgSuccess("添加用户成功")
              this.addDialog =  false
              this.listUsers()
            } else {
              this.msgError("添加用户失败")
            }
          })
        }
      })
    },
    // 编辑
    editUser(id) {
      const param = {id: id}
      getById(param).then(response => {
        if (response.code === 200) {
          this.detailUser = response.data[0]
          console.log(this.detailUser)
        } else {
          this.msgError("查询用户失败")
        }
      })
      // 获取部门tree
      getDepts().then(response => {
        if (response.code === 200) {
          this.depts = response.data[0]
        } else {
          this.msgError("查询部门失败")
        }
      })
      this.detailDialog = true
    },
    confirmUpdate(id) {
      this.id = id
      update(this.detailUser).then(response => {
        if (response.code === 200) {
          this.msgSuccess("更新成功")
          this.listUsers()
          this.detailDialog = false
        } else {
          this.msgError("更新用户数据失败")
        }
      })
    },
    // 删除
    delUser(id) {
      const param = {id: id}
      this.$confirm('请确实是否删除该用户', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(param).then(response => {
          if (response.code === 200) {
            this.msgSuccess("删除用户成功")
            this.listUsers()
          } else {
            this.msgError("删除用户失败")
          }
        })

      })
    },
    // 更新用户上下限状态
    updateStatus(id, status) {
      this.upStatus.id = id
      if (status === '上线') {
        this.upStatus.status = 1
      } else {
        this.upStatus.status = 0
      }

      updateStatus(this.upStatus).then(response => {
        if (response.code === 200) {
          this.msgSuccess("状态更新成功")
          this.listUsers()
        } else {
          this.msgError("状态更新失败")
        }
      })
    }
  }
}
</script>

<style lang="css">
.head-user-local {
  white-space: nowrap;
  margin-top: 30px;
  width: 100vh;
  height: 100%;
  display: flex;
  justify-content: space-around;
}

.search {
  margin-left: 35px;
  text-align: center;
  display: flex;
  align-items: center;
}

.table-user-local {
  margin-top: 30px;
  margin-left: 30px;
}
</style>
