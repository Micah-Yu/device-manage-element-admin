<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm container">
    <el-form-item label="设备名称" prop="name">
      <el-input v-model="ruleForm.name" style="min-width: 300px" />
    </el-form-item>
    <el-form-item label="设备编号" prop="code">
      <el-input v-model="ruleForm.code" />
    </el-form-item>
    <el-form-item label="所属部门" prop="department">
      <el-input v-model="ruleForm.department" />
    </el-form-item>
    <el-form-item label="设备型号" prop="model">
      <el-input v-model="ruleForm.model" />
    </el-form-item>
    <el-form-item label="数量" prop="number">
      <el-input v-model="ruleForm.number" />
    </el-form-item>
    <el-form-item label="设备状态" prop="status">
      <el-radio-group v-model="ruleForm.status">
        <el-radio :label="true">在库</el-radio>
        <el-radio :label="false">已出库</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="管理人" prop="keeper">
      <el-select v-model="ruleForm.keeper" placeholder="设备管理人">
        <el-option label="玉明柳" value="U10011-玉明柳" />
        <el-option label="龚贝贝" value="U3151-龚贝贝" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button v-if="hasData" type="primary" @click="handleUpdata('ruleForm')">更新设备</el-button>
      <el-button v-if="!hasData" type="primary" @click="submitForm('ruleForm')">添加设备</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { createDevice, updateDevice } from '@/api/device'

export default {
  data() {
    return {
      hasData: false,
      ruleForm: {
        name: '',
        code: '',
        department: '',
        model: '',
        number: 1,
        keeper: '',
        status: true
      },
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
          { min: 2, message: '不能少于两个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入设备所属部门', trigger: 'blur' }
        ],
        model: [
          { message: '请输入设备型号', trigger: 'blur' }
        ],
        number: [
          { type: 'number', required: true, message: '请输入数量', trigger: 'blur' }
        ],
        keeper: [
          { required: true, message: '请输入设备管理人', trigger: 'blur' }
        ],
        status: [
          { type: 'boolean', require: true, message: '请选择设备状态', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query._id) {
      this.hasData = true
      this.ruleForm = Object.assign({}, this.$route.query)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createDevice(this.ruleForm).then((result) => {
            if (result.code === 0) {
              this.$message({
                message: '设备录入成功！！',
                type: 'success'
              })
              this.$router.push({ path: '/device/manage' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleUpdata(formName) {
      delete this.ruleForm.__v
      delete this.ruleForm._id
      this.ruleForm.number = Number(this.ruleForm.number)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDevice({
            condition: { _id: this.$route.query._id },
            value: this.ruleForm
          }).then((result) => {
            if (result.code === 0) {
              this.$message({
                message: '设备更新成功！！',
                type: 'success'
              })
              this.$router.push({ path: '/device/manage' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
  .container{
    padding: 40px 20px;
    max-width: 580px;
  }
</style>

