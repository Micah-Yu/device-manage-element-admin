<template>
  <el-table
    ref="filterTable"
    height="1000"
    :stripe="true"
    :border="true"
    :data="userList"
    style="width: 100%"
  >
    <el-table-column
      label="账号"
      width="180"
      prop="username"
      align="center"
    />
    <el-table-column
      label="密码"
      width="180"
      prop="password"
      align="center"
    />
    <el-table-column
      prop="nickName"
      label="昵称"
      width="80"
      align="center"
    />
    <el-table-column
      label="权限"
      width="80"
      align="center"
    >
      <template slot-scope="scope">
        {{ scope.row.roles[0] === 'edit' ? '用户' : '管理员' }}
      </template>
    </el-table-column>
    <el-table-column
      label="编辑"
      width="120"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          type="warning"
          @click="userInfoUpdata(scope.row)"
        >
          编辑用户
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.roles[0] !== 'root'"
          type="danger"
          @click="handleClick(scope.row, scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getUserList, delUser } from '@/api/user'

export default {
  data() {
    return {
      userList: []
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const res = await getUserList()

      if (res.code !== 0) {
        return this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.userList = res.data[0]
    },

    handleClick(row, index) {
      this.$confirm(`【${row.nickName}】 将永久删除, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delUser({ _id: row._id })
        console.log(res)
        this.$message({
          type: res.type,
          message: res.msg
        })

        this.userList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    userInfoUpdata(row) {
      this.$router.push({ path: '/user/edit', query: row })
    },

    filterStatus(value, row) {
      return row.status === value
    }
  }
}
</script>
