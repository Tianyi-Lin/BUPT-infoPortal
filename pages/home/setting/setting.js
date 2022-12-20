// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 记录时间线开关的状态
    timeline_switch_state: null,
  },
  // 事件处理函数

  onLoad() {
    this.setData({
      timeline_switch_state: app.globalData.timelineOnOff,
    })
  },

  onShow() {
    this.setData({
      timeline_switch_state: app.globalData.timelineOnOff,
    })
  },

  // 时间线开关触发
  timelineSwitch: function (e) {
    if(e.detail.value){
      wx.showToast({
        title: '时间线模式开启',
        icon: 'success',
        duration: 1200,
      })
    }
    else{
      wx.showToast({
        title: '时间线模式关闭',
        icon: 'error',
        duration: 1200,
      })
    }
    app.globalData.timelineOnOff = e.detail.value
    // console.log(app.globalData.timelineOnOff)
  },


  // 未开发功能
  not_developed_setting: function (e) {
    wx.showToast({
      title: '还未开发哦!去其他地方看看吧(^ρ^)',
      icon: 'none',
    })
  },
})
