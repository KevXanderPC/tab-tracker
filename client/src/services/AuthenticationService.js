import Api from '@/services/Api'
export default {
  register (credentials) {
    return Api().post('register', credentials)
  }// eslint-disable-next-line
}
// zxczx