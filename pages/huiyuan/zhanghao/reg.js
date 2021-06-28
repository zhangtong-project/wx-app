// pages/huiyuan/zhanghao/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     error:""
  },
  zhuce:function(e){
    var that=this;
    console.log(e.detail.value)
    var username=e.detail.value.username;
    var password1=e.detail.value.password1;
    var password2=e.detail.value.password2;
    console.log(password1 == password2)
    if(username != "" && password1!= "" && password2 != ""){
      if(password1 == password2){
        that.setData({error:''})
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu.asp',
          data:{
            yhm:username,
            mm:password1
          },
          success:function(res){
             console.log(res.data)
             if(res.data.zt == "yes"){
               console.log(res.data.xinxi + res.data.uid)
               wx.setStorage({
                 data: "yes",
                 key: 'u_login',
               })
               wx.setStorage({
                data: res.data.uid,
                key: 'uid',
               })
               wx.setStorage({
                data:username,
                key: 'username',
                success:function(res){
                  wx.switchTab({
                    url: '/pages/huiyuan/index',
                  }) 
                }
               })
             }else if(res.data.zt == "no"){
               that.setData({
                error:res.data.xinxi
               })
             }
          }
        })
      }else{
        that.setData({
          error:'密码不一致'
        })
      }
    }else{
       that.setData({
         error:'请填写完整账号和密码'
       })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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