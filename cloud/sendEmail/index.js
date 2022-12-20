// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 引入发送邮件的类库
const nodeemailer = require('nodemailer')
// 创建smtp客户端配置
const config = {
  host:'smtp.qq.com', // 网易邮箱smtp.163.com
  port:465, // 网易的端口25
  auth:{
    user:'1596670667@qq.com',// 邮箱账号
    pass:'bpecbpailtsbjcih' // 自己的邮箱授权码
  }
}
// 创建smtp客户端兑现
const transporter = nodeemailer.createTransport(config)

// 云函数入口函数
exports.main = async (event, context) => {
  // 创建一个邮件对象 
  const email = {
    // 发件人
    from: 'BUPT infoPortal <1596670667@qq.com>',
    // 主题
    subject:'BUPT infoPortal 小程序注册验证邮件',
    // 收件人
    // to: 'tianyi-lin@bupt.edu.cn',
    to: event.emailAddr,
    // 邮件内容
    text:'尊敬的用户，您好。\n您的教育邮箱验证已通过，请回到小程序完成您账号的激活操作。在激活时，需要您提供以下信息：\n（1）您的姓名\n（2）您的学号\n（3）您希望设置的密码\n（4）激活码：学号后6位\n\n温馨提示：在设置密码时，建议不要使用您的常用密码，以免带来不必要的风险。\n\n*注意*：您的姓名和学号需要对应，否则无法激活。<姓名-学号>的绑定关系从校内公开信息渠道获得（如保研排名表等），以保护您的隐私。\n若仍然无法激活账户，请回信，管理员核实您的信息后将为您开通账号。祝好 :-)'
  };
  let res = await transporter.sendMail(email)
  return res
}