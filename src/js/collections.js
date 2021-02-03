import './imports.js';

// 组件
import Header from '../components/header';
import NewsList from '../components/newsList'
import NoData from '../components/no-data'
  ; (function (doc) {
    const oApp = doc.querySelector('#app')
    const followedList = JSON.parse(window.localStorage.getItem('followNews') || '[]')
    let oListWrapper = null

    // 初始化
    function init () {
      render()
      bindEvent()
    }
    // 绑定事件
    function bindEvent () {
      followedList.length && NewsList.bindEvent(oListWrapper, setCurrentNew)
    }
    // 渲染
    function render () {
      oApp.innerHTML += Header.tpl({
        url: '/',
        showLeftIcon: true,
        showRightIcon: false,
        title: '我的收藏'
      })
      if (followedList.length) { // 没有收藏，显示还没收藏
        const listWrapper = NewsList.WrapperTpl(4.4)
        oApp.innerHTML += listWrapper
        oListWrapper = document.querySelector('.news-wrapper')
        renderNewList()
      } else { // 存在收藏，渲染新闻列表
        const noData = NoData.tpl({ text: '你还没收藏新闻' })
        oApp.innerHTML += noData
      }
    }

    // 渲染新闻列表
    function renderNewList () {
      oListWrapper.innerHTML += NewsList.tpl({
        data: [followedList],
        pageNum: 0,
      })
      NewsList.imgShow()
    }

    // localStorage存储点击的新闻项
    function setCurrentNew (options) {
      window.localStorage.setItem('currentNew', JSON.stringify(followedList[options.index]))
    }
    init();
  })(document)