var app = getApp();

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post(url, data, succes, fail) {
  
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      succes(res.data);
    },
    fail: function (res) {
      wx.showToast({
        title: '服务器异常',
      })
      console.log(res)
      // wx.showModal({
      //   title: '错误',
      //   content: '程序异常，请联系管理员。',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
    }
  });
}
function _post_json(url, data, success, fail) {
  // app.getToken(function (token) {
  //   data.token = token;
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res.data);
    },
    fail: function (res) {
      fail(res);
    }
  });
  // })
}

module.exports = {
  
  post: _post,
  post_json: _post_json
  
}