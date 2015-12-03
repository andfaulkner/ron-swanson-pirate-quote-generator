/***************************************************************************************************
*
*			Entry point for app. Initializes Seneca, loads Seneca plugins, launches Ron Swanson
*			pirate quote generator
*
*/

// NODE SETUP: ERROR HANDLING, BASE MODULES
(function(){
	Error.stackTraceLimit = Infinity;
	require('trace');
	require('clarify')
});

// npm & NodeJS Modules
var _ = require('lodash');
var Promise = require('bluebird');
var util = require('util');
var colors = require('colors');

// App modules
var catchPromiseError = require('./lib/promise-helpers.js').catchPromiseError;

// Seneca setup - construct Seneca object, load plugins
var seneca = require('seneca')()
	.use('./seneca_actions/external_api_request')
	.use('./seneca_actions/transform_restapi_request_text')

// get promisified form of promise-compatible Seneca functions
var senecaAsync = require('./lib/promisified-seneca')(seneca);

//
// Launch the Ron-Swanson-as-a-pirate quote generator
//

var launchRonPirateQuote = require('./server/seneca-ron-pirate-quote.js');
launchRonPirateQuote(seneca);

//
// Run when Seneca is ready.
//

senecaAsync.ready()
	.then(function(){
		console.log('seneca ready!');
	})
	.catch(function(err){
		console.log('seneca prep fail :(');
	});

//
// TEST - Save random entity using promisified Seneca function
//

var senecaCaseEntity = seneca.make$('sys/case', {a:1});

senecaAsync.entitySave(senecaCaseEntity)
	.then(function(ret){
		console.log('seneca save success!');
		console.log(ret);
	})
	.catch(function(err){
		console.log('save fail :(');
	})