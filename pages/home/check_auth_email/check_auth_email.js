// pages/home/changepasswd/changepasswd.js

const app = getApp();
var domain = app.globalData.domain;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    user_email: '',
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

  // 学号输入框
  set_userid: function(e) {
    this.setData({
      userid: e.detail.value
    });
  },
  // 邮箱输入框
  set_email_addr: function(e) {
    this.setData({
      user_email: e.detail.value
    });
  },

  // 接受输入框email地址并验证
  valid_email_addr:function(e){
    var that = this;
    // 验证邮件是否以@bupt.edu.cn结尾
    var strRegex = "(@bupt.edu.cn)$";   //用于验证教育邮箱的正则表达式
    var re= new RegExp(strRegex);
    // if (re.test(this.data.email_addr.toLowerCase())){
    // 严格匹配邮箱大小写
    if (re.test(this.data.user_email)){
      return true;
    } else {
      return false;
    }
  },


  // 激活是否时注册用户的邮箱
  check_auth_email:function(e){
    var that = this;
    var uid = this.data.userid;
    var email_addr = this.data.user_email;
    if (uid.length != 10) {
      wx.showToast({
        title: '学号错误',
        icon: 'error'
      })
      return;
    }
    else {
      if(this.valid_email_addr(this.data.user_email)) {
        console.log(uid)
        console.log(email_addr)
        console.log('-----------')
        wx.request({
          url: `${domain}/check_auth_email.php`,
          data:{
            uid: uid,
            email_addr: email_addr,
            mode: 'check_auth_email',
          },
          timeout: app.globalData.requestTimeout,
          success: (res) => {
            var return_data = res.data
            console.log(return_data)
            if(return_data.state == 'fail') {
              wx.showModal({
                title:  '验证用户信息失败',
                content: return_data.detail,
                showCancel: false,
              })
            }
            else if(return_data.state == 'success') {
              wx.showModal({
                title:  return_data.detail,
                content: '点击确定开始重设密码',
                success: (tag1) => {
                  if (tag1.confirm) {
                    wx.navigateTo({
                      url: '/pages/home/resetpasswd/resetpasswd',
                    })
                  }
                  else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              })
            }
          },
          fail: function(){
            console.log('错误')
          },
        })
      }
      else if(!this.valid_email_addr(this.data.user_email)) {
        wx.showToast({
          title: '非北邮教育邮箱',
          icon: 'error'
        })
        return;
      }
    }
  },
})