const WxParse= require('../../wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight:0,
    currentTab:0,
    imgUrl:[],
    cp_jianjie:"",
    cp_kucun:"",
    cp_mingcheng:"",
    cp_yixiaoshou:"",
    jiage:"",
    xiangou_shuliang:"",
    sp_neirong:"",
    stars:[0,1,2,3,4],
    normalSrc:"/images/star.png",
    selectSec:"/images/starsel.png",
    pl:[],
    userid:"",
    key2:0,
    cp_id:""
  },
  //点击
   swichNav:function(e){
    var that = this;
    if(that.data.currentTab === e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab:e.target.dataset.current
       })
    }
   },
   //滑动
   huadong:function(e){
    var that = this;
    that.setData({
     currentTab:e.detail.current
    })
   },
   select00:function(e){
     var that = this;
     var key = e.currentTarget.dataset.key+1;
     that.setData({
       key:key-1,
       key2:key
     })
   },
   pinglun:function(e){
     var that = this;
     if(that.data.userid.length > 0){
       console.log("登录")
       wx.request({
         url: 'http://www.yaoyiwangluo.com/wx_AddPinlun.asp',
         data:{
          cpid:that.data.cp_id,
          user_id:that.data.userid,
          xx:that.data.key2,
          pinlun_neirong:e.detail.value.neirong
         },
         success:function(res){
           console.log(res.data)
         }
       })
     }else{
       console.log("未登录")
     }
   },
   shoucang:function(){
      var that = this;
      if(that.data.userid.length > 0){
        console.log("登录")
        wx.request({
          url: 'http://www.yaoyiwangluo.com/wx_shoucang_add.asp',
          data:{
           cs_uid:that.data.userid,
           cs_cpid:that.data.cp_id,
          },
          success:function(res){
            console.log(res.data)
            if(res.data.xinxi == "收藏成功"){
              wx.showToast({
                title: '收藏成功',
              })
            }else if(res.data.xinxi == "已经收藏"){
              wx.showToast({
                title: '已经收藏',
              })
            }
          }
        })
      }else{
        console.log("未登录")
      }
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({
      cp_id:options.cpid
    })
    //获取窗口高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          winHeight:result.windowHeight
        })
      },
    })
    //商品信息
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_sp_info-a.asp',
      data:{cp_id:options.cpid},
      success:function(res){
        that.data.imgUrl.push(res.data.cp_tupian);
        that.data.imgUrl.push(res.data.cp_tupian1);
        that.data.imgUrl.push(res.data.cp_tupian2);
        that.data.imgUrl.push(res.data.cp_tupian3);
        that.data.imgUrl.push(res.data.cp_tupian4);
        that.setData({
          imgUrl:that.data.imgUrl,
          cp_jianjie:res.data.cp_jianjie,
          cp_kucun:res.data.cp_kucun,
          cp_mingcheng:res.data.cp_mingcheng,
          cp_yixiaoshou:res.data.cp_yixiaoshou,
          jiage:res.data.jiage,
          xiangou_shuliang:res.data.xiangou_shuliang,
        })
      }
    })
    //详情信息
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_sp_info-b.asp',
      data:{cp_id:options.cpid},
      success:function(res){
            var article = res.data;
            WxParse.wxParse('article','html',article,that,5);
      }
    })

    //评论信息
    wx.request({
      url: 'http://www.yaoyiwangluo.com/wx_Pinlun_list.asp',
      data:{
         cpid:options.cpid
      },
      success:function(res){
        console.log(res.data)
         that.setData({
           pl:res.data
         })
      }
    })
    wx.getStorage({
      key: 'uid',
      success:function(res){
        that.setData({
          userid:res.data
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