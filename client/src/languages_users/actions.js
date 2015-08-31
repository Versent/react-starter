import _            from 'lodash';
import reduxCrud    from 'redux-crud';
import axios        from 'axios';
import getApi       from '../shared/services/getApi'
import request      from '../shared/requests/request'
import bows         from 'bows'

const baseActionCreators = reduxCrud.actionCreatorsFor('languages_users');
const host = getApi()
const log  = bows('languages_users--actions')

let actionCreators = {

	fetch() {
		return function(dispatch) {
			const optimisticAction = baseActionCreators.fetchStart(languageUser);
			dispatch(optimisticAction);

			// send the request
			const id  = '/languages_users'
			const url = host + id
			const ajax = {
				url: url,
			}
			const options = {
				dispatch,
				getState,
			}

			const promise = request(id, ajax, options)

			promise.then(function(response) {
					// dispatch the success action
					const returned = response.data.data;
					const successAction = baseActionCreators.fetchSuccess(returned);
					dispatch(successAction);
				}, function(response) {
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.fetchError(response);
					dispatch(errorAction);
				}).catch(function(err) {
					console.error(err.toString());
				});

			return promise;

		}
	},

	create(languageUser) {
		return function(dispatch) {
			const optimisticAction = baseActionCreators.createStart(languageUser);
			dispatch(optimisticAction);

			const url = host + '/languages_users';
			const promise = axios({
				url: url,
				method: 'POST',
				data: {
					language_user: languageUser
				}
			});

			promise.then(function(response) {
					// dispatch the success action
					const returned = response.data.data;
					const successAction = baseActionCreators.createSuccess(returned);
					dispatch(successAction);
				}, function(response) {
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.createError(response, languageUser);
					dispatch(errorAction);
				}).catch(function(err) {
					console.error(err.toString());
				});

			return promise;

		}
	},


	delete(languageUser) {
		if (languageUser.id == null) throw new Error('Expected languageUser.id')

		return function(dispatch) {
			const optimisticAction = baseActionCreators.deleteStart(languageUser);
			dispatch(optimisticAction);

			const url = `${host}/languages_users/${languageUser.id}`;
			const promise = axios({
				url: url,
				method: 'DELETE',
			});

			promise.then(function(response) {
					// dispatch the success action
					const returned = response.data.data;
					const successAction = baseActionCreators.deleteSuccess(returned);
					dispatch(successAction);
				}, function(response) {
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.deleteError(response, languageUser);
					dispatch(errorAction);
				}).catch(function(err) {
					console.error(err.toString());
				});

			return promise;

		}
	},

}


actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators;
