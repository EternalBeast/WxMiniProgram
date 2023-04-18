Page({
  data: {
    showIcon: true,
    swiperList: [],
    courses: [],
    searchList: null,
    type: 'recommend',
    tabs: [{
        name: '推荐',
        type: 'recommend',
      },
      {
        name: '实战',
        type: 'project',
      },
      {
        name: '路径',
        type: 'path',
      },
      {
        name: '活动',
        type: 'activity',
      }
    ],
    activities: []
  },
  onLoad() {
    wx.request({
      url: 'https://www.fastmock.site/mock/929b2f226eb0a36b20d91bd895499c5c/weixin/api/getData',
      success: (res) => {
        const {
          data
        } = res.data
        const {
          swiperList,
          courses,
          activities
        } = data
        this.setData({
          swiperList,
          courses,
          activities
        })
      }
    })
  },
  handleInputChange(e) {
    const value = e.detail.value
    let searchList = null
    if (value) {
      const reg = new RegExp(value)
      searchList = this.data.courses.filter(item => reg.test(item.title.toLowerCase()))
    }
    this.setData({
      showIcon: value ? false : true,
      searchList
    })
  },
  changeType(e) {
    const {
      type
    } = e.currentTarget.dataset
    this.setData({
      type
    })
  },
  handleCourseTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  }
})