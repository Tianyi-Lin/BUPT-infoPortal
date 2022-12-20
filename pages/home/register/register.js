// pages/home/register/register.js

var app = getApp();
var domain = app.globalData.domain;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户邮箱地址
    email_addr: '',
    // 邮箱验证是否通过的标志，true通过后进入注册页面
    validEmail_tag: false,
    username:'',
    usercode:'',
    studentnumber:'',
    verification_code:'',
    usercode_repeat:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 从输入框写入email地址到变量
  set_email_addr:function(e){
    let that = this;
    this.setData({
      email_addr: e.detail.value,
    }) 
  },

  set_username:function(e){
    let that = this;
    this.setData({
      username: e.detail.value,
    }) 
  },

  set_studentnumber:function(e){
    let that = this;
    this.setData({
      studentnumber: e.detail.value,
    }) 
  },

  set_usercode:function(e){
    let that = this;
    this.setData({
      usercode: e.detail.value,
    }) 
  },

  set_usercode_repeat:function(e){
    let that = this;
    this.setData({
      usercode_repeat: e.detail.value,
    }) 
  },

  set_verification_code:function(e){
    let that = this;
    this.setData({
      verification_code: e.detail.value,
    }) 
  },

  change_validEmail_tag:function(e){
    let that = this;
    this.setData({
      validEmail_tag: true,
    }) 
    console.log('validEmail_tag更改为true')
  },

  send_email:function(e){
    var that = this;
    console.log(this.data)
    wx.cloud.callFunction({
      name: 'sendEmail', // 这里填写调用的云函数名称
      // 传递给云函数的参数
      data: {
        emailAddr: this.data.email_addr,
      },
      success: (res) => {// 调用成功后的操作
        wx.showModal({
          title: '验证邮件已发送',
          content: '请注意查收。依据邮件内容进行下一步操作~ 点击"下一步"完成后续注册流程；若因邮件地址错误未收到邮件，别担心，点击"取消"后可以重新输入',
          confirmText: '下一步',
          success: (res) => {
            if (res.confirm) {
              // 邮件发送完毕，有效邮箱标记，进入下一步注册环节
              this.change_validEmail_tag();
            }
            else if (res.cancel) {
              console.log('用户取消操作');
              // wx.navigateTo({
              //   url: '/pages/home/login/login',
              // })
            }
          }
        })
      },
      fail (res) {// 调用失败后的操作
        wx.showModal({
          title: '验证邮件发送失败！',
          content: '抱歉！验证邮件发送失败，请再次操作~',
          showCancel: 'false',
        })
        console.log(res)
      }
    })
  },

  // 接受输入框email地址并验证
  valid_email_addr:function(e){
    var that = this;
    // 验证邮件是否以@bupt.edu.cn结尾
    var strRegex = "(@bupt.edu.cn)$";   //用于验证教育邮箱的正则表达式
    var re= new RegExp(strRegex);
    // if (re.test(this.data.email_addr.toLowerCase())){
    // 严格匹配邮箱大小写
    if (re.test(this.data.email_addr)){
      wx.showModal({
        title: '教育邮箱验证通过！',
        content: '点击"发送邮件"后，验证邮件将发送至你的邮箱，请注意查收！若需使用其他邮箱注册，点击"取消"后重新输入',
        confirmText: '发送邮件',
        // https://developers.weixin.qq.com/community/develop/doc/000aa296ff4a60990dcdc39ab52800
        // wx.showModal 回调函数不能调用其他方法？
        success: (res) => {
          if (res.confirm) {
            this.send_email();
          }
          else if (res.cancel) {
            console.log('用户取消操作');
          }
        }
      })
    } else{
      // 邮箱无效
      wx.showModal({
        title: '教育邮箱验证未通过！！！',
        content: '请重新输入邮箱地址',
        showCancel: false,
      })
    }
  },

  check_register_info:function(){
    var passwd_tag = this.checkPasswd();
    if(passwd_tag) {
      if (this.data.studentnumber.length != 10) {
        wx.showToast({
          title: '学号错误',
          icon: 'error'
        })
        return false;
      }
      else if (this.data.verification_code.length != 6) {
        wx.showToast({
          title: '验证码错误',
          icon: 'error'
        })
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  },

  checkPasswd: function () {
    var passwd = this.data.usercode
    var repeatPasswd = this.data.usercode_repeat;
    if(passwd.length < 8){
      wx.showToast({
        title: '密码长度过短',
        icon: 'error'
      })
      return false;
    }
    let hasAlpha= (passwd.search(/[A-Za-z]/)!=-1) ? 1 : 0;
    let hasNumber= (passwd.search(/[0-9]/)!=-1) ? 1 : 0;
    if(hasAlpha == 0 || hasNumber == 0){
      wx.showToast({
        title: '未含数字和字母',
        icon: 'error'
      })
      return false;
    }
    if(passwd != repeatPasswd){
      wx.showToast({
        title: '密码不一致哦',
        icon: 'error'
      })
      return false;
    }
    return true;
  },

  // 激活账号
  activate_account:function(e){
    var that = this;
    var name = this.data.username
    var uid = this.data.studentnumber;
    var passwd = this.data.usercode;
    var verification_code = this.data.verification_code;
    var email_addr = this.data.email_addr
    if (this.check_register_info()) {
      wx.request({
        url: `${domain}/register.php`,
        data:{
          uid: uid,
          passwd: passwd,
          name: name,
          verification_code: verification_code,
          email_addr: email_addr,
          mode: 'register',
        },
        timeout: app.globalData.requestTimeout,
        success: function(res){
          var return_data = res.data
          console.log(return_data)
          if(return_data.state == 'fail') {
            wx.showModal({
              title:  '账号激活失败',
              content: return_data.detail,
              showCancel: false,
            })
          }
          else {
            wx.showModal({
              title:  '账号激活成功',
              content: '点击确定转到登录页开始使用吧~',
              showCancel: false,
              success (tag1) {
                if (tag1.confirm) {
                  wx.navigateTo({
                    url: '/pages/home/login/login',
                  })
                }
              }
            })
          }
        }
      })
    }
  },
})