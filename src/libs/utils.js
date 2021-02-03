// 编译模板函数
export function compileTemplate (template, templateObj) {
  return template().replace(/\{\{(.+?)\}\}/g, (node, key) => {
    return templateObj[key.trim()]
  })
}
// 跳到顶部
export function scrollToTop () {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
}

// 格式化数据
export function setPageData (data, count) {
  const len = data.length
  let index = 0
  const pageData = []
  while (index < len) {
    pageData.push(data.slice(index, index += count))
  }
  return pageData
}

// 触底触发callback
export function touchBottom (callback) {
  const scrollTop = _getScrollTop();
  const scrollHeight = _getScrollHeight();
  const windowHeight = _getWindowHeight()
  if (scrollTop + windowHeight >= scrollHeight - 1) {
    callback()
  }
}

// 获取node
export function getItemNode (target) {
  while (target = target.parentNode) {
    if (target.className.split(' ')[0] === 'news-item') {
      return target
    }
  }
}

export function getQueryByKey (key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const res = window.location.search.substr(1).match(reg);

  return res !== null ? decodeURIComponent(res[2]) : null;
}

/***************内部方法*************/
function _getScrollTop () {
  let scrollTop = 0, bodyScrollTop = 0, ElementScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop
  }
  if (document.documentElement) {
    ElementScrollTop = document.documentElement.scrollTop
  }
  scrollTop = bodyScrollTop - ElementScrollTop > 0 ? bodyScrollTop : ElementScrollTop;
  return Math.floor(scrollTop)
}
function _getScrollHeight () {
  let scrollHeight = 0, bodyScrollHeight = 0, ElementScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight
  }
  if (document.documentElement) {
    ElementScrollHeight = document.documentElement.scrollHeight
  }
  scrollHeight = bodyScrollHeight - ElementScrollHeight > 0 ? bodyScrollHeight : ElementScrollHeight;
  return Math.floor(scrollHeight);
}
function _getWindowHeight () {
  let windowHeight = 0, bodyHeight = 0, ElementHeight = 0;
  if (document.body) {
    bodyHeight = document.body.clientHeight
  }
  if (document.documentElement) {
    ElementHeight = document.documentElement.clientHeight
  }
  windowHeight = bodyHeight - ElementHeight > 0 ? bodyHeight : ElementHeight;
  return Math.floor(windowHeight)
}