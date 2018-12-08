<!--<el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。
        <el-header>：顶栏容器。
        <el-aside>：侧边栏容器。
        <el-main>：主要区域容器。
        <el-footer>：底栏容器。
-->

<template>
  <div class="container" style="height:100%;">
    <el-container style="height: 100%;">
      <el-aside width="160px" style="background: #27313a;" v-show="isshow">
        <el-menu style="border-right: solid 1px #27313a;">
          <el-submenu index="0" style="height: 75px; border-bottom: 1px solid #4a535a;background: #27313a;text-align: center;">
            <template slot="title">
              <img @click="logopage" src="../assets/imgs/logo.png" style="height: 50px; width:70px;margin-top: 10px;"/>
            </template>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-rankk"></i>级别管理</template>
          </el-submenu>

          <router-link tag='li' to="/juese">
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-role"></i>角色管理</template>
            </el-submenu>
          </router-link>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-account"></i>账号管理</template>
          </el-submenu>

          <router-link tag='li' to="/store">
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-store"></i>门店管理</template>
            </el-submenu>
          </router-link>

          <router-link tag='li' to="/store_add">
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-user"></i>门店添加</template>
            </el-submenu>
          </router-link>

          <router-link tag='li' to="/facility">
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-facility"></i>设备管理</template>
            </el-submenu>
          </router-link>

          <router-link tag='li' to="/facility_sn">
            <el-submenu index="7">
              <template slot="title"><i class="el-icon-facility"></i>设备_sn搜索</template>
            </el-submenu>
          </router-link>


          <router-link tag='li' to="/facility_details">
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-user"></i>设备详情</template>
            </el-submenu>
          </router-link>

          <router-link tag='li' to="/facility_add_ipc">
            <el-submenu index="9">
              <template slot="title"><i class="el-icon-user"></i>设备添加ipc</template>
            </el-submenu>

          </router-link><router-link tag='li' to="/device_image_setting">
            <el-submenu index="10">
              <template slot="title"><i class="el-icon-user"></i>设备镜像设置</template>
            </el-submenu>
          </router-link>

          <router-link tag='li' to="/user_statistics">
            <el-submenu index="11">
              <template slot="title"><i class="el-icon-user"></i>用户统计</template>
            </el-submenu>
          </router-link>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px;position: relative;height: 75px;">
          <!--面包屑-->
          <img src="../assets/imgs/spread.png"
               style="height: 40px; width:40px;position: absolute;left:20px;top:15px" @click="crumbs"/>
          <!--头像图片-->
          <img src="../assets/imgs/head.png"
               style="height: 55px; width:55px;margin-top:10px"/>

          <!--下拉-->
          <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="outline: none;cursor:pointer;font-size:16px;
    font-family:MicrosoftYaHei;
    color:rgba(51,51,51,1);">
            超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="person_set = true">个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="change_password = true">修改密码</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!--个人设置-->
        <el-dialog title="个人设置" :visible.sync="person_set" width="40%">

          <div style="padding:30px 60px;">
            <!--头像编辑-->
            <ul style="height: 130px;">
              <li class="head_text">当前头像：</li>
              <li class="head_adit" @click="person_adit= true">
                <!-- <a href="#" style="width: 90px;height: 90px;display: block;">
                 </a>-->
                <img :src="headPic" alt="">
              </li>
            </ul>
            <!--用户姓名 -->
            <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户姓名：" prop="nickName">
                <el-input v-model="ruleForm1.nickName" placeholder="123456@163.com"></el-input>
              </el-form-item>

              <!--联系电话-->
              <el-form-item label="联系电话：" prop="mobile">
                <el-input v-model.number="ruleForm1.mobile" placeholder="1869988966"></el-input>
              </el-form-item>

              <!--电子邮箱-->
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="ruleForm1.email" placeholder="123456@163.com"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="person_set = false">取消</el-button>
            <el-button type="primary" @click="save_person_set('ruleForm1')">保存</el-button>
          </span>
        </el-dialog>

        <!--编辑头像-->
        <el-dialog title="个人设置 > 编辑头像" :visible.sync="person_adit" width="40%">
          <div style="height: 250px;padding:15px;">
            <el-row type="flex" justify="center" :gutter="13">
              <el-col :span="6" class="boxx_" :class="{active:this.ind===0}">
                <div class="grid-content bg-purple" @click="changeBgc(0)"><img :src=headArr[0].pic></div>
              </el-col>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===1}">
                <div class="grid-content bg-purple" @click="changeBgc(1)"><img :src=headArr[1].pic></div>
              </el-col>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===2}">
                <div class="grid-content bg-purple" @click="changeBgc(2)"><img :src=headArr[2].pic></div>
              </el-col>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===3}">
                <div class="grid-content bg-purple" @click="changeBgc(3)"><img :src=headArr[3].pic></div>
              </el-col>
            </el-row>
            <el-row class="" :class="" :gutter="12" @click="changeBgc(4)" :key=headArr[4].pic>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===4}">
                <div class="grid-content bg-purple" @click="changeBgc(4)"><img :src=headArr[4].pic></div>
              </el-col>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===5}">
                <div class="grid-content bg-purple" @click="changeBgc(5)"><img :src=headArr[5].pic></div>
              </el-col>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===6}">
                <div class="grid-content bg-purple" @click="changeBgc(6)"><img :src=headArr[6].pic></div>
              </el-col>
              <el-col :span="6" class="boxx_" :class="{active:this.ind===7}">
                <div class="grid-content bg-purple" @click="changeBgc(7)"><img :src=headArr[7].pic></div>
              </el-col>
            </el-row>
          </div>


          <span slot="footer" class="dialog-footer">
            <el-button @click="person_adit = false">取消</el-button>
            <el-button type="primary" @click="save_person_img()">保存</el-button>
          </span>
        </el-dialog>


        <!--修改密码-->
        <el-dialog title="修改密码" :visible.sync="change_password" width="40%">

          <div style="padding:30px 60px;">
            <!--用户账号-->
            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户账号：" prop="account">
                <el-input v-model="ruleForm2.account"></el-input>
              </el-form-item>

              <!--原密码-->
              <el-form-item label="原密码：" prop="oldpassword">
                <el-input type="password" v-model="ruleForm2.oldPassword" placeholder="6-20位数字或英文"></el-input>
              </el-form-item>

              <!--新密码-->
              <el-form-item label="新密码：" prop="newpass">
                <el-input type="password" v-model="ruleForm2.newPassword" auto-complete="off"></el-input>
              </el-form-item>


              <!--确认新密码-->
              <el-form-item label="确认密码：" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPassword" auto-complete="off"></el-input>
              </el-form-item>

            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="change_password = false">取消</el-button>
            <el-button type="primary" @click="adit_password('ruleForm2')">保存</el-button>
          </span>
        </el-dialog>

        <router-view></router-view>
      </el-container>
    </el-container>

  </div>
