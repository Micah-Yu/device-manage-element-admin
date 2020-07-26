<template>
  <el-table
    ref="filterTable"
    height="1000"
    :stripe="true"
    :border="true"
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      label="名称"
      width="180"
      prop="name"
      align="center"
    />
    <el-table-column
      label="编号"
      width="180"
      prop="code"
      align="center"
    />
    <el-table-column
      prop="number"
      label="数量"
      width="80"
      align="center"
    />
    <el-table-column
      prop="keeper"
      label="管理人"
      width="180"
      align="center"
    />
    <el-table-column
      prop="status"
      label="状态"
      width="100"
      align="center"
      :filters="[{ text: '已出库', value: false }, { text: '在库', value: true }]"
      :filter-method="filterStatus"
      filter-placement="bottom-end"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === false ? 'danger' : 'success'"
          disable-transitions
        >
          {{ scope.row.status === true ? '在库' : '已出库' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="管理"
      width="100"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          :type="scope.row.status === true ? 'success' : 'danger'"
          @click="handleClick(scope.row)"
        >
          {{ scope.row.status === true ? '出库' : '入库' }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="160"
      align="center"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
          @click="deviceUpdate(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          size="mini"
          @click="del(scope.row, scope.$index)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getDeviceInfo, updateDevice, delDevice } from '@/api/device'

// todo: popconfirm 中 onConfirm 如何触发
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getDevice()
  },
  methods: {
    async getDevice() {
      const res = await getDeviceInfo()

      if (res.code !== 0) {
        return this.$message('获取设备数据失败')
      }

      this.tableData = res.data[0]
    },

    handleClick(row) {
      updateDevice({
        condition: { _id: row._id },
        value: { status: !row.status }
      }).then((result) => {
        if (result.code === 0) {
          row.status = !row.status
        }
      })
    },

    deviceUpdate(row) {
      this.$router.push({ path: '/device/edit', query: row })
    },

    del(row, index) {
      this.$confirm(`【${row.name}】 将永久删除, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await delDevice({ _id: row._id })

        this.$message({
          type: res.type,
          message: res.msg
        })

        this.tableData.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    filterStatus(value, row) {
      return row.status === value
    }
  }
}
</script>
