//index.js
//获取应用实例
var app = getApp()
var pricing = require('../../utils/pricing.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    inputValue: '',
    freq : {},
    curInit: [{
      curIcon: '../../image/usd.png',
      curName: 'USD',
      exRate: '',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/eur.png',
      curName: 'EUR',
      exRate: '',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/jpy.png',
      curName: 'JPY',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/gbp.png',
      curName: 'GBP',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/aud.png',
      curName: 'AUD',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/cad.png',
      curName: 'CAD',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/xau.png',
      curName: 'XAU',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/xag.png',
      curName: 'XAG',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/dkk.png',
      curName: 'DKK',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/chf.png',
      curName: 'CHF',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/nok.png',
      curName: 'NOK',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }, {
      curIcon: '../../image/czk.png',
      curName: 'CZK',
      exRate: '1',
      curEquiv: '',
      cellBackgroundColor: ''
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../ohlc/ohlc'
    })
  },
  //handle input
  getAmount: function(e) {
    var that = this;
    var toSet = {};
    var amount = Number(e.detail.value);
    toSet['inputValue'] = amount;
    that.data.curInit.map(function(x,i) {
      toSet['curInit['+i+'].curEquiv'] = Number(amount / Number(x.exRate)).toFixed(4);
      return;
    });
    that.setData(toSet);
  },
  onLoad: function () {
    var that = this;
    console.log('onLoad');
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onHide: function() {
    var that = this;
    clearInterval(that.data.freq);
  },
  onShow: function() {
    var that = this;
    that.setData({
      freq : setInterval(function(){
        pricing.getPrice(that);
      },1000)
    })
  }
})
