// pages/shopcar/shopcar.js
import watch from "../../utils/watch"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    //切换编辑--完成
    show:true,
    //全选状态
    isallChecked:true,
    //购物车数据
    objArr: [],
    //规格数据
    // propertiesArr: wx.getStorageSync("propertiesArr") || [],
    //手写数据做判断
    colArr:[
      { id: 40236, name: "米白色" }, { id: 40246, name: "宝蓝色" },
      { id: 40250, name: "奶咖色" }, { id: 40252, name: "深灰色" },
      { id: 40280, name: "浅蓝色" }, { id: 40264, name: "黑色" },
      { id: 40282, name: "橘黄色" }, { id: 40284, name: "浅灰色" },
      { id: 40242, name: "砖红色" }, { id: 40289, name: "粉红色" },
      { id: 40248, name: "卡其色" }
    ],
    sizeArr :[
      { id: 40301, name: "8码" }, { id: 40332, name: "15码" },
      { id: 40305, name: "9码" }, { id: 40333, name: "16码" },
      { id: 40306, name: "10码" }, { id: 40336, name: "17码" },
      { id: 40327, name: "7码" }, { id: 40337, name: "18码" },
      { id: 40331, name: "14码" }, { id: 40340, name: "20码" }
    ],
    zongjia:""
  },
  //把规格ID对应名字筛选出来---改了用自定义数据方法
  getName(){
    // console.log(this.data.objArr)
    // console.log(this.data.propertiesArr)
    // this.data.propertiesArr.map(item=>{
    //   // console.log(item[0])
    //   // console.log(item[1])
    //   item[0].childsCurGoods.map(item2=>{
    //     //  console.log(item2)
    //     arr.push(item2)
    //   })
    //   item[1].childsCurGoods.map(item3 => {
    //     // console.log(item3)
    //     arr.push(item3)
    //   })
    // })
    // console.log(arr)


    let that = this
    this.data.objArr.map((item,index)=>{
      // console.log(Array.isArray( item.propertyChildIds))
      if (Array.isArray(item.propertyChildIds) != true){
        item.propertyChildIds = item.propertyChildIds.split(":")
        //自定义属性，把值得ID取出来
        item.aaacol = item.propertyChildIds[1].split(",")[0]
        item.aaasize = item.propertyChildIds[2].split(",")[0]
      }
      return item
    })
    this.setData({
      objArr: this.data.objArr
    },()=>{
      this.data.objArr.map(item=>{
        // console.log(item.aaacol)
        this.data.colArr.map(function (item2) {
          if(item2.id == item.aaacol){
            // console.log(item2.name)
            item.aaacolName = item2.name
          }
          return item
        })
        this.data.sizeArr.map(function (item3) {
          if (item3.id == item.aaasize) {
            // console.log(item3.name)
            item.aaasizeName = item3.name
          }
          return item
        })
      })
      // console.log(this.data.objArr)
      //修改好的数据
      this.setData({
        objArr: this.data.objArr
      })
    })
    // console.log(this.data.objArr,111)
    
  },
  //加
  jia(e){
    // console.log(e.target.dataset.id)
    this.setData({
      objArr: this.data.objArr.map((item, index) => {
        if (e.target.dataset.id == item.id) {
          item.num += 1
        }
        return item
      })
    })
  },
  //减
  jian(e){
    this.setData({
      objArr: this.data.objArr.map((item, index) => {
        if (e.target.dataset.id == item.id) {
          item.num -= 1
        }
        return item
      })
    })
  },
  //总价
  allMoney(){
    let zj = 0
    // console.log(this.data.objArr)
    this.data.objArr.map((item, index) => {
      zj += item.price * item.num
    })
    this.setData({
      zongjia: zj
    }) 
  },
  //点击按钮切换--编辑--完成
  gaiTap(){
    // console.log(this.data.show)//编辑false--完成true
    if (this.data.show==false){
      this.setData({
        show: !this.data.show,
        isallChecked: true
      })
    }
    //如果切换到编辑，把全部复选框值变成false
    else{
      this.setData({
        show: !this.data.show,
        isallChecked: false
      })
    }

  },
  //点击单选事件
  danxuan(e){
    //利用页面传来的参数，判断点击是这一行，并把这一行的isChecked改了
    // console.log(e.target.dataset.index)
    let index = e.target.dataset.index
    this.data.objArr[index].isChecked = !this.data.objArr[index].isChecked
    this.setData({
      objArr: this.data.objArr,
      isallChecked: this.data.objArr.every((item, index) => item.isChecked)
    })
   
  },
  //点击全选事件
  quanxuan(){
    this.setData({
      isallChecked: !this.data.isallChecked,
    },()=>{
      //遍历数据，让数据的单选值  跟着 全选值  变
      this.data.objArr.map((item, index) => {
        item.isChecked = this.data.isallChecked
      })
      this.setData({
        objArr: this.data.objArr
      })
    })
    
  },
  //选中删除
  del(){
    //利用过滤--有bar,本地数据没变化,所有再手动删除本地数组
    this.setData({
      objArr: this.data.objArr.filter((item, index) =>  !item.isChecked)
    },()=>{
      //删除本地数组
      this.setData({
        objArr: this.data.objArr.map((item, index) => {
          if (item.isChecked) {
            this.data.objArr.splice(index, 1)
          }
          return item
        })
      })
    })
  },
  //点击去结算，跳转到--代付款页面
  gojie(){
    //跳转页面前，
    //筛选出,要去结算的选中商品--push进新数组后,将这个新组存到本地，再把选中的从原数组里删除，
    //到那边后，本地取出这个数组，渲染页面
    this.data.arr=[]
    this.data.objArr.map((item,index)=>{
        if(item.isChecked){
          console.log(item)
          //添加到新数组
          this.data.arr.push(item)
        }
    })
    this.setData({
      arr: this.data.arr
    },()=>{
      // console.log(this.data.arr)
      wx.setStorageSync("daiObj", this.data.arr)
    })

    wx.navigateTo({
      url:"/pages/payment/payment"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      objArr: wx.getStorageSync("LengthArr") || []
    })
    this.getName()
    this.allMoney()
    //监听总价
    watch(this, {
      objArr: (newVal)=> {
        let zj = 0
        this.data.objArr.forEach((item, index) => {
          zj += item.price * item.num
        })
        this.setData({
          zongjia: zj
        })
        //存本地
        wx.setStorageSync("LengthArr", this.data.objArr)
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