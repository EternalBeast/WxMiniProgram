// pages/hot/hot.js
Page({
  listData: {},

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: undefined,
    switchTime: undefined,
    currentList: []
  },

  changeTab(e) {
    const activeTab = e.target.dataset.type
    const switchTime = this.data.switchTime
    this.setData({
      activeTab
    })
    wx.setStorageSync('activeTab', activeTab)
    this.changeCurrentList(activeTab, switchTime)
  },

  changeTime(e) {
    const switchTime = e.target.dataset.time
    const activeTab = this.data.activeTab
    this.setData({
      switchTime
    })
    wx.setStorageSync('switchTime', switchTime)
    this.changeCurrentList(activeTab, switchTime)
  },

  changeCurrentList(activeTab, switchTime) {
    const time = switchTime === 'week' ? 'Week' : 'Month'
    const listName = `${activeTab}${time}`
    this.setData({
      currentList: this.listData[listName]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'https://www.fastmock.site/mock/929b2f226eb0a36b20d91bd895499c5c/weixin/api/getRecommend',
      success: (res) => {
        const {data: {data}} = res
        this.listData = data
        const activeTab = wx.getStorageSync('activeTab') || 'project'
        const switchTime = wx.getStorageSync('switchTime') || 'week'
        this.setData({activeTab, switchTime})
        this.changeCurrentList(activeTab, switchTime)
      }
    })
  },
})