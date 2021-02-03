import { BASE_URL } from '../config';

const doAjax = Symbol('doAjax');

class HTTP {
  [doAjax] (options) {
    let xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('microsoft.XMLHTTP');
    if (!xhr) {
      throw new Error('您的浏览器不支持ajax请求');
    }
    let opt = options || {};
    let type = (opt.type || 'GET').toUpperCase();
    let async = '' + opt.async === 'false' ? false : true;
    let dataType = opt.dataType || 'JSON';
    let jsonp = opt.jsonp || 'cb';
    let jsonpCallback =
      opt.jsonpCallback || 'JQuery' + randomNum() + '_' + new Date().getTime();
    let url = BASE_URL + opt.url;
    let data = opt.data || null;
    let timeout = opt.timeout || 30000;
    let error = opt.error || function () { };
    let success = opt.success || function () { };
    let complete = opt.complete || function () { };
    let t = null;

    if (!url) {
      throw new Error('你没有填写URL');
    }
    if (dataType.toUpperCase() === 'JSONP' && type !== 'GET') {
      throw new Error('你选择JSONP请求，请求把请求类型改成GET或者省略不写');
    }
    if (dataType.toUpperCase() === 'JSONP') {
      const oBody = document.body;
      const script = document.createElement('script');
      script.src =
        url.indexOf('?') === -1
          ? url + '?' + jsonp + '=' + jsonpCallback
          : url + '&' + jsonp + '=' + jsonpCallback;
      oBody.appendChild(script);
      oBody.removeChild(script);
      window[jsonpCallback] = function (res) {
        success(res);
      };
      return;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          switch (dataType) {
            case 'JSON':
              success(JSON.parse(xhr.responseText));
              break;
            case 'TExT':
              success(xhr.responseText);
              break;
            case 'XML':
              success(xhr.responseXML);
              break;
            default:
              success(JSON.parse(xhr.responseText));
          }
        } else {
          error();
        }
        complete();
        clearTimeout(t);
        t = null;
        xhr = null;
      }
    };

    xhr.open(type, url, async);
    type === 'POST'
      ? xhr.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
      : '';
    xhr.send(type === 'POST' ? fomatData(data) : null);
    t = setTimeout(() => {
      xhr.abort();
      xhr = null;
      complete();
      t = null;
      error('请求超时');
    }, timeout);
  }
  ajax (options) {
    this[doAjax](options);
  }
  get () { }
  post () { }
}
function fomatData (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return '';
  }
  let str = '';
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      str += `${key}=${obj[key]}&`;
    }
  }
  return str.replace(/\&$/, '');
}
function randomNum () {
  var num = '';
  for (var i = 0; i < 20; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

export default HTTP;
