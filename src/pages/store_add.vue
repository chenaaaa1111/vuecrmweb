<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="store_add_header">
          <ul>
            <li id="titleID">门店管理 &gt; 新增门店信息</li>
            <li><a href="#"></a></li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <div class=store_text>基本信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="134px" class="demo-ruleForm"
                 style="text-align: left;">
          <el-form-item label="门店名称：" prop="sName">
            <el-input v-model="ruleForm.sName" style="width:250px;"></el-input>
          </el-form-item>

          <el-form-item label="门店代码：" prop="sCode">
            <el-input v-model="ruleForm.sCode" style="width:250px;"></el-input>
          </el-form-item>
        </el-form>


        <el-row style="margin-bottom: 22px">
          <div style="width:134px;display: inline-block;float:left;height: 40px;line-height: 40px;"><span
            style="margin-right: 3px;color: #f56c6c;">*</span>门店地址：
          </div>
          <el-col style="width:180px;margin-right:5px;">
            <!--@change="privinceIdChange"-->
            <el-select v-model="privinceId" @change="selectHandlepro" filterable placeholder="请选择" style="width:180px;">
              <el-option v-for="item in options5" :key="item.privinceId" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col style="width:180px;">
            <el-select v-model="cityId" filterable placeholder="请选择" style="width:180px;">
              <el-option v-for="item in options6" :key="item.cityId" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>


        <el-row style="margin-bottom: 22px">
          <div style="width:134px;display: inline-block;float:left;height: 40px;line-height: 40px;"><span style="margin-right: 3px;color: #f56c6c;">*</span>品牌大区：</div>
          <el-col style="width:180px;margin-right:5px;">
            <el-select v-model="brandId" filterable placeholder="请选择" @change="selectHandlebrand" style="width:180px;">
              <el-option v-for="item in options7" :key="item.brandId" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col style="width:180px;">
            <el-select v-model="siteId" filterable ref="brands" placeholder="请选择" style="width:180px;">
              <el-option v-for="item in options8" :key="item.siteId" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row style="margin-bottom: 22px">
          <div style="width:134px;display: inline-block;float:left;height: 40px;line-height: 40px;"><span style="margin-right: 3px;color: #f56c6c;">*</span>小区经理账号：</div>
          <el-col style="width:180px;">
            <el-input v-model="ruleForm.littleManager" style="width:180px;"></el-input>
          </el-col>
          <el-col style="width:180px;">
            <el-autocomplete class="inline-input input_two" v-model="suffix" @focus="isOkA = false"
                             @blur="isOkA = true" :fetch-suggestions="querySearchB" placeholder="后缀"
                             style="width:100%" @select="handleSelectA">
              <i slot="suffix" @click="emitFocus2" :class="isOkA?'el-icon-arrow-down':'el-icon-arrow-up'"
                 style="line-height: 40px;"></i>
            </el-autocomplete>
          </el-col>
        </el-row>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="124px" class="demo-ruleForm"
                 style="text-align: left;">
          <el-form-item label="详细地址：" prop="fAddress" style="margin-left: 11px;">
            <el-input v-model="ruleForm.fAddress" style="width:250px;"></el-input>
          </el-form-item>
        <!-- </el-form> -->

        <el-row style="margin-bottom: 22px;margin-left: 11px;">
          <div style="width:119px;display: inline-block">开业年份：</div>
          <el-date-picker v-model="openYear" type="year" placeholder="请选择" style="width:250px !important;" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-row>

        <el-row style="margin-bottom: 22px;margin-left: 11px;">
          <div style="width:119px;display: inline-block">门店类型：</div>
          <el-select v-model="storeType" placeholder="请选择" style="width:250px !important;">
            <el-option v-for="item in options1" :key="item.storeType" :label="item.storeType"
                       :value="item.storeType"></el-option>
          </el-select>
        </el-row>

        <el-row style="margin-bottom: 22px;margin-left: 11px;">
          <div style="width:119px;display: inline-block">所属区块：</div>
          <el-select v-model="sourceBlock" placeholder="请选择" style="width:250px !important;">
            <el-option v-for="item in options2" :key="item.sourceBlock" :label="item.sourceBlock"
                       :value="item.sourceBlock"></el-option>
          </el-select>
        </el-row>

        <el-row style="margin-bottom: 22px;margin-left: 11px;">
          <div style="width:119px;display: inline-block">城市级别：</div>
          <el-select v-model="cityLevel" placeholder="请选择" style="width:250px !important;">
            <el-option v-for="item in options3" :key="item.cityLevel" :label="item.cityLevel"
                       :value="item.cityLevel"></el-option>
          </el-select>
        </el-row>

        <el-row style="margin-bottom: 22px;margin-left: 1px;">
          <div style="width:130px;display: inline-block;"><span style="margin-right: 3px;color: #f56c6c;">*</span>营业状态：</div>
          <el-select v-model="status" placeholder="请选择" style="width:250px !important;">
            <el-option v-for="item in options4" :key="item.status" :label="item.label" :value="item.status"></el-option>
          </el-select>
        </el-row>


          <el-form-item label="门店电话：" prop="storeTel" style="margin-left: 11px;">
            <el-input v-model="ruleForm.storeTel" style="width:250px;"></el-input>
          </el-form-item>

          <el-form-item label="门店店长：" prop="sManager" style="margin-left: 11px;">
            <el-input v-model="ruleForm.sManager" style="width:250px;"></el-input>
          </el-form-item>

          <el-form-item label="店长电话：" prop="mobile" style="margin-left: 11px;">
            <el-input v-model="ruleForm.mobile" style="width:250px;"></el-input>
          </el-form-item>

          <el-form-item label="大区经理工号：" prop="siteManage" style="margin-left: 11px;">
            <el-input v-model="ruleForm.siteManage" style="width:250px;"></el-input>
          </el-form-item>

          <el-form-item label="信息备注：" prop="remark" style="margin-left: 11px;">
            <el-input type="textarea" autosize v-model="ruleForm.remark" style="width:600px;">
            </el-input>
          </el-form-item>

        </el-form>
      </el-main>
      <el-footer style="height: 120px;line-height:40px;width:100%;text-align:center;background: #fff;">

        <el-button
          style="width:80px;height:40px; background:rgba(184,184,184,1);border-radius: 2px;color:#333;font-size:18px;padding:0px;">
          取消
        </el-button>
        <el-button
          style="width:80px;height:40px; background:rgba(248,189,10,1);border-radius: 2px;color:#fff;font-size:18px;padding:0px;"
          @click="submitData('ruleForm',$event)">保存
        </el-button>

      </el-footer>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "store_add",
    data() {
      return {
        isOkA: true,
        privinceIdArr: [],//省份
        restaurantsB: [],//小区经理账号后缀
        /*suffix: localStorage.getItem('last') || '',//小区经理账户后缀*/
        /*省份*/
        options5: [],
        privinceId: '',

        /*城市*/
        options6: [],
        cityId: '',


        /*品牌*/
        options7: [{
          brandId: '选项1',
          label: '雪佛兰'
        }, {
          brandId: '选项2',
          label: '别克'
        }],
        brandId: '',

        /*大区*/
        options8: [{
          siteId: '选项1',
          label: '大区一'
        }, {
          siteId: '选项2',
          label: '大区二'
        }],
        siteId: '',


        /*门店类型*/
        options1: [{
          storeType: '选项1',
          storeType: '2S+车工坊'
        }, {
          storeType: '选项2',
          storeType: 'A1'
        }, {
          storeType: '选项3',
          storeType: 'A2'
        }, {
          storeType: '选项4',
          storeType: 'B'
        }, {
          storeType: '选项5',
          storeType: 'C1'
        }],
        storeType: '',

        /*所属区块*/
        options2: [{
          sourceBlock: '选项1',
          sourceBlock: '东北'
        }, {
          sourceBlock: '选项2',
          sourceBlock: '沪苏'
        }, {
          sourceBlock: '选项3',
          sourceBlock: '华北'
        }, {
          sourceBlock: '选项4',
          sourceBlock: '华南'
        }, {
          sourceBlock: '选项5',
          sourceBlock: '华中'
        }, {
          sourceBlock: '选项6',
          sourceBlock: '西北'
        }, {
          sourceBlock: '选项7',
          sourceBlock: '西南'
        }, {
          sourceBlock: '选项8',
          sourceBlock: '浙皖'
        }],
        sourceBlock: '',

        /*城市级别*/
        options3: [{
          cityLevel: '选项1',
          cityLevel: 'Tire 1'
        }, {
          cityLevel: '选项2',
          cityLevel: 'Tire 2'
        }, {
          cityLevel: '选项3',
          cityLevel: 'Tire 3'
        }, {
          cityLevel: '选项4',
          cityLevel: 'Tire 4'
        }, {
          cityLevel: '选项5',
          cityLevel: 'Tire 5'
        }],
        cityLevel: '',

        /*营业状态*/
        options4: [{
          status: '0',
          label: '上线'
        }, {
          status: '1',
          label: '未上线'
        }],
        status: '',

        suffix: '',//小区经理账号后缀
        openYear: '',//开业年份
        ruleForm: {
          sName: '',    //门店名称
          sCode: '',     //门店代码
          littleManager: '',//小区经理账号
          fAddress: '', //详细地址
          storeTel: '',    //门店电话
          sManager: '',    //门店店长
          mobile: '',      //店长电话
          siteManage: '',     //大区经理工号
          remark: '' ,      //信息备注

        },
        rules: {
          /*门店名称*/
          sName: [
            {required: true, message: '请输入门店名称', trigger: 'blur'}
          ],
          /*门店代码*/
          sCode: [
            {required: true, message: '请输入门店代码', trigger: 'blur'}
          ],
          /* /!*门店电话*!/
           storeTel: [
             {required: true, message: '请输入门店电话', trigger: 'blur',},
             {
               validator: function (rule, value, callback) {
                 var MobileRegex = /^[\d-]{1,13}$/;
                 if (!MobileRegex.test(value)) {
                   callback(new Error('门店电话格式不正确！'))
                 } else {
                   callback();
                 }
               }, trigger: 'blur'
             }
           ],
           /!*门店店长*!/
           sManager: [
             {required: true, message: '请输入门店店长', trigger: 'blur'}
           ],
           /!*店长电话*!/
           mobile: [
             {required: true, message: '请输入店长电话', trigger: 'blur',},
             {
               validator: function (rule, value, callback) {
                 var MobileRegex = /^[\d-]{1,13}$/;
                 if (!MobileRegex.test(value)) {
                   callback(new Error('店长电话格式不正确！'))
                 } else {
                   callback();
                 }
               }, trigger: 'blur'
             }
           ],
           /!*大区经理工号*!/
           siteManage: [
             {required: true, message: '请输入大区经理工号', trigger: 'blur'}
           ],
           remark: [
             {required: true, message: '请输入信息备注', trigger: 'blur'}
           ],*/
        }
      }
    },
    methods: {

      /*后缀*/
      querySearchB(queryString, cb) {
        var restaurantsB = this.restaurantsB;
        console.log('restaurantsB:', restaurantsB);
        cb(restaurantsB);
      },

      emitFocus2() {//input 获取焦点后缀
        document.querySelector('.input_two input').focus();
      },

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      /*获取小区经理账号后缀列表*/
      loadB() {
        var that = this;
        this.axios({
          method: 'post',
          url: this.adminApi.url + 'userLogin/getPostfix',
        }).then((response) => {
          var fixlist = response.data.data.postfixList;
          var array = [];

          for (var ite in fixlist) {
            var obj = {};
            obj.value = fixlist[ite];
            array.push(obj);
          }
          that.restaurantsB = array;
          return array;
        }).catch((error) => {

          console.log(error);
        })

      },
      /*点击选中建议项时触发*/
      handleSelectA(item) {
        this.isOkA = !this.isOkA;

      },
      /*门店地址*/
      selectHandlepro(val){
        var that=this;
        this.privinceId=val;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'storesManage/getOrgRegList',
          params: {
            privinceId:that.privinceId
          }
        }).then((response) => {
          that.options6=response.data.data.cityList;
          that.cityId="";
        }).catch((error) => {
          console.log(error);
        })

      },
      /*品牌大区*/
        selectHandlebrand(val){
        var that=this;
        this.brandId=val;
          this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'storesManage/getOrgRegList',
          params: {
            brandId:that.brandId
          }
        }).then((response) => {
          that.options8=response.data.data.siteList;
          that.siteId="";
          that.refs['brands'].value=" ";
        }).catch((error) => {
          console.log(error);
        })

      },
      /*获取省份和品牌*/
      loadA() {
        var that = this;
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'storesManage/getOrgRegList',
        }).then((response) => {
          that.options5=response.data.data.proList;
          that.options7=response.data.data.brandList;
        }).catch((error) => {
          console.log(error);
        })
      },
      /*保存方法*/
      submitData: function (formName,event) {
        if(event){
            event.preventDefault();
        }
        var that = this;
        console.log('formName',formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'storesManage/editStoreInfo',
          params: {
            sName: that.ruleForm.sName,//门店名称
            sCode: that.ruleForm.sCode,//门店名称
            privinceId:that.privinceId,//获取省份
            cityId:that.cityId,//省份
            brandId:that.brandId,//获取品牌地址
            siteId:that.siteId, //大区
            littleManager: that.ruleForm.littleManager + that.suffix,//小区经理账号
            fAddress: that.ruleForm.fAddress,//详细地址
            // openYear: new Date(that.openYear),//开业年份
            openYear:that.openYear,//开业年份
            storeType: that.storeType,//门店类型
            sourceBlock: that.sourceBlock,//所属区块
            cityLevel: that.cityLevel,//城市级别
            status: that.status,//营业状态
            storeTel: that.ruleForm.storeTel,    //门店电话
            sManager: that.ruleForm.sManager,    //门店店长
            mobile: that.ruleForm.mobile,      //店长电话
            siteManage: that.ruleForm.siteManage,    //大区经理工号
            remark: that.ruleForm.remark,     //信息备注
          }
        }).then((response) => {

          console.log(response)
        }).catch((error) => {
          console.log(error);
        })
      },
     /* selectGet(value){//这个vId也就是value值
        console.log(value);
        let obj = {};
        obj = this.options1.find((item)=>{//这里的options1就是上面遍历的数据源
          return item.storeType === value;//筛选出匹配数据
        });
        console.log(obj.label);//label就是对应label的
      }*/

    },
    created: function () {
      /*省份和品牌*/
      this.privinceIdArr = this.loadA();
      /*获取小区经理账号后缀*/
      this.restaurantsB = this.loadB();
    }
  }
</script>

<style scoped>
  @import '../assets/css/store_add.css';

</style>
