import tpl from './index.tpl'
import './index.scss'
import { compileTemplate } from '../../libs/utils'

export default {
  name: 'LoadMore',
  _tpl (el, loading) {
    el.innerHTML += compileTemplate(tpl, {
      text: loading ? '正在努力加载中' : '已经到底了',
      loading: loading ? 'loadingMore' : ''
    })

  },
  add (oList, loading) {
    const oLoadMore = document.querySelector('.loadMore')
    oLoadMore && oLoadMore.remove()
    return this._tpl(oList, loading)
  },
  remove () {
    const oLoadMore = document.querySelector('.loadMore')
    oLoadMore && oLoadMore.remove()
  }
}