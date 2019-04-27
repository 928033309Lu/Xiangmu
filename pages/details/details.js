// pages/details/details.js
const WxParse = require('../../wxParse/wxParse.js')
let arr = wx.getStorageSync("LengthArr") || []
// let arr1 = wx.getStorageSync("propertiesArr") || []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //id,v_id商品列表传来的参数v_id视频用的
    //详情页ID
    id:"",
    //详情页视屏ID
    v_id:"",
    //视频的src,需调接口拿
    src:"",
    //详情页数据
    //信息部分
    basicInfo:{},
    //其他信息
    category: {},
    //轮播部分
    pics: [],
    //尺寸颜色部分
    properties: [],
    //遮罩显示隐藏
    show:false,
    //颜色激活
    activeCol:-1,
    sizeCol:-1,
    //颜色对象，页面自定义点击传来的，在页面提前拼接好格式，用来传参请求数据
    p_idobj:"",
    //尺寸对象，页面自定义点击传来的，在页面提前拼接好格式，用来传参请求数据
    s_idobj:"",
    //当前尺寸颜色的价格
    nowMoney:"",
    //当前尺寸颜色的商品价格对象-值
    moneyObj:{},
    //购物车数据长度
    len: "",
    //初始数量
    num:1
  },
  //颜色选择变色
  col(e){
    // console.log(e.target.dataset.index)
    // console.log(e.target.dataset.p_idobj)
    this.setData({
      activeCol: e.target.dataset.index,
      p_idobj: e.target.dataset.p_idobj
    }, () => {
      if (this.data.p_idobj && this.data.s_idobj) {
        this.getMoney()
      }
    })
  },
  //尺寸选择变色
  sizeCol(e){
    // console.log(e.target.dataset.index)
    // console.log(e.target.dataset.s_idobj)
    this.setData({
      sizeCol: e.target.dataset.index,
      s_idobj: e.target.dataset.s_idobj
    },()=>{
      if (this.data.p_idobj && this.data.s_idobj){
        this.getMoney()
      }
    })
  },
  //获取颜色尺寸对应的商品价格
  getMoney(){
    let that = this
    let str = that.data.p_idobj+","+that.data.s_idobj
    // console.log(str)
    
      wx:wx.request({
        url: 'https://api.it120.cc/dengwenjing/shop/goods/price',
        data: {
          goodsId:that.data.id,
          propertyChildIds: str
        },
        success: function(res) {
          console.log(res.data.data)
          if(res.data.code == 0){

            that.setData({
              moneyObj:res.data.data
            })
          }

        }
      })
    
  },
  //加
  jia(){
    this.setData({
      num:++this.data.num
    })
    
  },
  //减
  jian(){
    this.setData({
      num: --this.data.num
    })
  },
  //点击加入购物车按钮---关闭遮罩
  addShop(){
    if (this.data.p_idobj && this.data.s_idobj){
      //添加自定义属性名，值
      this.data.moneyObj.num = this.data.num
      this.data.moneyObj.isChecked = true
      this.data.moneyObj.img = this.data.basicInfo.pic
      this.data.moneyObj.name = this.data.basicInfo.name
      //购物车数量长度  和  购物车要用--名字--数量--选择后的规格的ID
      //当前规格数据properties  购物车要用从这里判断找出ID对应的名字
      arr.push(this.data.moneyObj)
      // arr1.push(this.data.properties)
      wx.setStorageSync("LengthArr", arr)
      // wx.setStorageSync("propertiesArr", arr1)
//购物车要用--名字--数量--选择后的规格名字--选择后的规格名字对应的价钱--当前规格数据properties
//传过去,再筛选出来，根据ID找出对应的名字
      this.getLength()
      //1秒后关闭遮罩
      setTimeout(()=>{
        this.setData({
          show: false
        })
      },1000)
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        duration: 1000
      })
    }else{
      //提示
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //获取购物车数量
  getLength(){
    console.log(wx.getStorageSync("LengthArr").length)
    this.setData({
      len: wx.getStorageSync("LengthArr").length
    })
  },
  //获取视频数据
  getVideoSrc(){
    let that = this
    if(that.data.v_id){

      wx:wx.request({
        url: 'https://api.it120.cc/dengwenjing/media/video/detail',
        data: {
          videoId: that.data.v_id
        },
        success: function(res) {
          // console.log(res)
          if(res.data.code==0){
              that.setData({
                src: res.data.data.fdMp4
              })
          }
        }   
      })
    }
  },
  //获取详情页数据
  getDetail(){
    let that = this
    if(that.data.id){

      wx.request({
        url: 'https://api.it120.cc/dengwenjing/shop/goods/detail',
        data:{
          id : that.data.id
        },
        success:function(res){
            // console.log(res.data.data)
          //详情内容
          let contents = res.data.data.content
          WxParse.wxParse('img', 'html', contents, that, 5)
            that.setData({
              basicInfo: res.data.data.basicInfo,
              category: res.data.data.category,
              pics: res.data.data.pics,
              properties: res.data.data.properties
            })
        }
      })
    }
  },
  //点击显示遮罩
  zhezhao(){
    this.setData({
      show: true
    })
  },
  offzhe(){
    this.setData({
      show: false
    })
  },
  //跳转,在线聊天页面
  onlineSpeak(){
    wx.navigateTo({
      url:"/pages/onspeak/onspeak"
    })
  },
  //跳转购物车页面
  goShopCar(){
    wx.reLaunch({
      url:"/pages/shopcar/shopcar"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData({
      id: options.id,
      v_id: options.v_id
    },()=>{
      this.getVideoSrc()
      this.getDetail()
    })
    
    this.getLength()
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
    arr = wx.getStorageSync("LengthArr") || []
    // arr1 = wx.getStorageSync("propertiesArr") || []
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