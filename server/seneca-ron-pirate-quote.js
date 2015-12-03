/***************************************************************************************************
*
*			Actual control flow logic for getting a quote from the Ron Swanson quote generator REST
*			API then passing it to a separate external REST API to translate the quote to pirate
*
*			Also calls functions/actions that do some custom pirate translations and some cleaning to
*			format the Ron Swanson quote such that the translate-text-to-pirate API can accept it.
*
*			Displays both the original Ron Swanson quote and the translated-into-pirate version
*
*/

var Promise = require('bluebird');

var catchPromiseError = require('../lib/promise-helpers.js').catchPromiseError;
var promisifySeneca = require('../lib/promisified-seneca');


/***
*		@EXPORT
*
*		Generate the Ron Swanson quote and translated version, and display both
*		in the terminal
*
*		@param seneca {Object} standard seneca object - with all plugins already loaded in
*/
module.exports = function senecaRonPirateQuote(seneca){

	var senecaAsync = promisifySeneca(seneca);

	//
	// Request Ron Swanson quote from external API
	//
	senecaAsync.act({cmd: 'get_ron_quote', role: 'external_api_request'})
		.catch(catchPromiseError('call to get Ron Swanson quote failed with error: '))

		//
		// Parse response to request for Ron Swanson quote & display it, if request successful
		//
		.then(function showRonQuote(ronQuoteApiResponse){
			var ronQuote = JSON.parse(ronQuoteApiResponse.msg).quote;
			console.log('\n\nRANDOM RON SWANSON QUOTE:\n'.green.bold + ronQuote);
			return ronQuote;
		})
		.catch(catchPromiseError('api request failed with error: '))

		//
		// Clean ron swanson quote for sending to pirate API
		//
		.then(function cleanRonQuote(ronQuote){
			return senecaAsync.act({
				role: 'transform_restapi_request_text',
				cmd: 'escape_ron_quote',
				ronQuote: ronQuote
			});
		})
		.catch(catchPromiseError('cleaning ron swanson quote failed with error: '))

		//
		// Convert Ron Swanson quote to piratespeak (ask the pirate API)
		//
		.then(function callPirateAPIWithRonQuote(msg){
			return senecaAsync.act({
				cmd: 'get_translation_to_pirate',
				role: 'external_api_request',
				requestText: msg.ronQuote
			})
		})
		.catch(catchPromiseError('api request for pirate translation failed with error: '))

		//
		// Display response to RESTAPI request for translation to pirate, if successful
		//
		.then(function displayQuoteInPirate(ronSwansonPirateQuote){
			console.log('\nTRANSLATED TO PIRATE: \n'.blue.bold + ronSwansonPirateQuote.msg + '\n');
			return ronSwansonPirateQuote;
		})
		.catch(catchPromiseError('api request for pirate translation failed with error: '));
}