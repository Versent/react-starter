import _            from 'lodash';
import reduxCrud    from 'redux-crud';
import axios        from 'axios';
import getApi       from '../shared/services/getApi'
import bows         from 'bows'

const baseActionCreators = reduxCrud.actionCreatorsFor('users');
const host = getApi()
const log  = bows('users.actions')

let actionCreators = {

	fetch() {
		return function(dispatch) {
			const action = baseActionCreators.fetchStart();
			dispatch(action);

			// send the request
			const url = host + '/v1/users';
			const promise = axios({
				url: url,
				method: 'GET'
			});

			promise.then(function(response) {
					// dispatch the success action
					const users = response.data.data;
					const successAction = baseActionCreators.fetchSuccess(users);
					dispatch(successAction);
				}, function(response) {
					log(response)
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.fetchError(response);
					dispatch(errorAction);
				}).catch(function(err) {
					console.error(err.toString());
				});

			return promise;
		};
	}

	// delete(service) {
	// 	return function(dispatch) {
	// 		const optimisticAction = baseActionCreators.deleteStart(service);
	// 		dispatch(optimisticAction);

	// 		const url = `/api/v1/services/${service.id}`;
	// 		const promise = axios({
	// 			url: url,
	// 			method: 'DELETE',
	// 		});

	// 		promise.then(function(response) {
	// 				// dispatch the success action
	// 				const successAction = baseActionCreators.deleteSuccess(service);
	// 				dispatch(successAction);
	// 			}, function(response) {
	// 				// rejection
	// 				// dispatch the error action
	// 				const errorAction = baseActionCreators.deleteError(response, service);
	// 				dispatch(errorAction);
	// 			}).catch(function(err) {
	// 				console.error(err.toString());
	// 			});

	// 		return promise;
	// 	};
	// },

};

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators;
