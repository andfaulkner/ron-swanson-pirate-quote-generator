/***************************************************************************************************
*
*			Provides promisified versions of compatible seneca api components.
*
*			Only wraps Seneca modules that return callbacks
*			seneca.add was explicitly excluded because it's intended to be synchronous.
*
*/

var Promise = require('bluebird');

/***
*		@EXPORTS
*
*		@param seneca {Object} fully initialized seneca object
*/
module.exports = function promisifySeneca(seneca) {

	//@EXPORT
	var senecaAsync = {
		/***
		*		Promisified version of seneca.act (uses .then and .catch instead of a callback)
		*/
		act: function senecaAsyncAct(pattern) {
			return new Promise(function(resolve, reject) {
				seneca.act(pattern, function(err, args) {
					if (err) return reject(err);
					else return resolve(args);
				});
			});
		},
		/***
		*		Promisified version of seneca.ready (uses .then and .catch instead of a callback)
		*/
		ready: function senecaAsyncReady() {
			return new Promise(function(resolve, reject) {
				seneca.ready(function(err) {
					if (err) return reject(err);
					else return resolve();
				});
			});
		},
		/***
		*		Promisified version of seneca.save$ (uses .then and .catch instead of a callback)
		*/
		entitySave: function senecaAsyncEntitySave(entity) {
			return new Promise(function(resolve, reject) {
				entity.save$(function(err, dataObj) {
					if (err) return reject(err);
					else return resolve(dataObj);
				});
			});
		},
		/***
		*		Promisified version of seneca.load$ (uses .then and .catch instead of a callback)
		*/
		entityLoad: function senecaAsyncEntityLoad(entityIdOrMatchPattern) {
			return new Promise(function(resolve, reject) {
				entity.load$(function(err, entityData) {
					if (err) return reject(err);
					else return resolve(entityData);
				});
			});
		},
		/***
		*		Promisified version of seneca.list$ (uses .then and .catch instead of a callback)
		*/
		entityList: function senecaAsyncEntityList(entityMatchPattern) {
			return new Promise(function(resolve, reject) {
				entity.list$(function(err, entityDataList) {
					if (err) return reject(err);
					else return resolve(entityDataList);
				});
			});
		},
		/***
		*		Promisified version of seneca.remove$ (uses .then and .catch instead of a callback)
		*/
		entityRemove: function senecaAsyncEntityRemove(entityMatchPattern) {
			return new Promise(function(resolve, reject) {
				entity.remove$(function(err) {
					if (err) return reject(err);
					else return resolve();
				});
			});
		}
	};

	return senecaAsync;
};