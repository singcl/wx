const rank = {
  getList: function(cb) {
    const self = this
    function retry() {
      setTimeout(function() {
        self.getList(cb)
      }, 3000)
    }
    wx.request({
      url: 'https://www.awesomes.cn/rank?sort=trend',
      header: {
        'content-type': 'x-www-form-urlencoded; charset=utf8',
        'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4'
      },
      success: function(r) {
        try{
          const data = r.data;
          const matchRes = data.match(/"data":\[\{"repos":(.*?),"sort":"trend"/);
          const repos = JSON.parse(matchRes.pop());
          // console.dir(repos)
          typeof cb === 'function' && cb(
            repos.map(function(item) {
              return {
                id: item.id,
                icon: `https://awesomes.oss-cn-beijing.aliyuncs.com/repo/${item.cover}?x-oss-process=style/subject_repo`,
                name: item.name,
                detail: item.description_cn,
              }
            })
          )
        } catch(err) {
          console.log(err)
          retry()
        }
      },
      fail: retry
    })
  }
}

module.exports = rank