<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="facility_add_ipc_header">
          <ul>
            <li id="titleID">添加设备管理 > 门店详情 > 添加IPC</li>
            <li><a href="#"></a></li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <div class="facility_details">
          <el-row style="margin-bottom: 22px;margin-left: 11px;">
            <div style="width:119px;display: inline-block">Lable：</div>
            <el-select v-model="storeType" placeholder="请选择" style="width:250px !important;">
              <el-option v-for="item in options1" :key="item.storeType" :label="item.label"
                         :value="item.storeType"></el-option>
            </el-select>
          </el-row>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="124px" class="demo-ruleForm"
                   style="text-align: left;">
            <el-form-item label="SN：" prop="storeTel" style="margin-left: 11px;">
              <el-input v-model="ruleForm.storeTel" style="width:250px;"></el-input>
            </el-form-item>

            <el-form-item label="通道号：" prop="sManager" style="margin-left: 11px;">
              <el-input v-model="ruleForm.sManager" style="width:250px;"></el-input>
            </el-form-item>
          </el-form>

          <el-row style="margin-bottom: 22px;margin-left: 11px;">
            <div style="width:119px;display: inline-block">默认码流：</div>
            <el-select v-model="sourceBlock" placeholder="请选择" style="width:250px !important;">
              <el-option v-for="item in options2" :key="item.sourceBlock" :label="item.label"
                         :value="item.sourceBlock"></el-option>
            </el-select>
          </el-row>

          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="124px" class="demo-ruleForm"
                   style="text-align: left;">
            <el-form-item label="NVRSN：" prop="mobile" style="margin-left: 11px;">
              <el-input v-model="ruleForm.mobile" style="width:250px;"></el-input>
            </el-form-item>

            <el-form-item label="NVR通道：" prop="siteManage" style="margin-left: 11px;">
              <el-input v-model="ruleForm.siteManage" style="width:250px;"></el-input>
            </el-form-item>

            <el-form-item label="车道号：" prop="remark" style="margin-left: 11px;">
              <el-input v-model="ruleForm.remark" style="width:250px;">
              </el-input>
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
    name: "facility_add_ipc",
    data() {
      return {
        /*Lable*/
        options1: [{
          storeType: '选项1',
          label: 'Ub0000000565233826Vb'
        }],
        storeType: '',

        /*默认码流*/
        options2: [{
          sourceBlock: '选项1',
          label: '高清700'
        }, {
          sourceBlock: '选项2',
          label: '普通700'
        }],
        sourceBlock: '',
        ruleForm: {
          storeTel: '',    //SN
          sManager: '',    //通道号
          mobile: '',      //NVRSN
          siteManage: '',     //NVR通道
          remark: ''       //车道号
        },
        rules:{}
      }
    },
    methods: {}

  }
</script>


<style scoped>
  @import '../assets/css/facility_add_ipc.css';
</style>
