//index.js
//获取应用实例
const app = getApp()
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}
Page({
  data: {
    nowTemp: 'NoKnow',
    nowWeather: 'NoKnow',
    nowWeatherBG: '/images/sunny-bg.png',
    forcast: [],
    todayDate: '',
    weatherSummary:''
  },
  GetWeatherNow(callback) {
    console.log("Hello World");
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        let result = res.data.result
        this.SetNow(result)
        this.SetToday(result)
        this.SetForecast(result)
      },
      complete: () => {
        callback && callback();
      }
    })
  },
  onLoad() {
    this.GetWeatherNow();
  },
  onPullDownRefresh() {
    this.GetWeatherNow(wx.stopPullDownRefresh);
  },
  SetNow(result) {
    let temp = result.now.temp
    let maxTemp = result.today.maxTemp
    let minTemp = result.today.minTemp
    let weather = result.now.weather
    this.setData({
      nowTemp: temp,
      nowWeather: weatherMap[weather],
      nowWeatherBG: '/images/' + weather + '-bg.png',
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    });
  },
  SetToday(result)
  {
    let date = new Date();
    this.setData({
      todayDate: `今日 ${date.getFullYear()}- ${date.getMonth() + 1}- ${date.getDate()}`,
      weatherSummary: `${result.today.minTemp}℃ - ${result.today.maxTemp}℃`
    });
  },
  SetForecast(result) {
    let resultForeCast = result.forecast
    let forecast = []
    let nowHour = new Date().getHours()
    for (let i = 0; i < 8; i++) {
      forecast.push({
        time: (i * 3 + nowHour) % 24 + "时",
        iconPath: '/images/' + resultForeCast[i].weather + '-icon.png',
        temp: resultForeCast[i].temp + "°"
      })
    }
    forecast[0].time = '现在'
    this.setData({
      forecast: forecast
    })

  },
  onTapWeatherSummary()
  {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})