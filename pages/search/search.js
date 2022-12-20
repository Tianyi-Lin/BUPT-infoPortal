const app = getApp()
var domain = app.globalData.domain;

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // 登录标志
    isLoggedIn: false,
    keyword: "",
    // 搜索主页的字体颜色
    font_color_searchpage: '#13A9CC',
    // timelineOnOff
    timelineOnOff: true,
    // 轮播图片
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://s3.uuu.ovh/imgs/2022/12/07/f6a12a15ee73179f.png'
    }, {
      id: 1,
        type: 'image',
        url: 'https://s3.uuu.ovh/imgs/2022/12/07/f4d1213a2d54e785.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://mmbiz.qpic.cn/mmbiz_png/VzFuMauwoqSByU2p8bPsdA5IoianAKuUo6BV75JfRjlF5UDASib8lIzQUIf0CucpiaJ9jWPudox9miaZMINJz4bIdQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1'
    }, {
      id: 3,
      type: 'image',
      url: 'https://mmbiz.qpic.cn/mmbiz_jpg/VzFuMauwoqSX8XEPPe8icViaclcnS6KVTNv6l6icqsVavS5A9IRzpd0yXNcuFZmdUYmHQBrAK5eK0THwnHW4oGouw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1'
    }, {
      id: 4,
      type: 'image',
      url: 'https://mmbiz.qpic.cn/mmbiz_png/VzFuMauwoqToaEhaOPPydU4R2zibzRCHyfcDeEomsUlKRBj7CVlAZhDMXBaUIOPCsOGia02bvlCG3Vy9XUXTRWLA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1'
    }, {
      id: 5,
      type: 'image',
      url: 'https://mmbiz.qpic.cn/mmbiz_jpg/VzFuMauwoqSX8XEPPe8icViaclcnS6KVTNxpLiacXsvf6lUgtia5tWD0ZVg5eMPtuvib7up0LDwSUibGatxKHuruiapYg/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1'
    }, {
      id: 6,
      type: 'image',
      url: 'https://mmbiz.qpic.cn/mmbiz_jpg/VzFuMauwoqSX8XEPPe8icViaclcnS6KVTNuJMPo4a5QsibuIeTtTuKHfbPXXV1EDW08GFI4NDZ1cib6sDMTOVyYibBQ/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1'
    }],

    // //图标列表
    // iconList: [{
    //   icon: 'cardboardfill',
    //   color: 'red',
    //   badge: 0,
    //   name: '党政团建'
    // }, {
    //   icon: 'recordfill',
    //   color: 'orange',
    //   badge: 0,
    //   name: '校园生活'
    // }, {
    //   icon: 'picfill',
    //   color: 'yellow',
    //   badge: 0,
    //   name: '校园医疗'
    // }, {
    //   icon: 'noticefill',
    //   color: 'olive',
    //   badge: 0,
    //   name: '教务'
    // }, {
    //   icon: 'upstagefill',
    //   color: 'cyan',
    //   badge: 0,
    //   name: '竞赛'
    // }, {
    //   icon: 'clothesfill',
    //   color: 'blue',
    //   badge: 0,
    //   name: '英语'
    // }, {
    //   icon: 'discoverfill',
    //   color: 'purple',
    //   badge: 0,
    //   name: '体育'
    // }, {
    //   icon: 'questionfill',
    //   color: 'mauve',
    //   badge: 0,
    //   name: '讲座'
    // }, {
    //   icon: 'commandfill',
    //   color: 'purple',
    //   badge: 0,
    //   name: '图书馆'
    // }, {
    //   icon: 'brandfill',
    //   color: 'mauve',
    //   badge: 0,
    //   name: '研究生'
    // }],

    //图标列表
    iconList: [{
      icon_src: "/images/icons/politician-48.png",
      color: 'red',
      badge: 0,
      name: '党政团建'
    }, {
      icon_src: "/images/icons/campus-48.png",
      color: 'orange',
      badge: 0,
      name: '校园生活'
    }, {
      icon_src: "/images/icons/medical-48.png",
      color: 'yellow',
      badge: 0,
      name: '校园医疗'
    }, {
      icon_src: "/images/icons/icons8-teaching-48.png",
      color: 'olive',
      badge: 0,
      name: '教务'
    }, {
      icon_src: "/images/icons/icons8-competition-48.png",
      color: 'cyan',
      badge: 0,
      name: '竞赛'
    }, {
      icon_src: "/images/icons/icons8-translation-48.png",
      color: 'blue',
      badge: 0,
      name: '英语'
    }, {
      icon_src: "/images/icons/icons8-sport-48.png",
      color: 'purple',
      badge: 0,
      name: '体育'
    }, {
      icon_src: "/images/icons/icons8-lecture-48.png",
      color: 'mauve',
      badge: 0,
      name: '讲座'
    }, {
      icon_src: "/images/icons/icons8-library-building-48.png",
      color: 'purple',
      badge: 0,
      name: '图书馆'
    }, {
      icon_src: "/images/icons/icons8-student-male-48.png",
      color: 'mauve',
      badge: 0,
      name: '研究生'
    }, {
      icon_src: "/images/icons/icons8-innovation-48.png",
      color: 'mauve',
      badge: 0,
      name: '创新创业'
    }, {
      icon_src: "/images/icons/icons8-international-48.png",
      color: 'mauve',
      badge: 0,
      name: '国际交流'
    }, {
      icon_src: "/images/icons/icons8-prize-48.png",
      color: 'mauve',
      badge: 0,
      name: '获奖'
    }],

    // 初始化时通知分类的列数
    gridCol: 4,
    grifRow: 3,
    skin: false
  },

  // 参考colorUI轮播
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  onLoad: function () {
    var that = this
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
    })
    console.log('search.js onLoad的timeline状态为' + String(this.data.timelineOnOff))
    console.log('search.js onLoad的isLoggedIn状态为' + String(this.data.isLoggedIn))
  },

  onShow: function () {
    var that = this
    this.setData({
      isLoggedIn: app.globalData.isLoggedIn,
    })
    // console.log(this.data.uid)
    console.log('search.js onShow的timeline状态为' + String(this.data.timelineOnOff))
    console.log('search.js onShow的isLoggedIn状态为' + String(this.data.isLoggedIn))
  },

  searchInfo: function(e){
    this.setData({
      keyword: e.detail.value
    });
    app.globalData.searchkeyword = e.detail.value;
  },

  gosearch:function(){
    var that = this;
    // if(!this.data.uid){
    //   wx.showToast({
    //     title: '请登录后查询',
    //     icon: 'none',
    //   })
    // }
    // else if(!this.data.keyword){
    //   wx.showToast({
    //     title: '请输入搜索关键词',
    //     icon: 'none',
    //   })
    // }

    if(!this.data.keyword){
      wx.showToast({
        title: '请输入关键词',
        icon: 'error',
      })
    }

    else{
      wx.request({
        url: `${domain}/search.php`,
        data:{
          keyword: that.data.keyword,
          uid: that.data.uid
        },
        success:function(res){
          app.globalData.searchResult = res.data;
          console.log(app.globalData.searchResult);
          wx.navigateTo({
            url: 'result/result',
          })
          console.log(res.data)
        }
      })
    }
  },

  // 处理通知分类宫格的触发
  news_classify:function(e){
    // getApp().globalData.newstag = e.target.dataset.newskey
    var that = this;
    // 设置全局变量
    app.globalData.newstag = e.target.dataset.newskey;
    console.log(e.target.dataset.newskey)
    wx.request({
      url: `${domain}/reqinfo_newstag.php`,
      data:{
        newstag: e.target.dataset.newskey,
        uid: that.data.uid
      },
      success:function(res){
        app.globalData.searchResult = res.data;
        console.log(app.globalData.searchResult);
        wx.navigateTo({
          url: '/pages/search/newstagresult/newstagresult',
        })
        console.log(res.data)
      }
    })
  },


  // 宫格列表js
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})