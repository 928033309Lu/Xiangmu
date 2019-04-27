// pages/onspeak/onspeak.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //后台返回来的
      messArr:[],
      value:""
  },
  oninput(e){
    // console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  aaa(){
    let that = this
    if(that.data.value){
    //通过 WebSocket 连接发送数据。需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
      wx.connectSocket({
        url: 'ws://localhost:8080'
      })
      wx.sendSocketMessage({
        data: that.data.value
      })
  //后台返回来的数据
      wx.onSocketMessage(function (res) {
        console.log(res.data)
        that.setData({
          messArr: that.data.messArr.concat(res.data)
        })
      })
      that.setData({
        value: ""
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.connectSocket({
      url: 'ws://localhost:8080'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket连接已关闭！')
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