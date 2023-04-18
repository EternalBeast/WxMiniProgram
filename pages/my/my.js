const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
    data: {
        hasUserInfo: false,
        avatarUrl: defaultAvatarUrl,
        theme: wx.getSystemInfoSync().theme,
        footerText: '',
        formData: {
            nickname: ''
        },
        rules: [{
            name: 'nickname',
            rules: [{
                required: true,
                message: '昵称必填'
            }, {
                minlength: 4,
                message: '昵称最短为4个字符'
            }]
        }]
    },
    onLoad() {

        wx.onThemeChange((result) => {
            console.log(result)
            this.setData({
                theme: result.theme
            })
        })
    },

    onChooseAvatar(e) {
        const {
            avatarUrl
        } = e.detail
        this.setData({
            avatarUrl,
        })
    },

    onSubmit(e) {
        this.selectComponent('#mpform').validate((isValid, errors) => {
            if (isValid) {
                this.setData({
                    hasUserInfo: true,
                    footerText: ''
                })
            } else {
                this.setData({
                    footerText: errors[0].message
                })
            }
        })
    },

    onInputChange(e) {
        const {
            value
        } = e.detail
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: value
        })
    },

    onSuccess(e) {
        this.setData({
            footerText: '',
        })
    },

    onFailed(e) {
        const {
            message
        } = e.detail.errors[0]
        this.setData({
            footerText: message,
        })
    },
})