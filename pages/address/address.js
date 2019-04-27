// pages/address/address.js
let list = require('../../utils/city.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面渲染的
    value: ["请选择", "请选择", "请选择"],
    //城市编码ID
    shengID:"",
    //省份编码ID
    shiID:"",
    //联系人
    linkMan:"",
    //手机号码
    mobile:"",
    //详细地址
    address:"",
    //邮编
    code:"",
    //初始收货地址
    arr: wx.getStorageSync("shouArr")|| [],
    token:""
  },
  //value改变时触发
  changeValue(e){
    // console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    },()=>{
      this.getCityID()
    })
  },
  //从模拟数据里筛选出--城市编码ID和省份编码ID--
  getCityID(){
    let that = this
    list.cityData.map((item,index)=>{
      // console.log(item)

      //判断是否直辖市数据 --普通城市与直辖市数据不一样
      if (that.data.value[0] != that.data.value[1]) {
        if(that.data.value[0] == item.name){
          //获取到城市编码
          // console.log(item.id,item.name)
          that.setData({
            shengID: item.id
          })
        }
        item.cityList.map((item2,index2)=>{
          if (item2.name == that.data.value[1]) {
            //获取到省份编码
            // console.log(item2.id, item2.name)
            that.setData({
              shiID: item.id
            })
          }
        })
      }else{
        if (that.data.value[0] == item.name) {
          //获取到城市编码和省份编码---直辖市的省份ID和城市ID一样
          // console.log(item.id,item.name)
          that.setData({
            shengID: item.id,
            shiID: item.id
          })
        }
      }

    })
  },
  //输入联系人触发事件
  linkManVal(e){
    // console.log(e.detail.value)
    this.setData({
      linkMan: e.detail.value
    })
  },
  //手机号码
  mobileVal(e){
    // console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },
  //详细地址
  addressVal(e) {
    // console.log(e.detail.value)
    this.setData({
      address: e.detail.value
    })
  },
  //邮编
  codeVal(e) {
    // console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  //保存，添加收货地址
  add(){
    let that = this
    console.log(this.data.token)
    wx.request({
      url: 'https://api.it120.cc/luruifeng/user/shipping-address/add',
      data: {
        //所属城市编码--导入模拟数据，筛选出所属的城市编码
        cityId: that.data.shengID,
        //所属省份编码--
        provinceId: that.data.shiID,
        //联系人
        linkMan: that.data.linkMan,
        //手机号码
        mobile: that.data.mobile,
        //详情地址
        address: that.data.address,
        //邮编
        code: that.data.code,
        token: that.data.token
      },
      success(res) {
        console.log(res)
        //添加成功,返回的数据就是，
        //将数据push存起来本地
        if (res.data.code == 0) {
          //添加自定义属性，是否选中
          res.data.data.isChecked = false
          that.data.arr.push(res.data.data)
          that.setData({
            arr: [...that.data.arr]
          })
          wx.setStorageSync("shouArr", that.data.arr)

          wx.showToast({
            title: '保存成功',
            duration: 500
          })
          //跳转，在那边本地取出数据渲染
          wx.navigateTo({
            url: '/pages/shouhuo/shouhuo'
          })
        }
      }
    })
  },
  //取消返回去
  quxiao(){
    wx.navigateTo({
      url: '/pages/shouhuo/shouhuo'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync("login").token)
    this.setData({
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