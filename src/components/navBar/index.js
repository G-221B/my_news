import NavList from './tpl/index.tpl';
import NavItem from './tpl/item.tpl';
import { compileTemplate, scrollToTop } from '../../libs/utils';
import './index.scss'

export default {
  name: 'NavBar',
  currentIndex: 0,
  tpl (options) {
    const { data } = options;
    let wrapperList = '';
    // 利用data来循环的创建item模板
    data.map(({ type, title }, index) => {
      wrapperList += compileTemplate(NavItem, { type, title, current: this.currentIndex === index ? 'current' : '' });
    });
    // 编译整个模板
    return compileTemplate(NavList, {
      navList: wrapperList,
      scrollWidth: data.length * 6 + 'rem'
    })
  },
  bindEvent (setType) {
    const oWrapperList = document.querySelector('.wrapperList')
    const items = document.querySelectorAll('.item')
    oWrapperList.addEventListener('click', this._setNav.bind(this, items, setType), false)
  },
  _setNav (items, setType) {
    const tar = arguments[2].target
    const className = tar.className.trim()

    if (className === 'item') {
      let _currentIndex = [].indexOf.call(items, tar)
      const type = items[_currentIndex].dataset.type
      setType(type)
      scrollToTop()
      items[this.currentIndex].className = 'item '
      this.currentIndex = _currentIndex
      items[_currentIndex].className += ' current'
    }
  }
}