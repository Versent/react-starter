import _            from 'lodash';
import reduxCrud    from 'redux-crud';
import axios        from 'axios';
import getApi       from '../shared/services/getApi'
import bows         from 'bows'

const baseActionCreators = reduxCrud.actionCreatorsFor('languages');
const host = getApi()
const log  = bows('languages--actions')

let actionCreators = {

	fetch() {
		return function(dispatch) {
			const action = baseActionCreators.fetchStart();
			dispatch(action);

			// send the request
			const url = host + '/languages';
			const promise = axios({
				url: url
			});

			promise.then(function(response) {
					// dispatch the success action
					const languages = response.data.data;
					const successAction = baseActionCreators.fetchSuccess(languages);
					dispatch(successAction);
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

};

actionCreators = _.extend(actionCreators, baseActionCreators);

export default actionCreators;
