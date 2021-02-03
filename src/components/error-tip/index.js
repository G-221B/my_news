import ErrorTip from './index.tpl'
import './index.scss'
import { compileTemplate } from '../../libs/utils'

export default {
  name: 'ErrorTip',
  tpl (options) {
    return compileTemplate(ErrorTip, options)
  }
}