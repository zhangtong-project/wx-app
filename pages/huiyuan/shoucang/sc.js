// pages/huiyuan/shoucang/sc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:"",
    shoucangs:[]
  },
  mydel:function(e){
    var that = this;
    wx.showModal({
      title:"删除确认",
      content:"删除后不可恢复",
      success:function(res){
        if(res.confirm){
            wx.request({
              url: 'http://www.yaoyiwangluo.com/wx_shoucang_del.asp',
              data:{
                uid:that.data.user_id,
                scid:e.currentTarget.dataset.id,
              },
              success:function(res){
                console.log(res.data)
                that.cz();
              }
            })
        }else{
            console.log("取消")
        }
      }
    })
  },
  //重载数据
  cz:function(){
    console.log(111)
     var that = this;
     wx.getStorage({
      key: 'uid',
      success:function(res){
        console.log(res.data)
        that.setData({
         user_id:res.data
        })
        //获取数据
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_shoucang_list.asp',
          data:{
            uid:res.data
          },
          success:function(res){
            console.log(res.data)
            for(var j=0;j<res.data.length;j++){
              for(var i=0;i<res.data.length;i++){
                if(i==j){
                  res.data[j].cp_tupian=res.data[i].cp_tupian.replace('s','')
                }
              }     
            }
            that.setData({
             shoucangs:res.data
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     wx.getStorage({
       key: 'uid',
       success:function(res){
         console.log(res.data)
         that.setData({
          user_id:res.data
         })
         //获取数据
         wx.request({
           url: 'http://www.yaoyiwangluo.com/wx_shoucang_list.asp',
           data:{
             uid:res.data
           },
           success:function(res){
             console.log(res.data)
             for(var j=0;j<res.data.length;j++){
              for(var i=0;i<res.data.length;i++){
                if(i==j){
                  res.data[j].cp_tupian=res.data[i].cp_tupian.replace('s','')
                }
              }     
            }
             that.setData({
              shoucangs:res.data
             })
           }
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