function getPrice(e) {
    wx.request({
      url: 'https://huiyan.info/miniApp/pricing.php',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        //console.log(res.data);
        var toSet = {};
        var ex = 0, prev = 0, bgc = '';
        var red = '-webkit-linear-gradient(left, rgba(255,74,104,0), rgba(255,74,104,0.2))';
        var green = '-webkit-linear-gradient(left, rgba(60,188,152,0), rgba(60,188,152,0.2))';
        e.data.curInit.map(function(x,i) {
          ex = Number(res.data.data[x.curName.toLowerCase()+'cnh'].Ask).toFixed(4);
          prev = Number(e.data.curInit[i].exRate);
          if(ex > prev) {
            bgc = green;
          } else if(ex < prev) {
            bgc = red;
          }
          toSet['curInit['+i+'].curEquiv'] = Number(Number(e.data.inputValue) / ex).toFixed(4);
          toSet['curInit['+i+'].exRate'] = ex;
          toSet['curInit['+i+'].cellBackgroundColor'] = bgc;
          return;
        })
        e.setData(toSet);
      },
      fail: function() {
        console.log('sth went wrong');
      },
      complete: function() {
        //complete
      }
    })
}

module.exports = {
    getPrice : getPrice
}