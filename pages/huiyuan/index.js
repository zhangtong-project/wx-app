// pages/huiyuan/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      str_u_login:"",
      str_u_id:"",
      str_u_name:""
  },
  toReg:function(){
    wx.navigateTo({
      url: '/pages/huiyuan/zhanghao/reg',
    })
  },
  getWxInfo:function(){
    var wx_nicheng="";
    var wx_touxiang="";
    var wx_openid="";
    wx.getUserProfile({
      desc: '获取信息',
      success: (res) => {
        wx_nicheng = res.userInfo.nickName;
        wx_touxiang =res.userInfo.avatarUrl;
      }
    })
    wx.login({
      success:function(res){
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid:"wx5a0648f50a4c4966",
            secret:"30a56d3a6efd97adf5a4bab6fbb81160",
            js_code:res.code,
            grant_type:"authorization_code"
          },
          method:"GET",
          success:function(res){
            wx_openid = res.data.openid;
            wx.request({
              url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu-weixin.asp',
              data:{
                wx_openid:wx_openid,
                wx_nicheng:wx_nicheng,
                wx_touxiang:wx_touxiang
              },
              success:function(res){
                wx.setStorage({
                  data: "yes",
                  key: 'u_login',
                  success:function(res){
                    wx.reLaunch({
                      url: '/pages/huiyuan/index',
                    })
                  }
                })
                wx.setStorage({
                 data: res.data.uid,
                 key: 'uid',
                })
              }
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
      var that=this;
      
      wx.getStorage({
        key: 'uid',
        success:function(res){
          that.setData({
            str_u_id:res.data
          })
        }
      }) 
      wx.getStorage({
        key: 'username',
        success:function(res){
          that.setData({
            str_u_name:res.data
          })
        }
      }) 
      wx.getStorage({
        key: 'u_login',
        success:function(res){
          that.setData({
            str_u_login:res.data
          })
          if(res.data == "yes"){
            wx.navigateTo({
              url: '/pages/huiyuan/index2',
            })
          }
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
     this.onLoad();
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