// pages/home/home.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //搜索初始
    searchTxt:"",
    value:"",
    //轮播数据
    imgUrls:[],
    //横向导航数据
    navlist: [],
    //激活横向导航第几个变样式
    nav_active:0,
    //切换渲染列表的数据要传的参数
    nav_id:"",
    //商品列表数据
    shoplist:[]
  },
  //获取轮播数据
  lunbo(){
    let that = this
    wx.request({
      url: 'https://api.it120.cc/dengwenjing/banner/list',
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          imgUrls:res.data.data
        })
      }
    })
  },
  //获取横向导航数据
  navlist(){
    let that = this
    wx.request({
      url: 'https://api.it120.cc/dengwenjing/shop/goods/category/all',
      data:{

      },
      success:function(res){
        // console.log(res.data.data)
        that.setData({
          navlist: res.data.data
        })
      }
    })
  },
  //横向导航点击事件，先后切换样式,后做切换下面渲染列表的数据
  bindtapNav(e){
    // console.log(e.target.dataset.index)
    // console.log(e.target.dataset.id)
    e.target.dataset.id == "29218" ? e.target.dataset.id = "" : e.target.dataset.id
    this.setData({
      nav_active: e.target.dataset.index,
      nav_id: e.target.dataset.id
    },()=>{
      this.shoplist()
    })
  },
  //获取商品列表数据
  shoplist(){
    let that = this
    wx.request({
      url: 'https://api.it120.cc/dengwenjing/shop/goods/list',
      data:{
        categoryId: that.data.nav_id,
        nameLike:that.data.searchTxt
      },
      success:function(res){
          // console.log(res.data.data)
        if(res.data.code==0){
          that.setData({
            shoplist: res.data.data
          })
        }
      }
    })
  },
  //键盘回车模糊查询
  keyDown(e){
    // console.log(e.detail.value)
    this.setData({
      searchTxt: e.detail.value
    },()=>{
      this.shoplist()
    })
  },
  //文本框按下事件----模糊查询
  onipt(e){
    // console.log(e.detail.value)
    this.setData({
      searchTxt: e.detail.value
    })
  },
  //点击按钮才调用-----模糊查询
  search(){
    this.shoplist()
  },
  //跳转详情页
  goDetails(e){
    // console.log(e.target.dataset.id)
    // console.log(e.target.dataset)
    wx.navigateTo({
      url: "/pages/details/details?id=" + e.target.dataset.id + "&v_id=" + e.target.dataset.v_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lunbo()
    this.navlist()
    this.shoplist()
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