// pages/shouhuo/shouhuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //收货地址
    shouArr: [],
    //单选的收货地址
    activeShou:{}
  },
  //跳转新增收货地址
  goAddress(){
    wx.navigateTo({
      url: "/pages/address/address"
    })
  },
  //单选，选中收货地址
  aaa(e){
    // console.log(e.target.dataset.index)
    this.setData({
      shouArr: this.data.shouArr.map((item,index)=>{
        if (index == e.target.dataset.index){
          item.isChecked = !item.isChecked
        }
        return item
      })
    },()=>{
      // console.log(this.data.shouArr)
      //把true取出来
      this.data.shouArr.map((item,index)=>{
        if(item.isChecked){
          //
          this.setData({
            activeShou: item
          })
        }
      })
    })
  },

  //确认选择
  queren(){
    let that = this
    //把收货地址存本地，返回那边拿出来渲染
    wx.setStorageSync("activeShou", that.data.activeShou)
    if (that.data.activeShou.isChecked){

      wx.navigateTo({
        url: "/pages/payment/payment"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shouArr: wx.getStorageSync("shouArr") || []
    }, () => {
      console.log(this.data.shouArr)
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