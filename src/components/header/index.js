import Header from './index.tpl';
import './index.scss';
import { compileTemplate } from '../../libs/utils'

export default {
  name: 'Header',
  tpl: function (options) {
    const { showLeftIcon, showRightIcon } = options;
    options.showLeftIcon = showLeftIcon ? 'block' : 'none';
    options.showRightIcon = showRightIcon ? 'block' : 'none';
    return compileTemplate(Header, options)
  },
};
