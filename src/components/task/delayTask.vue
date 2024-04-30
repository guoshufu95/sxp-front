<template>
  <div>
    <div class="task-head">
      <div class="search-task">
        名称
        <el-input clearable v-model="taskQueryParam.name" placeholder="任务名称"
                  style="margin-left: 15px"></el-input>
      </div>
      <div class="search-task">
        任务状态
        <el-select clearable style="margin-left: 15px" v-model="taskQueryParam.status" placeholder="请选择状态">
          <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.label">
          </el-option>
        </el-select>
      </div>
      <div class="search-task">
        <el-button type="primary" @click="queryTask">搜索</el-button>
        <el-button type="primary" @click="addTask">新增</el-button>
      </div>
    </div>
    <div class="tasks-table">
      <el-table
          :data="tasks"
          row-key="name"
          height="70vh"
      >
        <el-table-column
            prop="name"
            label="用户名"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="execTime"
            label="执行时间"
            width="250"
        >
        </el-table-column>
        <el-table-column
            prop="retryTime"
            label="重试次数"
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
            prop="status"
            label="状态"
            width="250"
        >
          <template slot-scope="scope">
            <el-button  :disabled="scope.row.status==='失败'" type="text" :loading="scope.row.status==='执行中'">{{scope.row.status}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="250"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTask(scope.row.ID)">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button v-if="scope.row.status==='失败'" type="text" size="small">重试</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="addTaskDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeAddTaskDialog">
      <el-form v-if="addTaskParam" ref="form" :model="addTaskParam" :rules="rules" label-width="80px">
        <el-form-item label="任务名" prop="name">
          <el-input v-model="addTaskParam.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="addTaskParam.value" type="text"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="execTime">
          <el-date-picker
              v-model="addTaskParam.execTime"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="重试次数" prop="retryTime">
          <el-input v-model="addTaskParam.retryTime" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmAddTask()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="editTaskDialog" width="600px" :lock-scroll="false" :append-to-body="true"
               @close="closeEditTaskDialog">
      <el-form v-if="editTaskParam" ref="form" :model="editTaskParam" :rules="rules" label-width="80px">
        <el-form-item label="任务名" prop="name">
          <el-input v-model="editTaskParam.name" type="text"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="value">
          <el-input v-model="editTaskParam.value" type="text"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" prop="execTime">
          <el-date-picker
              v-model="editTaskParam.execTime"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="重试次数" prop="retryTime">
          <el-input v-model="editTaskParam.retryTime" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" type="primary" @click="confirmEditTask()">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {taskList, addTask, getTasksByParam, getById, updateTask} from "@/api/task";

export default {
  name: "delayTask",
  data() {
    return {
      taskQueryParam: {
        name: '',
        status: '',
      },
      status: [{
        value: "0",
        label: "未执行"
      }, {
        value: "1",
        label: "成功"
      },{
        value: "2",
        label: "失败"
      },{
        value: "3",
        label: "执行中"
      }],
      tasks: [],
      ws:null,
      addTaskDialog:false,
      editTaskDialog:false,
      addTaskParam:{
        name:'',
        value:'',
        execTime:undefined,
        retryTime:'',
      },
      editTaskParam:{
        name:'',
        value:'',
        execTime:undefined,
        retryTime:'',
      },
      rules:{
        name: [{required: true, message: '任务名不能为空', trigger: 'blur'}],
        value: [{required: true, message: 'value不能为空', trigger: 'blur'}],
      }
    }
  },
  mounted() {
    this.initWebSocket();
  },
  created() {
    this.initWebSocket();
    this.taskList()
  },
  beforeDestroy: function () {
    //页面销毁时关闭
    if (this.ws) {
      this.ws.close();
      console.log("socket连接关闭中")
    }
    this.ws = {}
  },
  methods: {
    handleTasksCurrentChange(){

    },
    // 条件查询
    queryTask(){
      getTasksByParam(this.taskQueryParam).then(response => {
        if (response.code === 200) {
          this.tasks = response.data[0]
          this.tasks.map(function (ele) {
            if (ele.status === 0) {
              ele.status = '未开始'
            }
            if (ele.status === 1) {
              ele.status = '成功'
            }
            if (ele.status === 2) {
              ele.status = '失败'
            }
            if (ele.status === 3) {
              ele.status = '执行中'
            }
          })
        }else {
          this.msgError('查询失败：', response.message)
        }
      })
    },
    addTask(){
      this.addTaskDialog = true
    },
    // 编辑按钮
    editTask(id){
      const param = {id: id}
      getById(param).then(response => {
        if (response.code === 200) {
          this.editTaskParam = response.data[0]
        } else {
          this.msgError('查询失败：', response.message)
        }
      })
      this.editTaskDialog = true
    },
    closeAddTaskDialog() {
      this.addTaskParam = {}
      this.addTaskDialog = false
    },
    closeEditTaskDialog(){
      this.editTaskParam = {}
      this.editTaskDialog = false
    },
    // 新增任务
    confirmAddTask() {
      this.$refs['form'].validate(valid => {
        if(valid) {
          const t = Date.parse(this.addTaskParam.execTime)
          this.addTaskParam.execTime =  t
          addTask(this.addTaskParam).then(response => {
            if (response.code === 200) {
              this.msgSuccess('创建成功')
              this.taskList()
              this.addTaskDialog = false
            } else {
              this.msgError('创建任务失败')
            }
          })
        }
      })
    },
    // 确认编辑按钮
    confirmEditTask(){
      updateTask(this.editTaskParam).then(response => {
        if (response.code === 200) {
          this.msgSuccess('更新成功')
          this.editTaskDialog = true
          this.taskList()
        } else {
          this.msgError('更新失败')
        }
      })
    },
    // 获取任务列表
    taskList() {
      taskList().then(response => {
        if (response.code === 200) {
          this.tasks = response.data[0]
          this.tasks.map(function (ele) {
            if (ele.status === 0) {
              ele.status = '未开始'
            }
            if (ele.status === 1) {
              ele.status = '成功'
            }
            if (ele.status === 2) {
              ele.status = '失败'
            }
            if (ele.status === 3) {
              ele.status = '执行中'
            }
          })
        } else {
          this.msgError('获取菜单列表失败')
        }
      })
    },
    initWebSocket() {
      //建立socket通道
      this.ws = new WebSocket(
          'ws:192.168.111.40:8001/taskSocket'
      );
      //socket连接成功后的回调函数
      this.ws.onopen = () => {
        console.log('websocket连接成功！');
        //若项目中没有使用nginx转发请求则忽略这步
        setInterval(() => {
          this.keepAlive();
        }, 2000);
      };
      //接收来自服务端消息的回调函数
      this.ws.onmessage = evt => {
        console.log('已接收来自后台的消息：', evt.data);
        // 刷新数据
        this.taskList()
      };
      //关闭socket的回调函数
      this.ws.onclose = function () {
        // 关闭 websocket
        console.log('... 连接已关闭 ...');
      };
      // // 路由跳转时结束websocket链接
      // this.$router.afterEach(function() {
      //   this.ws.close();
      // });
    },
    //持续向后台发送消息，用于维护socket通道不被nginx关闭
    keepAlive(webSocket) {
      if (webSocket) {
        if (webSocket.readyState === webSocket.OPEN) {
          this.ws.send('sxp-front-socket-health')
        }
      }
    },
  }
}
</script>

<style lang="css">
.task-head {
  white-space: nowrap;
  width: 40%;
  height: 100px;
  display: flex;
  justify-content: space-between;
}

.search-task {
  margin-left: 20px;
  width: 250px;
  display: flex;
  align-items: center;
}

.tasks-table {
  margin-left: 20px;
  overflow: hidden;
}
</style>
