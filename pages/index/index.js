const Rank = require('../../service/rank')

Page({
  data: {
    rankList: []
  },
  onLoad: function() {
    // 生命周期函数--监听页面加载
    // 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
    this.getData()
  },
  getData: function() {
    var self = this;
    Rank.getList(function (rankList) {
      console.log(rankList)
      self.setData({ rankList })
    })
  },
  onPullDownRefresh: function() {
    this.getData()
  },
  tapRankItem: function(e) {
    // console.log(e)
    const rankList = this.data.rankList
    const index = e.currentTarget.dataset.index
    rankList[index].open = !rankList[index].open
    this.setData({ rankList })
  },

  onShareAppMessage: function() {
    return {
      title: 'TOP100的前端框架排名',
      path: '/page/index/index',
    }
  }
})