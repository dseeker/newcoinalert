var osmosis = require('osmosis')
var settings={
	url:"https://yobit.net/api/3/info",
	// lastUpdate:Date.now(),
	// config:{'concurrency':3},
	symbolList:[],
	result:null
}
var self = this

exports.name='yobit',

exports.fetch = function (callback){
	
	console.log('-> Fetch Yobit Symbols');

	var st = new osmosis
		.get(settings.url)
		// .config(settings.config)
		.find('p')
		.set('json')
		.log(console.log)
		.error(console.log)
		.then(function(context, data) {
			settings.result = JSON.parse(data.json).pairs;
		})
		.done(function(data) {
			console.log('-> Yobit fetch finished');
			callback(settings.result);
		});	
	st.run();
		
},

exports.pairs = function(){
	var pairs={}
	Object.keys(settings.result).forEach(function(key) {
  		// var val = settings.result[key]
  		pairs[key]=true
	});
	return pairs
},

exports.pairs_length = function(){
	var ln=0
	Object.keys(settings.result).forEach(function(key) {
		++ln
	})
	return ln
}