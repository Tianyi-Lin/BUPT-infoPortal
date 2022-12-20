const app = getApp();
var domain = app.globalData.domain;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    newpasswd: '',
    newpasswd_repeat:'',
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

  set_userid:function(e){
    let that = this;
    this.setData({
      userid: e.detail.value,
    }) 
  },

  set_newpasswd:function(e){
    let that = this;
    this.setData({
      newpasswd: e.detail.value,
    }) 
  },

  set_newpasswd_repeat:function(e){
    let that = this;
    this.setData({
      newpasswd_repeat: e.detail.value,
    }) 
  },

  checkPasswd: function () {
    var passwd = this.data. newpasswd
    var repeatPasswd = this.data. newpasswd_repeat;
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

  // 重置密码
  reset_passwd:function(e){
    var that = this;
    var uid = this.data.userid;
    var newpasswd = this.data.newpasswd;
    if (uid.length != 10) {
      wx.showToast({
        title: '学号错误',
        icon: 'error'
      })
      return;
    }
    else {
      if(this.checkPasswd()) {
        console.log("新密码符合要求")
        wx.request({
          url: `${domain}/resetpasswd.php`,
          data:{
            uid: uid,
            newpasswd: newpasswd,
            mode: 'reset_passwd',
          },
          timeout: app.globalData.requestTimeout,
          success: (res) => {
            var return_data = res.data
            console.log(return_data)
            if(return_data.state == 'fail') {
              wx.showModal({
                title:  '重置密码失败',
                content: return_data.detail,
                showCancel: false,
              })
            }
            else if(return_data.state == 'success') {
              // 向全局变量和本地存储中都写入数据 isLoggedIn 改为 false 因为重新设置了密码
              app.globalData.isLoggedIn = false,
              wx.setStorage({
                data: false,
                key: 'isLoggedIn',
              })
               
              wx.showModal({
                title:  return_data.detail,
                content: '点击确定返回登录页使用新密码登录',
                showCancel: false,
                success: (tag1) => {
                  if (tag1.confirm) {
                    wx.navigateTo({
                      url: '/pages/home/login/login',
                    })
                  }
                  // else if (res.cancel) {
                  //   console.log('用户点击取消');
                  // }
                }
              })
            }
          },
          fail: function(){
            console.log('错误')
          },
        })
      }
      else if(!this.checkPasswd()) {
        return;
      }
    }
  },
})