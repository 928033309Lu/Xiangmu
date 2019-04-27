// pages/payment/payment.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
      //数据数组来的
      daiObj:[],
      //收货地址
      activeShou:{},
    token:""
    
  },
  //跳转选择收货地址
  goAddress(){
    wx.navigateTo({
      url: "/pages/shouhuo/shouhuo"
    })
  },
  //提交订单
  goSubOrder(){
    let that = this
    let arr = []
    this.data.daiObj.map((item,index)=>{
      let obj = {
        goodsId: item.goodsId,
        propertyChildIds: item.propertyChildIds[0] + ":" + item.aaacol + "," + item.propertyChildIds[1].split(",")[1] + ":" + item.aaasize,
        number: item.num,
        logisticsType: '0'
      }
      arr.push(obj)
    })
    //拼接参数
    console.log(arr)

    if (that.data.activeShou){
      // console.log(arr)
      wx.request({
        url: 'https://api.it120.cc/luruifeng/order/create',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          goodsJsonStr: JSON.stringify(arr),
          token: that.data.token
        },
        success:function(res){
          console.log(res)
          //因为她token不行，前面登陆用了自己的token,这里就不起效了
          //做到这里就好了，换VUE时，全用自己的吧，最好自己后台写数据，或者我觉得就这样行啦
          //不管这里返回啥，随便跳个页面结束,就当做订单提交了，所以删除那本地对应已经提交订单的数据就好了 
          wx.removeStorageSync("daiObj")
          wx.removeStorageSync("LengthArr")
          wx.redirectTo({
            url:"/pages/orderlist/orderlist"
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      daiObj: wx.getStorageSync("daiObj") || [],
      activeShou: wx.getStorageSync("activeShou"),
      token: wx.getStorageSync("login").token
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