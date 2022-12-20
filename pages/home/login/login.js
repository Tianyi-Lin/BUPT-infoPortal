// pages/home/login/login.js

const app = getApp();
var domain = app.globalData.domain;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    passwd: '',
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
  useridInput: function(e) {
    this.setData({
      userid: e.detail.value
    });
  },
  // 密码输入框
  passwdInput: function(e) {
    this.setData({
      passwd: e.detail.value
    });
  },

  goto_register() {
    wx.showModal({
      title: '注册前的注意事项~',
      content: '因本小程序提供的是校园信息门户服务，故只面向北邮在校学生群体开放，敬请谅解(´ー`)~  在注册过程中需使用以@bupt.edu.cn结尾的教育邮箱进行验证！',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/home/register/register',
          })
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  vaild_id_code: function () {
    var uid = this.data.userid;
    var password = this.data.passwd;
    if(uid.length != 10){
      wx.showToast({
        title: '学号格式错误',
        icon: 'error'
      })
      return false;
    }
    if(password.length < 1){
      wx.showToast({
        title: '密码不为空哦',
        icon: 'error'
      })
      return false
    }
    return true;
  },

  goto_resetCode: function () {
    wx.navigateTo({
      url: '/pages/home/check_auth_email/check_auth_email',
    })
  },

  goto_login() {
    // console.log('uid' + this.data.userid)
    // console.log('passwd' + this.data.passwd)
    var uid = this.data.userid
    var password = this.data.passwd
    if(!this.vaild_id_code()){
      return
    }
    wx.request({
      url: `${domain}/login.php`,
      data:{
        uid: uid,
        pwd: password,
        mode: 'login',
      },
      timeout: app.globalData.requestTimeout,
      success: function(res){
        var return_data = res.data
        console.log(return_data)
        wx.showToast({
          title: return_data.detail,
          icon: return_data.state == 'success' ? 'success' : 'error',
          success:function(){
            setTimeout(() => {
                if(return_data.state == 'success'){
                  // 向全局变量和本地存储中都写入数据
                  app.globalData.isLoggedIn = true,
                  app.globalData.myprofile = return_data,
                  wx.setStorage({
                    data: true,
                    key: 'isLoggedIn',
                  })
                  wx.setStorage({
                    data: return_data,
                    key: 'myprofile',
                  })
                  wx.navigateBack({
                    delta: 1,
                  })
                }
                else {
                  // 向全局变量和本地存储中都写入数据
                  app.globalData.isLoggedIn = false,
                  app.globalData.myprofile = return_data,
                  wx.setStorage({
                    data: false,
                    key: 'isLoggedIn',
                  })
                  wx.setStorage({
                    data: return_data,
                    key: 'myprofile',
                  })
                }
            }, 750);
          }
        })
      }
    })
  }
})