import Iframe from './index.tpl'
import './index.scss'
import { compileTemplate } from '../../libs/utils'

export default {
  name: 'Iframe',
  tpl (options) {
    return compileTemplate(Iframe, options)
  }
}