// pages/view/view.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //下面三个是授权后的用户信息
    iv: '',
    encryptedData: '',
    code: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    ////查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // console.log(res)
              
              //用户已经授权过
              wx.navigateTo({
                url: '/pages/face/face'
              })
            }
          })
        }
      }
    })
  },
  //点击授权
  bindGetUserInfo: function (e) {
      // console.log(e)
      this.setData({
        iv: e.detail.iv,
        encryptedData : e.detail.encryptedData
      })
      //授权成功后，跳转进入小程序首页
      wx.navigateTo({
        url: '/pages/face/face'
      })
      this.login()
  },
  //登录
  login(){
    let that = this
    wx.login({
      success(res) {
        // console.log(res)
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://api.it120.cc/luruifeng/user/wxapp/login',
            data: { code: res.code },
            success: function (res) {
              console.log(res)
             if(res.data.code == 10000){
               //沒登录注册跳注册函数
                that.register()
             } else if (res.data.code == 0){
                console.log(res)
                let login = {
                  "uid": res.data.data.uid,
                  "token": res.data.data.token,
                }
                //存本地了
                wx.setStorageSync('login', login)
             }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //注册/{domain}/user/wxapp/register/complex
  register(){
    let that = this
    wx.login({
      success(res) {
        // console.log(res)
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://api.it120.cc/luruifeng/user/wxapp/register/complex',
            data: {
              code: res.code,
              iv: that.data.iv,
              encryptedData: that.data.encryptedData
            },
            success: function (res) {
              console.log(res)
              if(res.data.code==0){
                that.login()
              }
            }
          })
        } else {
          console.log('注册失败！' + res.errMsg)
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