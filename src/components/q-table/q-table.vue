<template>
  <div>

    <Modal
      v-model="showCancel"
      title="资产信息编辑"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel="cancel">
      <Form ref="formValidate" :model="formdate" :rules="ruleValidate" :label-width="80">
        <FormItem label="资产编号" prop="asset_numbers">
          <Input :maxlength="30" style="width: 80%" class="input" v-model="formdate.asset_numbers"
                 placeholder="请输入资产编号"/>
        </FormItem>
        <FormItem label="使用人" prop="use_users">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.use_users"/>
        </FormItem>
        <FormItem label="部门" prop="department">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.department"/>
        </FormItem>
        <FormItem label="品牌" prop="brand">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.brand"/>
        </FormItem>
        <FormItem label="型号" prop="model">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.model"/>
        </FormItem>
        <FormItem label="系统版本" prop="system_version">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.system_version"/>
        </FormItem>
        <FormItem label="分辨率" prop="resolution">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.resolution"/>
        </FormItem>
        <FormItem label="负责人" prop="administrator">
          <Input :maxlength="10" style="width: 80%" class="input" v-model="formdate.administrator"/>
        </FormItem>
        <FormItem label="备注" prop="notes">
          <Input :maxlength="10" show-word-limit type="textarea" style="width: 80%" class="input"
                 v-model="formdate.notes"/>
        </FormItem>
      </Form>
    </Modal>


    <Table border :columns="columns12" :data="data6" :border="true">
      <template slot-scope="{ row }" slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index,data6[index])">编辑</Button>
        <Button type="error" size="small" @click="removed(index,data6[index])">删除</Button>
      </template>
    </Table>
    <div style="float:right; margin-top: 10px;position:absolute;right:10px;bottom:10px;">
      <Page :total="dataCount" :page-size="pageSize" :page-size-opts="pageSizeOpts" show-sizer  show-elevator @on-change="change_page"/>
    </div>
  </div>
</template>
<script>
  import axios from "axios";

  export default {
    name: "q-table",
    props: ["columns12", "data6", "removed","dataCount","pageSize","change_page","pageSizeOpts"],
    data() {
      return {
        formdate: {},
        showCancel: false,
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
      edit(index, item) {
        this.formdate = item;
        this.showCancel = true
      },
      ok() {
        this.$Message.info('Clicked ok');
      },
      cancel() {
        this.$Message.info('Clicked cancel');
      },
      handleSubmit(name) {
        var _this = this;
        this.$refs[name].validate((valid) => {
          console.log(this.formdate);
          axios.post('/api/edit/', this.formdate, {}).then(function (res) {
            console.log(res);
            _this.$Message.success('Success!');
          }).catch(function (err) {
            console.log(err);
            _this.$Message.error('Fail!');
          })
        })
      },
    }
  }
</script>
