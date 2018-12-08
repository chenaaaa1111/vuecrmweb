<template>
  <div id="app">
    <el-container class="pd_30">
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
          <li style="font-family:MicrosoftYaHei;margin-right: 10px;">
            <el-button @click="search" style="width: 100px;background: #F8BD0A;color:#FFFEFE;">查询</el-button>
          </li>
          <li style="font-family:MicrosoftYaHei;margin-right: 10px;">
            <el-button @click="store_add" style="width: 100px;background: #719CA1;color: #fff;">添加门店</el-button>
          </li>
          <li style="font-family:MicrosoftYaHei;color:#333;margin-right: 10px;">
            <el-button style="width: 120px;background: #E6D9B0;">批量导入修改</el-button>
          </li>
          <li style="font-family:MicrosoftYaHei;color:#333;margin-right: 10px;">
            <el-button style="width: 100px;background: #E6D9B0;">批量导出</el-button>
          </li>
          <!--<li style="margin-right: 30px;">
            <a href="storeExeclUrl"
               style="width: 100px;background: #E6D9B0;display: inline-block;height: 30px;line-height: 30px;text-align: center;margin-top: 15px;font-family:MicrosoftYaHei;color:#333;font-size: 16px;"
               @click="template_download">模板下载</a>
          </li>-->
          <li style="font-family:MicrosoftYaHei;color:#333;margin-right: 10px;">
            <el-button style="width: 100px;background: #E6D9B0;" @click="template_download">模板下载</el-button>
          </li>
          <li>
            <span style="font-size:16px;font-family:MicrosoftYaHei;color:#333;">补充信息管理:</span>
            <el-button
              style="width: 120px;font-family:MicrosoftYaHei;color:#333;background: #E6D9B0;margin-right: 10px;">补充信息更新
            </el-button>
          </li>
          <li>
            <el-button style="width: 120px;font-family:MicrosoftYaHei;color:#333;background: #E6D9B0;">补充信息导出
            </el-button>
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="180px">Aside</el-aside>
        <el-container>
          <el-main>
            <table class="table table-bordered table-striped table-hover text-center"
                   style="width:100%;height: 60px;line-height: 60px;" v-bind:title="datalist">
              <thead>
              <tr>
                <th style="width: 20%;">门店名称</th>
                <th style="width: 14%;">门店代码</th>
                <th style="width: 10%;">品牌</th>
                <th style="width: 10%;">大区</th>
                <th style="width: 15%;">门店电话</th>
                <th style="width: 13%;">门店状态</th>
                <th style="width: 11%;">账号禁用</th>
                <th style="width: 7%;">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in items">
                <td>{{item.storeName}}</td>
                <td>{{item.storeCode}}</td>
                <td>{{item.brandName}}</td>
                <td>{{item.siteName}}</td>
                <td>{{item.storePhone}}</td>
                <td>{{item.storeStatus?'未上线':'上线'}}</td>
                <td>
                  <el-switch type="boolean" v-model="value2" active-color="#13C4DB" inactive-color="#A9A9A9" @change="handleSwitch(id)">

                  </el-switch>
                </td>
                <td>
                  <img src="../assets/imgs/store_edit.png" alt="">
                </td>
              </tr>

              </tbody>
            </table>
          </el-main>
        </el-container>
      </el-container>
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
    name: "store",
    data() {
      return {
        total: 12,     // 记录总条数
        display: 12,   // 每页显示条数
        current: 1,   // 当前的页数

        storeName: '',//门店名称
        storeCode: '',//门店代码

        value1: true,            //是否禁用  0是 1不是*/
        value2: true,

        item: {
          'storeName': '',//门店简称
          'storeCode': '',//门店代码
          'brandName': '',//品牌id
          'siteName': '',//大区id
          'storePhone': '',//门店电话
          'storeStatus': '',//门店状态 0上线 1没上线
          /*'isEnable': '',//是否禁用  0是 1不是*/
        },
        items: [
          {
            'storeName': '',//门店简称
            'storeCode': '',//门店代码
            'brandName': '',//品牌id
            'siteName': '',//大区id
            'storePhone': '',//门店电话
            'storeStatus': '',//门店状态
            /*'isEnable': '',//是否禁用*/
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
          url: this.adminApi.url + 'storesManage/getStoreList',
          params: {
            "pageSize": that.display,// 每页显示条数
            pageNumber: currentPage   //当前页码
          }
        }).then((response) => {
          that.items = response.data.data.storeList.records;
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
          url: this.adminApi.url + 'storesManage/getStoreList',
          params: {
            "pageSize": pageSize,//每页数量
            pageNumber: that.current//页码
          }
        }).then((response) => {
          that.items = response.data.data.storeList.records;
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
          url: this.adminApi.url + 'storesManage/getStoreList',
          params: {"pageSize": that.display}
        }).then((response) => {
          console.log("*******", response);
          that.items = response.data.data.storeList.records;
          that.total = response.data.data.storeList.total;
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
          url: this.adminApi.url + 'storesManage/getStoreList',
          params: {
            "pageSize": that.display,
            storeName: that.storeName,
            storeCode: that.storeCode,

          }
        }).then((response) => {
          that.items = response.data.data.storeList.records;
          that.total = response.data.data.storeList.total;
          console.log("***", that.items)

        }).catch((error) => {
          console.log(error);
        })
      },
      /*禁用门店*/
      handleSwitch:function(id){
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'storesManage/enableStore',
          params: {
            isEnable: this.value ? 1 : 0,           //0禁用 1不禁用
            storeId:that.storeId,
            /*this.value ? 1 : 0*/
          }
        }).then((response) => {

          console.log("***", that.items)

        }).catch((error) => {
          console.log(error);
        })
      },
      /*模板下载*/
      template_download: function () {
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'storesManage/downloadStencil',
          /* params: {
             storeExeclUrl
           }*/
        }).then((response) => {
          window.location = response.data.data.storeExeclUrl
          console.log(response)
        }).catch((error) => {
          console.log(error);
        })
      },
      /*添加门店*/
      store_add() {
        this.$router.push({path: '/store/store_add'})
      },

      /*handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }*/
    },
    created() {
      this.datalist();
    }
  }
</script>

<style scoped>
  @import '../assets/css/store.css';

  /*.el-header, .el-footer {
    text-align: center;
    line-height: 60px;
  }*/

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    padding: 0;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
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
