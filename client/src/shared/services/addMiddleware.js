import axios from 'axios'
// import getCsrfToken from './getCsrfToken'
// import getAuthToken from './sessions/getAuthToken'

export default function() {
	// console.log('addMiddleware');

	axios.interceptors.request.use(function(config) {
		// console.log('middleware');

		// Do something before request is sent
		// const csrfToken = getCsrfToken()
		// const authToken = getAuthToken()
		// config.headers = config.headers || {}
		// config.headers['X-CSRF-Token'] = csrfToken
		// config.headers['auth-token']   = authToken
		config.withCredentials = true

		return config;
	}, function(error) {
		// console.log(error)
		// Do something with request error
		return Promise.reject(error);
	});

}
