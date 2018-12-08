<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="device_image_setting_header">
          <ul>
            <li id="titleID">设备管理 > 门店详情 > 设备镜像设置</li>
            <li><a href="#"></a></li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <div class="device_image_setting">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="124px" class="demo-ruleForm"
                   style="text-align: left;">

            <el-form-item label="设备名称：" prop="siteManage" style="margin-left: 11px;">
              <el-input v-model="ruleForm.siteManage" style="width:250px;"></el-input>
            </el-form-item>

            <el-form-item label="关联门店：" prop="remark" style="margin-left: 11px;">
              <el-input v-model="ruleForm.remark" placeholder="输入门店简称或门店代码" style="width:290px;">
              </el-input>
              <el-button style="width: 90px;background: #F8BD0A;color:#FFFEFE;height: 33px;line-height: 8px;font-size:14px;">搜索
              </el-button>
            </el-form-item>

          </el-form>
          <div style="height: 90px;width: 100%;text-align: center;background: rgb(255, 255, 255);margin-top: 80px;">

            <el-button
              style="width:80px;height:40px; background:rgba(184,184,184,1);border-radius: 2px;color:#333;font-size:18px;padding:0px;">
              取消
            </el-button>
            <el-button
              style="width:80px;height:40px; background:rgba(248,189,10,1);border-radius: 2px;color:#fff;font-size:18px;padding:0px;"
              @click="submit.native.prevent('ruleForm')">保存
            </el-button>

          </div>
        </div>

      </el-main>

    </el-container>

  </div>
</template>

<script>
  export default {
    name: "device_image_setting",
    data() {
      return {

        ruleForm: {
          siteManage: '',     //设备名称
          remark: ''       //关联门店
        },
        rules: {}
      }
    },
    methods: {}

  }
</script>


<style scoped>
  @import '../assets/css/device_image_setting.css';
</style>