</template>


<style>
  @import '../assets/css/navBar.css';

  .active {
    border: 1px dashed #F6BB0B;
    border-radius: 50%;
  }
</style>

<script>
  import md5 from 'js-md5'

  /*新密码和确认密码的验证*/
  var pwd = null;
  var validatePassword1 = (rule, value, callback) => {
    pwd = value;
    if (!value) {
      return callback(new Error('请输入新密码'));
    }
    if ((!value.match(/^[0-9A-Za-z]{6,20}$/g))) {
      callback(new Error('新密码必须是6-20位数字或英文'))
    } else {
      callback()
    }
  }
  var validatePassword2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入新密码'));
    } else if (value !== pwd) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };

  export default {
    name: 'navBar',
    data() {
      return {
        active: 'active',
        ind: '',
        headPic: require("../assets/imgs/head.png"),
        /*面包屑*/
        isshow: true,
        logoUrl: "../assets/imgs/logo.png",
        /*个人设置弹出框方法*/
        person_set: false,
        /*编辑头像弹出框*/
        person_adit: false,
        /*修改密码弹出框方法*/
        change_password: false,

        headArr: [{pic: require('./../assets/imgs/head_1.png')}, {pic: require('./../assets/imgs/head_2.png')}, {pic: require('./../assets/imgs/head_3.png')}, {pic: require('./../assets/imgs/head_4.png')}, {pic: require('./../assets/imgs/head_5.png')}, {pic: require('./../assets/imgs/head_6.png')}, {pic: require('./../assets/imgs/head_7.png')}, {pic: require('./../assets/imgs/head_8.png')}],


        ruleForm1: {
          nickName: '',    //用户姓名
          mobile: '',   //联系电话
          email: ''   //电子邮箱
        },
        ruleForm2: {
          account: sessionStorage.getItem('acount'),   //用户账号
          oldPassword: '',//原密码
          newPassword: '',      //新密码
          checkPassword: ''  //确认新密码
        },

        rules: {
          /*用户姓名*/
          nickName: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},//trigger()函数用于在每个匹配元素上触发指定类型的事件。
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}//blur()当元素失去焦点时发生 blur 事件
          ],
          /*联系电话*/
          mobile: [
            {required: true, message: '请输入手机号', trigger: 'blur',},
            {
              validator: function (rule, value, callback) {
                var MobileRegex = /^1\d{10}$/;
                if (!MobileRegex.test(value)) {
                  callback(new Error('手机号码格式不正确！'))
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],

          /*电子邮箱*/
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            /*{type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}*/
            {
              validator: function (rule, value, callback) {
                var emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!emailRegex.test(value)) {
                  callback(new Error('邮箱格式不正确！'))
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],

          /*用户账号*/
          account: [],

          /*原密码*/
          oldPassword: [
            {required: true, message: '请输入原密码', trigger: 'blur',},
            {
              validator: function (rule, value, callback) {
                var oldpasswordRegex = /^[0-9A-Za-z]{6,20}$/;
                if (!oldpasswordRegex.test(value)) {
                  callback(new Error('原密码不正确！'))
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
          /*新密码*/
          newPassword: [
            {validator: validatePassword1, trigger: 'blur'}
          ],
          /*确认新密码*/
          checkPassword: [
            {validator: validatePassword2, trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      /*面包屑方法*/

      crumbs() {
        this.isshow = !this.isshow;
      },
      /*logo页面切换方法*/
      logopage() {
        this.$router.push({path: '/'})
      },
      /*头像编辑点击*/
      changeBgc: function (index) {
        this.ind = index;

      },
      /*退出系統方法*/
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('logopage');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      /*个人设置*/
      save_person_set: function (formName) {
        var that = this;
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
          url: this.adminApi.url + 'userCenter/editUserInfo',
          params: {
            headPicUrl: this.headArr[this.ind].pic,
            nickName: that.ruleForm1.nickName,//用户姓名
            mobile: that.ruleForm1.mobile,   //联系电话
            email: that.ruleForm1.email  //电子邮箱
          }
        }).then((response) => {
          /*清除*/
          for (var form1 in that.ruleForm1) {
            that.ruleForm1[form1] = "";
          }
          that.person_set = false;
        }).catch((error) => {
          console.log(error);
        })
      },
      /*修改密码*/
      adit_password: function (formName) {
        var that = this;
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
          url: this.adminApi.url + 'userCenter/editPassword',
          params: {
            account: sessionStorage.getItem('acount'),   //用户账号
            oldPassword: md5(that.ruleForm2.oldPassword),//原密码
            newPassword: md5(that.ruleForm2.newPassword),//新密码
          } //新密码
        }).then((response) => {
          /*清除*/
          for (var form2 in that.ruleForm2) {
            that.ruleForm2[form2] = "";
          }
          that.change_password = false;
        }).catch((error) => {
          console.log(error);
        })
      },
      /*头像编辑方法*/
      save_person_img() {
        this.axios({
          method: 'post',
          headers: {token: localStorage.getItem('user_key')},
          url: this.adminApi.url + 'userCenter/saveHeadPic',
          params: {
            headPicUrl: this.headArr[this.ind].pic
          }
        }).then((response) => {
          that.change_password = false;
        }).catch((error) => {
          console.log(error);
        })
        this.headPic = this.headArr[this.ind].pic;
        this.person_adit = false;
      },
    }
  };
</script>

