/**************************************************************************************************
*
*			Convenience functions for dealing with promise-based control flow
*			E.g. error handling
*
*/

var _ = require('lodash');

var promiseHelpers = {

	/***
	*		Generic error handler function for use in promises' .catch functions.
	*		Pass a single message item for display with the error object. The
	*		currying ensures the error object reaches the err parameter.
	*
	*		@param msg {String} custom error message to show
	*		@param err {Error} error object caused by promise catch
	*/
	catchPromiseError: _.curry(function catchPromiseErrBase(msg, err){
		if (_.isError(msg)) {
			err = msg;
		//Only display a message if one was given; allows this to work with no args
		} else {
			console.log('\n\n' + _.capitalize(msg).red.bgBlack.bold);
		}
		console.log(util.inspect(err, {colors:true, depth: 20}) + '\n\n');
		throw err;
		return err;
	})
}

module.exports = promiseHelpers;