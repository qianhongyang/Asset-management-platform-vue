<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="资产编号" prop="asset_numbers">
      <Input :maxlength="30"  class="input" v-model="formValidate.asset_numbers" placeholder="请输入资产编号"></Input>
    </FormItem>
    <FormItem label="使用人" prop="use_users">
      <Input :maxlength="10"  class="input" v-model="formValidate.use_users" placeholder="请输入使用人"></Input>
    </FormItem>
    <FormItem label="部门" prop="department">
      <Input :maxlength="15"  class="input" v-model="formValidate.department" placeholder="请输入部门"></Input>
    </FormItem>
    <FormItem label="品牌" prop="brand">
      <Input :maxlength="10"  class="input" v-model="formValidate.brand" placeholder="请输入品牌"></Input>
    </FormItem>
    <FormItem label="型号" prop="model">
      <Input :maxlength="10"  class="input" v-model="formValidate.model" placeholder="请输入系统类型"></Input>
    </FormItem>
    <FormItem label="系统版本" prop="system_version">
      <Input :maxlength="10"  class="input" v-model="formValidate.system_version" placeholder="请输入系统版本"></Input>
    </FormItem>
    <FormItem label="分辨率" prop="resolution">
      <Input :maxlength="10"  class="input" v-model="formValidate.resolution" placeholder="请输入分辨率"></Input>
    </FormItem>
    <FormItem label="负责人" prop="administrator">
      <Input :maxlength="10"  class="input" v-model="formValidate.administrator"
             placeholder="请输入负责人"></Input>
    </FormItem>
    <FormItem label="备注" prop="notes">
      <Input :maxlength="100" show-word-limit type="textarea" class="input" v-model="formValidate.notes"
             placeholder="请输入备注"/>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
  import axios from 'axios'

  export default {
    name: "asset-management-add",
    data() {
      return {
        formValidate: {
          asset_numbers: '',
          use_users: '',
          department: '',
          brand: '',
          model: '',
          system_version: '',
          resolution: '',
          administrator: '',
          notes: '',
        },
        ruleValidate: {
          asset_numbers: [
            {required: true, message: '资产编号不能为空', trigger: 'blur'}
          ],
          use_users: [
            {required: true, message: '使用人不能为空', trigger: 'blur'},
          ],
          department: [
            {required: true, message: '部门不能为空', trigger: 'blur'}
          ],
          brand: [
            {required: true, message: '品牌不能为空', trigger: 'blur'}
          ],
          model: [
            {required: true, message: '系统类型不能为空', trigger: 'blur'}
          ],
          system_version: [
            {required: true, message: '系统版本不能为空', trigger: 'blur'}
          ],
          resolution: [
            {required: true, message: '分辨率不能为空', trigger: 'blur'}
          ],
          administrator: [
            {required: true, message: '负责人不能为空', trigger: 'blur'}
          ],
          notes: [
            {required: false}
          ],
        }
      }
    },
    methods: {
      handleSubmit(name) {
        var _this = this;
        this.$refs[name].validate((valid) => {
          console.log(this.formValidate);
          axios.post('/api/add/', this.formValidate, {}).then(function (res) {
            _this.$Message.success('Success!');
          }).catch(function (err) {
            console.log(err);
            _this.$Message.error('Fail!');
          })
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style scoped>
  .input {
    width: 500px;
  }
</style>
