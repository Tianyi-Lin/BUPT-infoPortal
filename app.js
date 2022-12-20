// app.js
const util = require('/utils/util.js')

App({
  globalData: {
    userInfo: null,
    currentPostUrl: null,
    currentPostDetail: null,
    // 搜索关键词
    searchkeyword: null,
    // 新闻标签
    newstag: null,
    // 是否使用时间线,默认使用
    timelineOnOff: true,
    // 进入通知详情页时通知发信人,默认""
    current_news_author: "",
    date: null,
    // 是否登录标志，默认flase
    isLoggedIn: false,

    domain: "https://info.tylin.space/php_code",
    // 超时限制
    requestTimeOut: 10000,
    myprofile: null,
    newsOptions: [],
    searchResult: null,
    // // 标记通知分类
    // newstag: null,
    // 颜色表格
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
  ]
  },

  onLaunch(){
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    // 在 app.js 里面调用 API，wx.cloud.init 传入云开发控制台中的云环境 ID，方便项目调用控制台中的数据和资源。
    wx.cloud.init({
      env:'cloud1-5g6javhj3adc0dd9' //输入您的环境 ID
    })
    }

    // 参考 https://github.com/weilanwl/coloruicss 导入colorui
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.date = util.formatTime(new Date())

    var that = this
    // 获取用户信息
    this.globalData.userInfo = wx.getStorageSync('userInfo')

    // // 获取登陆状态
    // this.globalData.isLoggedIn = wx.getStorageSync('isLoggedIn')

    // 如果获得到的状态为""
    if (this.globalData.isLoggedIn == '') {
      console.log('isLoggedIn == "", set it = flase')
      // 默认设置为false *******************************************************
      // 调试时设为true免登录
      this.globalData.isLoggedIn = false
    }
    else if ((this.globalData.isLoggedIn == true || this.globalData.isLoggedIn == false)) {
      // 获取登陆状态
      this.globalData.isLoggedIn = wx.getStorageSync('isLoggedIn')
    }
    this.getSystemStatusBarInfo()
  },

  getSystemStatusBarInfo: function () {
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
})
