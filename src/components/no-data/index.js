import NoData from './index.tpl'
import './index.scss'
import { compileTemplate } from '../../libs/utils'

export default {
  name: 'NoData',
  tpl (options) {
    return compileTemplate(NoData, options)
  }
}