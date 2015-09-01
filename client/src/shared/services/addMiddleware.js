import axios from 'axios'

export default function() {
  // console.log('addMiddleware')

  axios.interceptors.request.use(function(config) {
    // config.withCredentials = true

    // config.headers['Access-Control-Allow-Origin'] = null

    return config
  }, function(error) {
    // console.log(error)
    // Do something with request error
    return Promise.reject(error)
  })

}
