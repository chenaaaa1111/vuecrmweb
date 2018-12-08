<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="facility_details_header">
          <ul>
            <li id="titleID">设备管理 > 门店详情</li>
            <li><a href="#"></a></li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <div class="facility_details_basic">
          <div class="ttext">
            <ul>
              <!-- <li style="width: 4px;height: 14px;background: #F24E4D;display: inline-block;"></li>-->
              <li style="font-size: 16px;">基本信息</li>
            </ul>
          </div>
          <div class="ttext">
            <ul>
              <li>门店名称：深圳标域（宝安）</li>
              <li>门店代码：1200260</li>
              <li>门店地址：广东/深圳</li>
              <li>品牌大区：别克/三区</li>
            </ul>
          </div>
          <div class="ttext">
            <ul>
              <li>小区经理工号：1297334</li>
              <li>详细地址：</li>
              <li>开业年份：</li>
              <li>门店类型：</li>
            </ul>
          </div>
          <div class="ttext">
            <ul>
              <li>所属区块：苏北</li>
              <li>城市级别：Tire 1</li>
              <li>营业状态：上线</li>
              <li>门店电话：</li>
            </ul>
          </div>
          <div class="ttext">
            <ul>
              <li>门店店长：</li>
              <li>店长电话：</li>
              <li>备注：</li>
            </ul>
          </div>
        </div>
        <div class="facility_list">设备列表</div>
        <table class="table table-bordered table-striped table-hover text-center"
               style="width:100%;height: 60px;line-height: 60px;" v-bind:title="datalist">
          <thead>
          <tr>
            <th style="width: 11%;">设备SN号</th>
            <th style="width: 8%;">设备类型</th>
            <th style="width: 8%">通道号</th>
            <th style="width: 8%;">设备名称</th>
            <th style="width: 8%;">默认码流</th>
            <th style="width: 8%;">是否禁用</th>
            <th style="width: 10%;">安装时间</th>
            <th style="width: 12%;">是否为车牌识别设备</th>
            <th style="width: 12%;">是否为仅经销商可见</th>
            <th style="width: 15%;">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in items">
            <td>{{item.videoSn}}</td>
            <td>{{item.videoType}}</td>
            <td>{{item.channelNo}}</td>
            <td>{{item.deviceName}}</td>
            <td>{{item.defaultStream}}</td>
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

  </div>
</template>

<script>
  export default {
    name: "facility_details",
    data() {
      return {
        value1: true,
        value2: true,
        value3: true,
        item: {
          'videoSn': '',//设备SN号
          'videoType': '',//设备类型
          'channelNo': '',//通道号
          'deviceName': '',//设备名称
          'defaultStream': '',//默认码流
          'installTime': '',//安装时间
        },
        items: [
          {
            'videoSn': '',//设备SN号
            'videoType': '',//设备类型
            'channelNo': '',//通道号
            'deviceName': '',//设备名称
            'defaultStream': '',//默认码流
            'installTime': '',//安装时间
          },
        ]
      }
    },
    methods: {
      /*页面数据列表*/
      datalist: function () {
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'devicesManage/getDevicesList',
          params: {
            storeId: that.storeId//门店id
          }
        }).then((response) => {
          console.log("*******", response);
          that.items = response.data.data.storeList.records;
          that.total = response.data.data.storeList.total;
          console.log("*******", that.items);
        }).catch((error) => {
          console.log(error);
        })
      },
    }

  }
</script>


<style scoped>
  @import '../assets/css/facility_details.css';
</style>
