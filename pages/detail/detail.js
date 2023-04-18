// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: undefined,
    courseData: {}
  },

  addToCart() {
    const {
      id,
      imgUrl,
      title,
      price
    } = this.data.courseData
    const cartList = wx.getStorageSync('cartList') || []
    let canAdd = true
    cartList.map(item => {
      if (item.id === id) {
        wx.showToast({
          title: '已在收藏夹中！',
          icon: 'none'
        })
        canAdd = false
      }
    })
    if (canAdd) {
      cartList.push({ id, imgUrl, title, price, checked: true })
      try {
        wx.setStorageSync('cartList', cartList)
        wx.showToast({
          title: '加入成功！',
          icon: 'success'
        })
      } catch (error) {
        console.error(error)
        wx.showToast({
          title: '加入收藏夹错误',
          icon: 'error'
        })
      }
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    wx.request({
      url: `https://www.fastmock.site/mock/929b2f226eb0a36b20d91bd895499c5c/weixin/api/getCourse/${options.id}`,
      success: (res) => {
        const {
          data: {
            data
          }
        } = res
        this.setData({
          courseData: data
        })
      }
    })
  },
})