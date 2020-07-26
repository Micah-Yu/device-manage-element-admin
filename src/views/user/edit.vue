<template>
  <el-form ref="userForm" :model="userForm" :rules="rules" label-width="100px" class="demo-userForm container">
    <el-form-item label="账号" prop="username">
      <el-input v-model="userForm.username" style="min-width: 300px" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="userForm.password" />
    </el-form-item>
    <el-form-item label="备注名" prop="nickName">
      <el-input v-model="userForm.nickName" :disabled="userForm.roles === 'root'" />
    </el-form-item>
    <el-form-item label="权限" prop="roles">
      <el-select v-model="userForm.roles" placeholder="选择创建账号权限" :disabled="userForm.roles === 'root'">
        <el-option label="管理员" value="admin" />
        <el-option label="用户" value="edit" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button v-if="hasData" type="primary" @click="handleUpdate('userForm')">更新用户</el-button>
      <el-button v-if="!hasData" type="primary" @click="submitForm('userForm')">添加用户</el-button>
      <el-button @click="resetForm('userForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { createUser, updateUser } from '@/api/user'

export default {
  data() {
    return {
      hasData: false,
      userForm: {
        username: '',
        password: '',
        nickName: '',
        roles: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '不能少于6个字符', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入备注名', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择权限', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query._id) {
      this.hasData = true
      this.userForm = Object.assign({}, this.$route.query)
      this.userForm.roles = this.userForm.roles[0]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createUser(this.userForm).then((result) => {
            if (result.code === 0) {
              this.$message = result.msg
              this.$router.push({ path: '/user/manage' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    handleUpdate(formName) {
      delete this.userForm['__v']
      delete this.userForm._id

      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser({
            condition: { _id: this.$route.query._id },
            value: this.userForm
          }).then((result) => {
            if (result.code === 0) {
              this.$router.push({ path: '/user/manage' })
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

