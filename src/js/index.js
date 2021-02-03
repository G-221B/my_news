// 导入一下通用的资源
import './imports.js';

// 组件
import Header from '../components/header';
import NavBar from '../components/navBar';
import NewList from '../components/newsList'
import Loading from '../components/loading'
import ErrorTip from '../components/error-tip'
import loadMore from '../components/loadMore';

// 静态数据和一些工具函数
import services from '../services'
import { touchBottom } from '../libs/utils'
import { NEWS_TYPE } from '../data';

// 入口函数
; (function (doc) {
  const oApp = doc.querySelector('#app');
  // 默认配置参数
  const config = {
    type: 'top',
    count: 10,
    pageNum: 0,
    isLoading: true
  }

  // 前端缓存池
  const NewsData = {}
  // 新闻列表的容器
  let oNewsWrapper = null
  let t = null
  // 初始化函数
  async function init () {
    // 渲染
    render();
    config.isLoading = false
    await getNewlist()
    bindEvent();
  }

  // 渲染
  function render () {
    // header组件
    const header = Header.tpl({
      url: '/',
      showLeftIcon: false,
      showRightIcon: true,
      title: '新闻头条',
    })
    // 导航栏组件
    const navBar = NavBar.tpl({
      data: NEWS_TYPE
    })
    // 新闻列表容器
    const newsList = NewList.WrapperTpl(8.2)
    oApp.innerHTML += (header + navBar + newsList);
    // 获取新闻容器
    oNewsWrapper = doc.querySelector('.news-wrapper')
  }
  // 绑定事件
  function bindEvent () {
    // 监听新闻类型改变
    NavBar.bindEvent(setType)
    // 用时间代理的方式监听新闻项的点击
    NewList.bindEvent(oNewsWrapper, setCurrentNew)
    // 监听滚动事件
    window.addEventListener('scroll', touchBottom.bind(null, reachBottom), false)
  }
  // 到底的回调函数
  function reachBottom () {
    const { isLoading, pageNum, type } = config
    if (!isLoading) {
      config.isLoading = true
      // 防止频繁触发reachBottom
      setTimeout(() => {
        config.isLoading = false
      }, 3000)
      if (pageNum >= NewsData[type].length) { // 加载到底了
        loadMore.add(oNewsWrapper, false)
      } else { // 还可以加载
        config.pageNum += 1;
        // 添加加载提示
        loadMore.add(oNewsWrapper, true)
        // 防止重复执行
        clearTimeout(t)
        // 模拟延迟
        t = setTimeout(() => {
          renderNewList(NewsData[type], pageNum)
          loadMore.remove()
        }, 3000)
      }
    }
  }

  // 渲染新闻列表
  function renderNewList (data, pageNum) {
    oNewsWrapper.innerHTML += NewList.tpl({
      data,
      pageNum,
    })
    // 开启图片过渡效果
    NewList.imgShow()
  }

  // 获取新闻列表数据
  async function getNewlist () {
    const { type, count, pageNum } = config
    if (NewsData[type]) { // 已经获取过了的就在缓存池里读取
      oNewsWrapper.innerHTML = ''
      renderNewList(NewsData[type], pageNum, type)
      return;
    }
    // 发送ajax获取
    oNewsWrapper.innerHTML = Loading.tpl()
    let res = await services.getNewList(type, count)
    if (res === 404) {
      // 获取失败，渲染网络错误组件
      oNewsWrapper.innerHTML = renderErrorTip('网络错误')
      return;
    }
    // 获取成功
    NewsData[type] = res
    // 展示加载动画
    setTimeout(() => {
      oNewsWrapper.innerHTML = ''
      renderNewList(NewsData[type], pageNum, type)
    }, 1000)
  }
  // 渲染网络错误组件
  function renderErrorTip (text) {
    oNewsWrapper.innerHTML = ''
    return ErrorTip.tpl({ text })
  }
  // 切换新闻类型
  function setType (type) {
    config.type = type
    config.pageNum = 0
    oNewsWrapper.innerHTML = ''
    clearTimeout(t)
    getNewlist()
  }
  // 将点击的新闻项存进localStorage
  function setCurrentNew (options) {
    const { type } = config
    const currentNew = NewsData[type][options.pageNum][options.index]
    window.localStorage.setItem('currentNew', JSON.stringify(currentNew))
  }
  init();
})(document);
