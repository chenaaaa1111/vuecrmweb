<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-main>
        <el-row :gutter="20" class="el-row-t" style="margin-top: -150px;">
          <el-col :span="7" :offset="5">
            <div class="grid-content bg-purple">门店数:379</div>
          </el-col>
          <el-col :span="7" class="el-col-r">
            <div class="grid-content bg-purple">探针设备:2163</div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="el-row-t">
          <el-col :span="7" :offset="5">
            <div class="grid-content bg-purple">用户数:505</div>
          </el-col>
          <el-col :span="7" class="el-col-r">
            <div class="grid-content bg-purple">视频设备:2163</div>
          </el-col>
        </el-row>
      </el-main>
      </el-container>
  </div>
</template>
<script>

  // 导入要用到的子组件


  export default {
    name: 'logopage',
    data () {
      return {

      }
    }
  }
</script>
<style scoped>
  /*右边可视范围区域整个内容的div*/
  .el-main{
    background: #e9ecf3;
    padding: 30px 30px 30px;
    height: 100%;
  }

  /*右边可视范围区域横向一个div的组件名*/
  .el-row {
    margin-bottom: 50px;
    position: relative;
     top: 50%;
     transform: translateY(-50%);

  }

  /*右边可视范围区域横向一个div的类名*/
 /* .el-row-t {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    !*margin-top: 40px;*!
  }*/

  /*右边可视范围区域每一个模块的组件名*/
  .el-col {
    border-radius: 6px;
    height: 150px;
    background: #fff;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /*右边可视范围区域每一个模块的类名*/
  .el-col-r {
    margin: 0 40px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /*右边可视范围区域每一个模块里面字体的div类名1*/
  .bg-purple {

  }

  /*右边可视范围区域每一个模块里面字体的div类名2*/
  .grid-content {
    border-radius: 6px;
    min-height: 100%;
    background: #fff;
    line-height: 150px;
    text-align: center;
    font-size:30px;
    font-family:MicrosoftYaHeiLight;
    color:rgba(51,51,51,1);
  }
</style>
