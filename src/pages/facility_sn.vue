<template>
  <div id="app">
    <el-container>
      <el-header class="top_nav" style="height:auto;margin-bottom: 30px;">
        <ul>
          <li>
            <span
              style="width: 70px;display: inline-block;font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">门店名称：</span>
            <el-input style="width:65%;" v-model="storeName">
            </el-input>
          </li>
          <li>
            <span
              style="width: 70px;display: inline-block;font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">门店代码：</span>
            <el-input style="width:65%;" v-model="storeCode">
            </el-input>
          </li>
          <li>
            <span
              style="width: 80px;display: inline-block;font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);">设备SN号：</span>
            <el-input style="width:65%;" v-model="deviceSn">
            </el-input>
          </li>

          <li style="font-family:MicrosoftYaHei;margin-right: 10px;margin-left: 5px;">
            <el-button @click="search" style="width: 100px;background: #F8BD0A;color:#FFFEFE;">查询</el-button>
          </li>
          <li style="font-family:MicrosoftYaHei;color:#333;margin-right: 10px;">
            <el-button style="width: 120px;background: #E6D9B0;">设备状态导出</el-button>
          </li>
        </ul>
      </el-header>
      <el-main>
        <table class="table table-bordered table-striped table-hover text-center"
               style="width:100%;height: 60px;line-height: 60px;" v-bind:title="datalist">
          <thead>
          <tr>
            <th style="width: 11%;">设备SN号</th>
            <th style="width: 7%;">门店名称</th>
            <th style="width: 7%;">设备类型</th>
            <th style="width: 5%">通道号</th>
            <th style="width: 7%;">设备名称</th>
            <th style="width: 7%;">默认码流</th>
            <th style="width: 7%;">是否禁用</th>
            <th style="width: 10%;">安装时间</th>
            <th style="width: 12%;">是否为车牌识别设备</th>
            <th style="width: 12%;">是否为仅经销商可见</th>
            <th style="width: 15%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items">
            <td>{{item.videoSn}}</td>
            <td>{{item.storeName}}</td>
            <td>{{item.vType == 2 ?'nvr多通道':'ipc单通道'}}</td>
            <!-- == 2 ?'多通道':'单通道'-->
            <td>{{item.channelNo}}</td>
            <td>{{item.dName}}</td>
            <td>{{item.defalutStream}}</td>
            <td>
              <el-switch type="boolean" v-model="value1" active-color="#13C4DB"
                         inactive-color="#A9A9A9"></el-switch>
            </td>
            <td>{{item.installTime}}</td>
            <td>
              <el-switch type="boolean" v-model="value2" active-color="#13C4DB"
                         inactive-color="#A9A9A9"></el-switch>
            </td>
            <td>
              <el-switch type="boolean" v-model="value3" active-color="#13C4DB"
                         inactive-color="#A9A9A9"></el-switch>
            </td>
            <td style="text-align: center;">
              <div
                style="font-size:14px;font-family:MicrosoftYaHei;width: 108px;height: 24px;line-height: 24px;border-radius: 2px;margin: 0 auto;background:#719CA1;color:#fff;display: inline-block;">
                设备镜像设置
              </div>
              <div
                style="font-size:14px;font-family:MicrosoftYaHei;width: 80px;height: 24px;line-height: 24px;border-radius: 2px;border: 1px solid #719CA1;margin: 0 auto;    display: inline-block;">
                添加IPC
              </div>
            </td>
          </tr>

          </tbody>
        </table>
      </el-main>
    </el-container>
    <el-footer style="position: fixed;bottom: 0px;height:65px;background: #D6D9E8;width: 100%;padding-top:10px;">
      <v-pagination :total="this.total" :display='this.display' :current-page='this.current'
                    @pageSizeChange="pageSizeChange" @pagechange="pagechange"></v-pagination>
    </el-footer>
  </div>
</template>

<script>
  import pagination from '@/components/pagination'

  export default {
    name: "facility_sn",
    data() {
      return {
        total: 12,     // 记录总条数
        display: 12,   // 每页显示条数
        current: 1,   // 当前的页数

        storeName: '',//门店名称
        storeCode: '',//门店代码
        deviceSn:'',  //SN号

        value1: true,
        value2: true,
        value3:true,


        item: {
          'videoSn': '',//设备SN号
          'storeName':'',//门店名称
          'vType': '',//设备类型
          'channelNo': '',//通道号
          'dName': '',//设备名称
          'defalutStream': '',//默认码流
          'installTime': '',//安装时间
        },
        items: [
          {
            'videoSn': '',//设备SN号
            'storeName':'',//门店名称
            'vType': '',//设备类型
            'channelNo': '',//通道号
            'dName': '',//设备名称
            'defalutStream': '',//默认码流
            'installTime': '',//安装时间
          },
        ]
      }

    },
    /*分页注册组件*/
    components: {
      'v-pagination': pagination,
    },
    methods: {
      /*换页*/
      pagechange: function (currentPage) {
        console.log(currentPage);
        // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'devicesManage/getDeviceSnList',
          params: {
            "pageSize": that.display,// 每页显示条数
            pageNumber: currentPage   //当前页码
          }
        }).then((response) => {
          that.items = response.data.data.page.records;
          // that.total=response.data.data.storeList.total;
          that.current = currentPage;
        }).catch((error) => {
          console.log(error);
        })

      },
      /*选择每页显示多少条时候的方法（上拉框）*/
      pageSizeChange(pageSize) {
        var that = this;
        console.log('****pageSize', pageSize);
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'devicesManage/getDeviceSnList',
          params: {
            "pageSize": pageSize,//每页数量
            pageNumber: that.current//页码
          }
        }).then((response) => {
          that.items = response.data.data.page.records;
          // that.total=response.data.data.storeList.total;
          console.log('****', pageSize);
          that.display = parseInt(pageSize);
        }).catch((error) => {
          console.log(error);
        })
      },

      /*页面数据列表*/
      datalist: function () {
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'devicesManage/getDeviceSnList',
          params: {
            "pageSize": that.display,
            "pageNumber":that.current
          }
        }).then((response) => {
          console.log("*******", response);
          that.items = response.data.data.page.records;
          that.total = response.data.data.page.total;
          console.log("that.items",that.items);
          console.log("*******", that.items);
        }).catch((error) => {
          console.log(error);
        })
      },
      /*搜索*/
      search: function () {
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'devicesManage/getDeviceSnList',
          params: {
            "pageSize": that.display,
            "pageNumber":that.current,
            deviceSn: that.deviceSn,
          }
        }).then((response) => {
          that.items = response.data.data.page.records;
          that.total = response.data.data.page.total;
          console.log("***", that.items)

        }).catch((error) => {
          console.log(error);
        })
      },

    },
    created() {
      this.datalist();
    }
  }
</script>

<style scoped>
  @import '../assets/css/facility_sn.css';

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    padding: 0;
  }


  .el-table td, .el-table th.is-leaf {
    text-align: center !important;
  }

  th {
    text-align: center;
  }

  .row-class-name {
    text-align: center !important;
  }

  .block .el-pager li .active {
    background: #F8BD0A !important;
    border: none !important;
    border-radius: 0 !important;
  }

</style>
