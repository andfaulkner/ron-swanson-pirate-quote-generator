/***************************************************************************************************
*
*			Basic text processing for REST API requests
*
*/

var pluginName = 'transform_restapi_request_text';

// Pirate equivalents of english words
var mapEnglishToPirate = require('../data/map-english-to-pirate.js');

//Modules
var request = require('request');
var _ = require('lodash');

// Augment local lodash - for usage in chaining
_.mixin({
	/***
	* Adds ability to replace words with pirate equivalents to local (i.e. this module only)
	* instance of lodash, for inclusion in chains
	*
	* @param str {String} text to process - will have regular words replaced with 
	* 		equivalent pirate words
	* @return {String} text with all words replaced with pirate equivalents
	*/
	_replacePirateWords: function _replacePirateWords(str){
		return _.reduce(mapEnglishToPirate, function(translationTextChain, val, key){
			var spaceSurround = new RegExp('\\s' + key + '\\s', 'g');
			var preSpacePostDot = new RegExp('\\s' + key + '\\.', 'g');
			var preSpacePostComma = new RegExp('\\s' + key + ',', 'g');
			var preSpacePostQ = new RegExp('\\s' + key + '\\?', 'g');

			return translationTextChain
				.replace(spaceSurround, ' ' + val + ' ')
				.replace(preSpacePostDot, ' ' + val + '.')
				.replace(preSpacePostComma, ' ' + val + ',')
				.replace(preSpacePostQ, ' ' + val + '?')
		}, _.chain(str)).value();
	}
});


/***
*		@EXPORT
*		
*		@param options {Object} Seneca plugin settings
*/
module.exports = function transform_restapi_request_text_SenecaPlugin(options) {

	//Available Seneca patterns
	this.add({role: pluginName, cmd: 'escape_ron_quote'}, escapeRonQuote_cb);

	/***
	*		Set up Ron Swanson quote returned from API for sending to pirate translator API
	*
	* @param msg {Object}
	*			-> ronQuote {String} ron swanson quote to be escaped
	*/
	function escapeRonQuote_cb(msg, callback){
		var cleanQuote = _.chain(msg.ronQuote)
			.replace(/\’|\‘/g, '\'')
			.replace(/\.\.\./g, '')
			.deburr()
			.replace(/…/g, '...')
			._replacePirateWords()
			.value();
		callback(null, {'ronQuote': cleanQuote});
	}
};
