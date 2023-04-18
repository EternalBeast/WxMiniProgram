Page({
  data: {
    cartList: [],
    totalPrice: 0
  },

  countPrice() {
    const cartList = this.data.cartList
    let totalPrice = 0
    cartList.map(item => {
      if (item.checked) {
        totalPrice += item.price
      }
    })
    this.setData({
      totalPrice
    })
  },

  checkboxChange(e) {
    const cartList = this.data.cartList
    const values = e.detail.value
    for (let i = 0, lenI = cartList.length; i < lenI; i++) {
      cartList[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; j++) {
        if (cartList[i].id === Number(values[j])) {
          cartList[i].checked = true
          break
        }
      }
    }

    this.setData({
      cartList
    })
    
    wx.setStorageSync('cartList', cartList)

    this.countPrice()
  },

  removeCourse() {
    const cartList = this.data.cartList
    const newList = []
    cartList.map(item => {
      if (!item.checked) {
        newList.push(item)
      }
    })
    this.setData({
      cartList: newList
    })
    this.countPrice()
    wx.setStorageSync('cartList', newList)
  },

  handleBuyTap() {
    wx.showLoading({
      title: '正在分享',
    })

    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '分享成功！',
      })
      this.removeCourse()
    }, 2000);
  },

  handleRemoveTap() {
    wx.showModal({
      content: '确认移出收藏夹？',
      complete: (res) => {
        if (res.confirm) {
          this.removeCourse()
        }
      }
    })
  },

  onShow() {
    const cartList = wx.getStorageSync('cartList')
    this.setData({
      cartList
    })
    this.countPrice()
  }
})