import HTTP from '../libs/http'
import { setPageData } from '../libs/utils.js'

class Services extends HTTP {
  getNewList (type, count) {
    return new Promise((resolve, reject) => {
      this.ajax({
        type: 'POST',
        url: 'Juhe/getNewsList',
        dataType: 'JSON',
        data: {
          field: type
        },
        success (res) {
          const data = setPageData(res.result.data, count)
          resolve(data)
        },
        error () {
          resolve(404)
        }
      })
    })
  }
}
export default new Services()