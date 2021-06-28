// pages/fenlei/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     zuixin_list:[],
     left_list:[],
     navid:0,
     winWidth:0,
     winHeight:0
  },
  navClick:function(e){
     var that = this;
     var id=e.target.dataset.id;
     that.setData({
      navid:id
     })
     wx.request({
       url: 'http://www.yaoyiwangluo.com/wx_fenlei_chanpin.asp',
       data:{
        int_lxid1:id
       },
       success:function(res){
        that.setData({
          zuixin_list:res.data
        })
       }
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     wx.getSystemInfo({
       success: (res) => {
         that.setData({
           winWidth:res.windowWidth,
           winHeight:res.windowHeight
         })
       },
     })
     wx.request({
       url: 'http://www.yaoyiwangluo.com/wx_fenlei.asp',
       success:function(res){
         that.setData({
          left_list:res.data
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