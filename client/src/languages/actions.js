import _            from 'lodash';
import reduxCrud    from 'redux-crud';
import axios        from 'axios';
import getApi       from '../shared/services/getApi'
import request      from '../shared/requests/request'
import bows         from 'bows'

const baseActionCreators = reduxCrud.actionCreatorsFor('languages')
const langsUsersActions  = reduxCrud.actionCreatorsFor('languagesUsers')
const host = getApi()
const log  = bows('languages--actions')

let actionCreators = {

	fetch() {
		return function(dispatch, getState) {
			const action = baseActionCreators.fetchStart()
			dispatch(action)

			// send the request
			const id = '/languages'
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
					const languages = response.data.data
					const successAction = baseActionCreators.fetchSuccess(languages)
					dispatch(successAction)

					// collect languages_users
					// log(response.data.included)
					const languagesUsers = _.filter(response.data.included, function(item) {
						return item.type === 'language_user'
					})

					log('languagesUsers', languagesUsers)
					const actionLangsUsers = langsUsersActions.fetchSuccess(languagesUsers)
					dispatch(actionLangsUsers)

				}, function(response) {
					// log(response)
					// rejection
					// dispatch the error action
					const errorAction = baseActionCreators.fetchError(response);
					dispatch(errorAction);
				}).catch(function(err) {
					console.error(err.toString());
				});

			return promise;
		};
	},

	create(language) {
		return function(dispatch) {
			const optimisticAction = baseActionCreators.createStart(language);
			dispatch(optimisticAction);

			const url = host + '/languages';
			const promise = axios({
				url: url,
				method: 'POST',
				data: {
					language
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
					const errorAction = baseActionCreators.createError(response, language);
					dispatch(errorAction);
				}).catch(function(err) {
					console.error(err.toString());
				});

			return promise;

		}
	},

};

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators;
