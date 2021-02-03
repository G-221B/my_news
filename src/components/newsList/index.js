// 组件
import tpl0 from './tpl/tpl.tpl'  // 没有图片的新闻
import tpl1 from './tpl/tpl1.tpl' // 有一张图片的新闻
import tpl2 from './tpl/tpl2.tpl' // 有两张图片的新闻
import tpl3 from './tpl/tpl3.tpl' // 有三张图片的新闻模板
import WrapperList from './tpl/wrapperList.tpl' // 新闻列表容器

// 工具函数
import { compileTemplate, getItemNode } from '../../libs/utils'
import './index.scss'

export default {
  name: 'NewList',
  // 编译新闻列表容器的模板
  WrapperTpl (top) {
    return compileTemplate(WrapperList, {
      top
    })
  },
  tpl (options) {
    const { data, pageNum } = options
    let tpl = ''
    let res = '';
    data[pageNum].map((item, index) => {
      const { title, author_name, category, date, thumbnail_pic_s, thumbnail_pic_s02, thumbnail_pic_s03, uniquekey, url } = item

      // 根据thumnail_pic_s的属性来判断新闻有多少张图片
      if (!item.thumbnail_pic_s) {
        tpl = tpl0
      } else if (thumbnail_pic_s && !thumbnail_pic_s02) {
        tpl = tpl1
      } else if (thumbnail_pic_s02 && !thumbnail_pic_s03) {
        tpl = tpl2
      } else if (thumbnail_pic_s02 && thumbnail_pic_s03) {
        tpl = tpl3
      }

      // 编译完item项之后，存到res中
      res += compileTemplate(tpl, {
        author_name,
        category,
        date,
        title,
        thumbnail_pic_s,
        thumbnail_pic_s03,
        thumbnail_pic_s02,
        uniquekey,
        url,
        pageNum,
        index
      })
    })
    return res
  },
  // 然img显示有淡入效果
  imgShow () {
    const imgs = document.querySelectorAll('img')
      ;[...imgs].map(item => {
        item.onload = () => {
          item.style.opacity = '1'
        }
      })
  },
  // 绑定事件函数
  bindEvent (oList, setCurrentNew) {
    oList.addEventListener('click', this._goDetail.bind(this, setCurrentNew), false)
  },
  _goDetail (setCurrentNew) {
    const e = arguments[1]
    const tar = getItemNode(e.target)
    const options = {
      pageNum: tar.dataset.pagenum,
      index: tar.dataset.index
    }
    setCurrentNew(options)
    window.location.href = 'detail.html?path=' + window.location.pathname
  }
}