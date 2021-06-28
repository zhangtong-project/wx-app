// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgUrl:[],
     xiaoxi_list:[],
     zuixin_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //轮播图照片
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        success:function(res){
          that.setData({
            imgUrl:res.data.message
          })
        }
      })
      //消息信息
      wx.request({
        url: 'http://www.yaoyiwangluo.com/wx_news_list.asp',
        success:function(res){
          that.setData({
            xiaoxi_list:res.data
          })
        }
      })
      //最新产品信息
      wx.request({
        url: 'http://www.yaoyiwangluo.com/wx_CpList_top4.asp',
        success:function(res){
          for(var j=0;j<res.data.length;j++){
              for(var i=0;i<res.data.length;i++){
                if(i==j){
                  res.data[j].cp_tupian=res.data[i].cp_tupian.replace('s','')
                }
              }     
            }
           that.setData({
             zuixin_list:res.data
           })
        }
      })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})