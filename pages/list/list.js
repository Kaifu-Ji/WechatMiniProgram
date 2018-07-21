// pages/index/list.js
const dayMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({
  data: {
    futureWeathers: [],
  },
  onLoad() {
    this.SetWeekly()
  },
  onPullDownRefresh() {
    this.SetWeekly(wx.stopPullDownRefresh)
  },
  SetWeekly(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        time: new Date().getTime(),
        city: "广州市"
      },
      success: res => {
        let result = res.data.result
        let futureData = []
        for (let i = 0; i < 7; i++) {
          let day = new Date();
          day.setDate(day.getDate() + i)
          futureData.push({
            day: dayMap[day.getDay()],
            data: `${day.getFullYear()}- ${day.getMonth() + 1}- ${day.getDate()}`,
            weatherIcon: '/images/' + result[i].weather + '-icon.png',
            tempRange: `${result[i].minTemp}°-${result[i].maxTemp}°`,
          })
        }
        futureData[0].day = '今日'
        this.setData({
          futureWeathers: futureData
        })
      },
      complete: ()=>{
        callback && callback()
      }
    })
  }
})