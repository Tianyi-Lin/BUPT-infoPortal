// index.js
// 获取应用实例
const app = getApp()
var domain = app.globalData.domain;

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // 时间线标志
    timelineOnOff: null,
    TabCur: 0,
    // 登录标志，默认未登录false
    isLoggedIn: false,
    isLoading: false,
    isBottom: false,
    pageIndex: 1,
    pageCount: 0,
    posts: [],
    thatsall: false,
    newsOptions: [],
    uid:null
  },
  // 事件处理函数

  onLoad() {
    var that = this
    this.setData({
      date: app.globalData.date,
      // 时间线标志,从全局变量获取
      timelineOnOff: app.globalData.timelineOnOff,
      isLoggedIn: app.globalData.isLoggedIn,
      newsOptions: app.globalData.newsOptions
    })
    if (app.globalData.isLoggedIn == true) {
      this.requestInfo();
    }
    // console.log("dddddd")
    console.log('index.js onLoad的timeline状态为' + String(this.data.timelineOnOff))
    console.log('index.js onLoad的isLoggedIn状态为' + String(this.data.isLoggedIn))
  },

  onShow:function(){
    this.setData({
      // 时间线标志,从全局变量获取
      timelineOnOff: app.globalData.timelineOnOff,
      // 登录标志,从全局变量获取
      isLoggedIn: app.globalData.isLoggedIn,
      // posts: app.globalData.isLoggedIn?this.data.posts:[],
      posts: this.data.posts,
    })
    if (app.globalData.isLoggedIn == true) {
      this.requestInfo();
    }
    // console.log(this.data.uid)
    console.log('index onShow的timeline状态为' + String(this.data.timelineOnOff))
    console.log('index onShow的isLoggedIn状态为' + String(this.data.isLoggedIn))
  },

  onPostTap: function (event) {
    var that = this;
    app.globalData.currentPostUrl = event.currentTarget.dataset.url;
    app.globalData.currentPostDetail = event.currentTarget.dataset.news_html;

    // console.log(event.currentTarget);
    // 向全局变量传递作者信息
    app.globalData.current_news_author = event.currentTarget.dataset.news_author;

    // console.log("url is " + url);
    var id = event.currentTarget.dataset.id;
    console.log(id);
    var posts = this.data.posts;
    posts.forEach(function(item,index){
      if(item.news_id==id){
        // var issubscribed = posts[index].news_subscription;
        posts[index].news_view = parseInt(posts[index].news_view) + 1;
        console.log(posts)
      }
    })
    this.setData({
      posts: posts
    })
    wx.navigateTo({
      url: "../show_newsinfo/show_newsinfo"
    })
  },

  onPullDownRefresh:function(){
    this.setData({
      isLoading: true,
      isBottom : false,
      thatsall : false,
      pageIndex: 1,
    }) 
    // 下拉刷新提示
    wx.showLoading({
      title: '刷新中，请稍等',
      success: function () { 
        setTimeout(function () {wx.hideLoading(
        )}, 1000)
      },
      fail: function () {
        wx.hideLoading()
        // showloading和toast不可混用
        // wx.showToast({
        //     title:'刷新失败！',
        //     icon:"error",
        //     duration:1000
        //     })
      }
    })

    // wx.showToast({
    //   title:'刷新中，请稍等',
    //   icon:'success',
    //   duration:1000
    //   })
    if (app.globalData.isLoggedIn == true) {
      this.requestInfo();
    }
  },

  onReachBottom:function(){
    this.setData({
      isLoading : true,
      isBottom : true
    })
    // if(this.data.pageIndex < this.data.pageCount){
    //   this.data.pageIndex++;
    //   this.requestInfo();
    // }
    // else{
    //   this.setData({
    //     thatsall : true
    //   })
    // }
    this.data.pageIndex++;
    // wx.showToast({
    //   title:'下拉获取更多通知',
    //   icon:'success',
    //   duration:1000
    //   })

    wx.showLoading({
      title: '上拉获取更多',
      success: function () {},
    })
    
    // 加载新通知
    if (app.globalData.isLoggedIn == true) {
      this.requestInfo();
    }
    // 加载成功后hideloading在requestinfo中
  },

  requestInfo:function(){
    var that = this;
    wx.request({
      url: `${domain}/requestIndexInfo.php`,
      headers: {
        'Content-Type': 'application/json'
      },

      data:{
        uid: that.data.uid,
        pageIndex: that.data.pageIndex,
      },

      success: function (res) {
      // 成功后延迟0.5s取消加载提示
      setTimeout(function () {wx.hideLoading()}, 500)

        var tempPost = that.data.posts;
        var tempPageIndex = that.data.pageIndex;
        if(that.data.pageIndex==1){
          tempPost = res.data.posts;
          tempPageIndex = 1;
          that.setData({
            isLoading: false,
          })
          wx.stopPullDownRefresh({
            success: (res) => {
              // console.log('停止下拉刷新')

            },
          })
        }
        else{
          tempPost = tempPost.concat(res.data.posts);
          tempPageIndex = tempPageIndex + 1;
        }
        that.setData({
          posts: res.data.posts,
          pageIndex: tempPageIndex,
          pageCount: res.data.pageCount,
          posts: tempPost
        })
        console.log(res.data)
      }
    })
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },

  show_newsinfo:function(e){
    var that = this;
    app.globalData.currentPostUrl = e.currentTarget.dataset.url;
    app.globalData.currentPostDetail = e.currentTarget.dataset.rss;
    wx.navigateTo({
      url: "../show_newsinfo/show_newsinfo"
    })
  },

})
