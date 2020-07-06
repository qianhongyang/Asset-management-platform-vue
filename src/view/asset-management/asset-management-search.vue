<template>
  <div>
    <Form ref="formValidate" name="formValidate" :model="formdate">
        <Input v-model="formdate.asset_numbers" placeholder="资产编号" style="width: 180px;margin-left: 10px"/>
        <Input v-model="formdate.use_users" placeholder="使用人" style="width: 180px;margin-left: 10px"/>
        <Input v-model="formdate.brand" placeholder="品牌" style="width: 180px;margin-left: 10px"/>
        <Input v-model="formdate.department" placeholder="部门" style="width: 180px;margin-left: 10px"/>
        <Input v-model="formdate.model" placeholder="型号" style="width: 180px;margin-left: 10px"/>
        <Input v-if="!collapsed" v-model="formdate.system_version" placeholder="系统版本"
               style="width: 180px;margin-left: 10px;margin-top: 10px"/>
        <Input v-else v-model="formdate.system_version" placeholder="系统版本"
             style="width: 180px;margin-left: 10px;"/>
        <Button type="success" style="margin-left: 10px;margin-top: 10px" @click="search">搜索</Button>
        <Button  @click="handleReset('formValidate')" style="margin-left: 10px;margin-top: 10px">重置</Button>
    </Form>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "AssetManagementSearch",
    data() {
      return {
        formdate: {},
        collapsed:false,
      }
    },
    methods: {
      search() {
        var _this = this;
        axios.post('/api/search/', this.formdate, {}).then(function (res) {
          _this.$store.commit("change_res_data",res.data)
          _this.$Message.success('Success!');
        }).catch(function (err) {
          console.log(err);
        })
      },
      handleReset(name) {
        this.formdate={};
      }
    },
    computed:{
      get_collapsed(){
        return this.$store.state.app.collapsed
      }
    },
    watch:{
      get_collapsed(){
        this.collapsed=this.$store.state.app.collapsed
      }
    }
  }
</script>

<style scoped>

</style>

