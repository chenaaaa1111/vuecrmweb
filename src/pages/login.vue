<template>
  <div id="app">
    <div class="text_title">智慧猫后台管理系统</div>
    <div class=login_box>
      <div class=textt>
        <span>---欢迎登陆智慧猫后台管理系统---</span>
      </div>
      <div class="cont_top">
        <div class="img_account" style="width: 9%;float:left;line-height: 50px;">
          <img src="../assets/imgs/login_account.png" alt="">
        </div>

        <el-row class="demo-autocomplete" style="width: 91%;float:left;">
          <el-col :span="12" style="float:left;">
            <el-autocomplete class="inline-input input_one" v-model="state1" @focus="isOk = false"
                             @blur="isOk = true" :fetch-suggestions="querySearch" placeholder="账号"
                             style="width:100%" @select="handleSelect">
              <i slot="suffix" @click="emitFocus1" :class="isOk?'el-icon-arrow-down':'el-icon-arrow-up'"
                 style="line-height: 40px;"></i>
            </el-autocomplete>
          </el-col>

          <el-col :span="12" style="float:left;">
            <el-autocomplete class="inline-input input_two" v-model="state2" @focus="isOkA = false"
                             @blur="isOkA = true" :fetch-suggestions="querySearchB" placeholder="后缀"
                             style="width:100%" @select="handleSelectA">
              <i slot="suffix" @click="emitFocus2" :class="isOkA?'el-icon-arrow-down':'el-icon-arrow-up'"
                 style="line-height: 40px;"></i>
            </el-autocomplete>
          </el-col>
        </el-row>
      </div>

      <div class="cont_bottom">
        <div class="img_pass" style="width: 9%;float:left;line-height: 53px;">
          <img src="../assets/imgs/login_pass.png" alt="">
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="width:91%;float:left;">
          <el-form-item prop="password" style="margin-bottom: 20px;">
            <el-input type="password" v-model="ruleForm.password" placeholder="登录密码">
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="cont_foot">
        <el-checkbox type="boolean" v-model="isRemember" style="color:#333;float:left;font-family:MicrosoftYaHeiLight;"><span
          style="font-size:16px !important;">记住密码</span>
        </el-checkbox>
        <span @click="forgetpass = true"
              style="cursor: pointer;font-size:16px;font-family:MicrosoftYaHeiLight;color:#719CA1;float: right">忘记密码？
        </span>
      </div>
      <el-button type="primary" @click="submitForm('ruleForm')"
                 style="width: 80%;margin:0 auto;background: #719CA1;margin-top: 60px;font-size:24px;font-family:MicrosoftYaHeiLight;color:#fff;">
        登陆
      </el-button>
    </div>


    <!--忘记密码弹出框-->
    <el-dialog title="找回密码" :visible.sync="forgetpass" width="40%;">

      <span slot="footer" class="dialog-footer">
            <el-button @click="forgetpass = false">取消</el-button>
            <el-button type="primary" @click="forgetpass = false">保存</el-button>
          </span>
    </el-dialog>
  </div>


</template>


<script type=es6>
  import md5 from 'js-md5'

  export default {
    name: "login",
    data() {
      return {
        isOk: true,
        isOkA: true,
        forgetpass: false,
        restaurantsA: [],
        restaurantsB: [],
        state1:localStorage.getItem('acoutArray')?JSON.parse(localStorage.getItem('acoutArray'))[0].value:'',//当前登录账户前缀
        state2: localStorage.getItem('last')||'',//当前登录账户后缀
        isRemember: 0,//0表示记住密码，1表示未记住密码
        accountArr: [],//账号信息存储数组
        ruleForm: {
          password: '',//密码
        },
        rules: {
          /*密码*/
          password: [
            {required: true, message: '请输入密码', trigger: 'blur',},
            {
              validator: function (rule, value, callback) {
                var oldpasswordRegex = /^[0-9A-Za-z]{6,20}$/;
                if (!oldpasswordRegex.test(value)) {
                  callback(new Error('密码不正确！'))
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      /*uerySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。*/
      querySearch(queryString, cb) {

        var restaurantsA = this.restaurantsA;
        cb(restaurantsA);
      },
      querySearchB(queryString, cb) {
        var restaurantsB = this.restaurantsB;
        console.log('restaurantsB:', restaurantsB);
        cb(restaurantsB);
      },
      emitFocus1() {//input 获取焦点前缀
        document.querySelector('.input_one input').focus();
      },
      emitFocus2() {//input 获取焦点后缀
        document.querySelector('.input_two input').focus();
      },

      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadA() {
        return JSON.parse(localStorage.getItem('acoutArray')?localStorage.getItem('acoutArray'):"[]");
      },
      /*获取后缀列表*/
      loadB() {
        var that = this;
        this.axios({
          method: 'post',
          url: this.adminApi.url + 'userLogin/getPostfix',
        }).then((response) => {
          console.log(response.data.data.postfixList);
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
          /*console.log('请求失败:' + error.status + ',' + error.statusText);*/
          console.log(error);
        })

      },
      /*点击选中建议项时触发*/
      handleSelect(item) {
        this.isOk = !this.isOk;

      },
      handleSelectA(item) {
        this.isOkA = !this.isOkA;
      },

      /*提交登录按钮*/
      submitForm: function () {
        var that = this;
        this.axios({
          headers:{"token":""},
          method: 'post',
          url: this.adminApi.url + 'userLogin/login',
          params: {
            username: that.state1 + that.state2,//账号
            password: md5(that.ruleForm.password),//密码
            isRemember: that.isRemember ? 0 : 1//是否记住密码
          }
        }).then(function (response) {
          console.log(response.data);
          /*存储token*/
         /* var user_key = '';
          var token = token;*/
          if(response.data.data.token){
            localStorage.setItem('user_key',response.data.data.token.key+"_"+response.data.data.token.token);
            that.token=response.data.data.token.token;
          }
          var acount={};
          if(response.data.code==200){
              var acoutArray=JSON.parse(localStorage.getItem('acoutArray')?localStorage.getItem('acoutArray'):"[]");
              var currentCunt=that.state1;
              acoutArray.forEach(function(val,key){
                  if(currentCunt==val.value){
                      acoutArray.splice(key,1);
                      return;
                  }
              });
                acount.value=that.state1;
                acoutArray.unshift(acount);
                localStorage.setItem('acoutArray',JSON.stringify(acoutArray));
                localStorage.setItem('last',that.state2);
                 sessionStorage.setItem('acount',that.state1+that.state2);
                that.$router.push('/');
          }

        }).catch(function (error) {
          console.log(error);
        })
      },

    },
    created: function () {
      this.restaurantsA = this.loadA();
      this.restaurantsB = this.loadB();
    }
  }
</script>

<style scoped>
  @import '../assets/css/login.css';

  /*登录按钮*/
  .el-button--primary {
    border: none;
  }

</style>

