<template>
  <q-table :removed="instance" :columns12="columns12" :data6="data6" :pageSize="pageSize" :dataCount="dataCount" :change_page="change_page" :pageSizeOpts="pageSizeOpts"/>
</template>
<script>
  import QTable from '@/components/q-table/q-table'
  import axios from "axios";

  export default {
    name: "asset-management-table",
    components: {
      QTable,
    },
    data() {
      return {
        a: true,
        dataCount: 0,
        dataList: [],
        pageSize: 8,
        pageSizeOpts:[8,16,32],
        columns12: [
          {
            title: '资产编号',
            key: 'asset_numbers',
            minWidth: 65,
            maxWidth: 100,
            resizable: true,
          },
          {
            title: '使用人',
            key: 'use_users',
            tooltip: true,
            minWidth: 50,
          },
          {
            title: '部门',
            key: 'department',
            tooltip: true,
            minWidth: 40,
          },
          {
            title: '品牌',
            key: 'brand',
            tooltip: true,
            minWidth: 40,
          },
          {
            title: '型号',
            key: 'model',
            tooltip: true,
            minWidth: 40,
          },
          {
            title: '系统版本',
            key: 'system_version',
            tooltip: true,
            minWidth: 50,
          },
          {
            title: '分辨率',
            key: 'resolution',
            tooltip: true,
            minWidth: 40,
          },
          {
            title: '负责人',
            key: 'administrator',
            tooltip: true,
            minWidth: 40,
          },
          {
            title: '备注',
            key: 'notes',
            tooltip: true,
            minWidth: 40,
          },
          {
            title: '最后更新时间',
            key: 'update_time',
            width: 120,
            tooltip: true,
          },
          // {
          //   title: '最后更新人',
          //   key: 'last_user'
          // },
          {
            title: 'Action',
            slot: 'action',
            width: 130,
            align: 'center',

          },
        ],
        data6: []
        // [
        // {
        //   asset_numbers: 1,
        //   use_users: "test_user",
        //   department: 'IT技术部',
        //   brand: "OPPO",
        //   model: "R15",
        //   system_version: "Andriod 10",
        //   resolution: "1080p",
        //   administrator: "xiaoming",
        //   notes: "测试",
        //   update_time: "2020-06-29",
        //   last_user: "xiaoming"
        // },
        // ]
      }
    },
    beforeMount() {
      var _this = this;
      axios.get('/api/info/', {}).then(function (res) {
        // console.log(res.data.assets_info);
        _this.dataList = res.data.assets_info;
        _this.dataCount = _this.dataList.length;
        if (_this.dataCount < _this.pageSize) {
          _this.data6 = _this.dataList
        } else {
          _this.data6 = _this.dataList.slice(0, _this.pageSize)
        }
      }).catch(function (err) {
        console.log(err);
      })
    },
    methods: {
      change_page(index) {
        var _start = (index - 1) * this.pageSize;
        var _end = index * this.pageSize;
        this.data6 = this.dataList.slice(_start,_end)
      },
      remove(index, item) {
        var _this = this;
        this.data6.splice(index, 1);
        axios.post('/api/delete/', item.id, {}).then(function (res) {
          _this.$Message.success("删除成功")
        }).catch(function (err) {
          _this.$Message.error("删除失败")
        })
      },

      instance(index, item) {
        const title = '删除操作';
        const content = '<p>确定删除这条资产信息吗?</p>';
        this.$Modal.confirm({
          title: title,
          content: content,
          onOk: () => {
            this.remove(index, item)
          }
        })
      },
    },
    computed: {
      listen_res_data() {
        return this.$store.state.asset.res_data;
      }
    },
    watch: {
      listen_res_data() {
        this.data6 = this.$store.state.asset.res_data.assets_info
      }
    },
  }
</script>
