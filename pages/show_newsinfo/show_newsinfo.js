// pages/detail/detail.js
let wxParse = require("../../wxParse/wxParse.js")
const app = getApp()

Page({
  data: {
    htmlstr: "",
    current_news_author: "",
  },

  onLoad: function (option) {
    var mode = option.mode;
    this.setData({
      mode: mode,
      str_html: app.globalData.currentPostDetail,
      current_news_author: app.globalData.current_news_author,
    })
    // wxparse
    wxParse.wxParse('htmlstr', 'html', app.globalData.currentPostDetail, this, 0)
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  //生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      str_html: app.globalData.currentPostDetail,
      current_news_author: app.globalData.current_news_author,
    })
  },

  //生命周期函数--监听页面隐藏
  onHide: function () {

  },

  //生命周期函数--监听页面卸载
  onUnload: function () {

  },


  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {

  },

  //页面上拉触底事件的处理函数
  onReachBottom: function () {

  },

  //用户点击右上角分享
  onShareAppMessage: function () {

  },


  // 复制附件url链接
  wxParseTagATap: function(e) {
    // 调试用
    // console.log(e.currentTarget.dataset)
    wx.setClipboardData({
      data: e.currentTarget.dataset.src,
      success: function() {
        wx.showToast({
          title: '链接已复制',
          duration: 1000,
        })
      },
      fail:function(){
        console.log('failed')
      }
    })
  }
  
})