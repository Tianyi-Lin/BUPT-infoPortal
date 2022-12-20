var app = getApp();
Page({
  data: {
    posts: null,
    total: 0,
    newstag: null,
    // timeline开关
    timelineOnOff: null,
  },

  onLoad: function (options) {
    this.setData({
      posts: app.globalData.searchResult.posts,
      total: app.globalData.searchResult.total,
      uid: app.globalData.myprofile.uid,
      newstag: app.globalData.newstag,
      timelineOnOff: app.globalData.timelineOnOff,
    })
    console.log(this.data.posts)
  },

  onShow:function(){
    this.setData({
      timelineOnOff: app.globalData.timelineOnOff,
    })
  },

  onPostTap: function (event) {
    var that = this;
    app.globalData.currentPostUrl = event.currentTarget.dataset.url;
    app.globalData.currentPostDetail = event.currentTarget.dataset.news_html;
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
      url: "../../show_newsinfo/show_newsinfo"
    })
  },
})