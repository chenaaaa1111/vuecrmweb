<template>
  <!--






  -->
</template>

<script>
  export default {
    name: "demo_text",
    data() {
      return {
        accountBefore: '123',
        accountEnd: 'qq.com',
        password: '123456',
        rememberPas: false,
        accountArr: []//账号信息存储数组
      }
    },
    var accountInfo = {//账号信息对象
      accountBefore: '',//账号前缀
      accountEnd: '',//账号后缀
      password: '',//登录密码
      rememberPas: false,//是否记住密码，记住true,未记住false
      isCurrentAccount: true//是否是前一次的登录账号
    },
    //如果ajax请求成功
    if(accountArr.length > 0){//如果账号信息存储数组有元素，则遍历并将它项中accountArr为true的改为false
    accountArr.forEach((item, index) => {
      if (item.isCurrentAccount === true) {
        item.isCurrentAccount = false;
        return;
      }
    });
    if (rememberPas !== true) {
      accountInfo = {//账号信息对象
        accountBefore: '123',//账号前缀
        accountEnd: 'qq.com',//账号后缀
        password: '',//由于没有记住登录密码，所以登录密码为空
        rememberPas: false,//是否记住密码，记住true,未记住false
        isCurrentAccount: true//是否是前一次的登录账号
      };
    }
    accountArr.push(accountInfo);//将当前登录账号信息存储到数组中
  }else{
    if (rememberPas !== true) {
      accountInfo = {//账号信息对象
        accountBefore: '123',//账号前缀
        accountEnd: 'qq.com',//账号后缀
        password: '',//由于没有记住登录密码，所以登录密码为空
        rememberPas: false,//是否记住密码，记住true,未记住false
        isCurrentAccount: true//是否是前一次的登录账号
      };
    }
    accountArr.push(accountInfo);//将当前登录账号信息存储到数组中
  }

  /* var accountInfo = {//账号信息对象
          state1: this.state1,//账号前缀
          state2: this.state2,//账号后缀
          password: '',//登录密码
          isRemember: 0,//是否记住密码，记住true,未记住false
          isCurrentAccount: true//是否是前一次的登录账号
        }
        //如果ajax请求成功
        if (self.accountArr.length > 0) {//如果账号信息存储数组有元素，则遍历并将它项中accountArr为true的改为false
          self.accountArr.forEach((item, index) => {
            if (item.isCurrentAccount === true) {
              item.isCurrentAccount = false;
              return;
            }
          });
          if (self.isRemember !== 0) {
            accountInfo = {//账号信息对象
              state1: self.state1,//账号前缀
              state2: self.state2,//账号后缀
              password: '',//由于没有记住登录密码，所以登录密码为空
              isRemember: 1,//是否记住密码，记住0,未记住1
              isCurrentAccount: true//是否是前一次的登录账号
            };
          }

        } else {
          if (self.isRemember !== 0) {
            accountInfo = {//账号信息对象
              state1: self.state1,//账号前缀
              state2: self.state2,//账号后缀
              password: '',//由于没有记住登录密码，所以登录密码为空
              isRemember: 1,//是否记住密码，记住0,未记住1
              isCurrentAccount: true//是否是前一次的登录账号
            };
          }
          self.accountArr.push(accountInfo);//将当前登录账号信息存储到数组中
        }*/
</script>
<!--

登录成功之后，本地只存储 token，获取到 一个 token，存起来，然后刷新页面，每次页面加载的时候判断有没有 token，
如果没有token就渲染 login 页面，如果有 token，就到服务端通过token获取 user， 如果服务端 401或者其他 错误，
就清空本地的 token，然后跳转 login 页面，如果服务端200，就渲染 index 页面，如果用户已经登录了，
那么它再访问 login 页面，就要强制跳转回 index 页面，而不是清空 token，前端不应该存储 user，只存储 token，user 要在每次刷新页面的时候获取



1、用户正常登录，前端存储 token（假设 token 过期时间5h）
2、用户未关闭浏览器，
3、用户打开新的页面，如果这个时候不通过前端存储的 token 去获取 user，来校验 token 是否失效，那么这个用户就会看到页面上的数据
4、如果这个用户已经被取消了权限，那么他仍然可以看到页面数据，如果这个这个用户没有被取消权限那么当他提交表单的时候，就会报错
5、如果这个表单要输入很多的内容，此时因为后端报错，而我强行让用户跳转到登录页，那么用户填写的表单内容就会丢失
6、所以每次在用户打开一个新页面，或者刷新页面的时候，都要用这个 token 到后端获取当前 user的一个接口，判断 token 是否已经失效了



-->
<style scoped>

</style>
