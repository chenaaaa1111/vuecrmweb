// 手机号验证
export function isvalidPhone(str) {
  const reg =  /^1\d{10}$///正则表达式
  return reg.test(str)
}
var ydtel_reg = /^1(3[4-9]|4[7]|5[0-27-9]|7[08]|8[2-478])\d{8}$/; //移动号码
var lttel_reg = /^1(3[0-2]|4[5]|5[56]|709|7[1]|7[6]|8[56])\d{8}$/;    //联通号码
var dxtel_reg = /^1(3[34]|53|77|700|8[019])\d{8}$/;       //电信号码
