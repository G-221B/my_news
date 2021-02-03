// 通用
import './imports.js';

// 组件
import Header from '../components/header';
import Iframe from '../components/iframe'
import Follow from '../components/follow'

// 工具函数
import { getQueryByKey } from '../libs/utils.js';
; (function () {
  const oApp = document.querySelector('#app');
  // 读取localStorage中的数据
  const currentNew = JSON.parse(window.localStorage.getItem('currentNew'))
  const followNews = JSON.parse(window.localStorage.getItem('followNews') || '[]')
  // 初始化
  function init () {
    render();
    bindEvent()
  }
  function bindEvent () {
    // 绑定收藏点击事件
    Follow.bindEvent(doFollow)
  }

  // 渲染
  function render () {
    const header = Header.tpl({
      url: getQueryByKey('path') || '/',
      showLeftIcon: true,
      showRightIcon: false,
      title: '新闻详情',
    });
    const iframe = Iframe.tpl({
      url: currentNew.url
    })
    const follow = createFollow()
    oApp.innerHTML += (header + iframe + follow)
  }

  // 根据收藏状态渲染收藏图标
  function createFollow () {
    const flag = followNews.findIndex(item => item.uniquekey === currentNew.uniquekey)
    return flag !== -1 ? Follow.follow() : Follow.unFollow()
  }

  /*** 点击收藏后的回调函数
   * flag：（true: 收藏  false: 取消收藏）
   *   
   */
  function doFollow (flag) {
    let followNews = JSON.parse(window.localStorage.getItem('followNews') || '[]')
    if (flag) {
      followNews.push(currentNew)
    } else {
      followNews = followNews.filter(item => item.uniquekey !== currentNew.uniquekey)
    }
    window.localStorage.setItem('followNews', JSON.stringify(followNews))
  }
  init();
})(document);
