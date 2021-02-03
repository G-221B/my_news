import Follow from './index.tpl'
import './index.scss'
import { compileTemplate } from '../../libs/utils'

export default {
  name: 'Follow',
  // 已经收藏
  follow () {
    return compileTemplate(Follow, {
      star: 'star'
    })
  },
  // 没收藏
  unFollow () {
    return compileTemplate(Follow, {
      star: 'star-o'
    })
  },
  // 绑定事件函数
  bindEvent (doFollow) {
    const oFollow = document.querySelector('.follow')
    oFollow.addEventListener('click', this._setFollowStatus.bind(this, oFollow, doFollow), false)
  },
  _setFollowStatus (oFollow, doFollow) {
    const classNames = oFollow.className
    oFollow.className = 'follow iconfont icon-'
    switch (classNames) {
      case 'follow iconfont icon-star':
        oFollow.className += 'star-o'
        doFollow(false)
        break;
      case 'follow iconfont icon-star-o':
        oFollow.className += 'star'
        doFollow(true)
        break;
      default:
        break;
    }
  }
}