/***************************************************************************************************
*
*			Makes requests to external REST APIs and returns the results
*
*/

var pluginName = 'external_api_request';

//Modules
var request = require('request');

/***
*		@EXPORT
*
*		Contains interfaces for making requests to various REST APIs
*/
module.exports = function api_request_SenecaPlugin(options) {

    this.add({role: pluginName, cmd: 'get_ron_quote'}, getRonQuote_cb);
    this.add({role: pluginName, cmd: 'get_translation_to_pirate'}, getTranslationToPirate_cb);

		/***
		*		Request random Ron Swanson quote from Swanson quote REST API
		*
		*		@param msg {Object} EMPTY
		*/
		function getRonQuote_cb(msg, callback) {
			request('http://ron-swanson-quotes.herokuapp.com/quotes', function(err, response, body) {
				if (err) callback(err);
				else callback(null, { msg: body });
			});
		}

		/***
		*		Request translation of text string to pirate from pirate translation REST API
		*
		*		@param msg {Object}
		*				-> requestText {String} text to convert
		*/
		function getTranslationToPirate_cb(msg, callback) {
			var requestIp = 'http://isithackday.com/arrpi.php?text=' + msg.requestText;
			request(requestIp, function(err, response, body) {
				if (err) callback(err);
				else callback(null, { msg: body });
			});
		}
};