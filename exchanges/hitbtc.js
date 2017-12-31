var osmosis = require('osmosis')
var settings={
	url:"https://api.hitbtc.com/api/2/public/currency",
	// lastUpdate:Date.now(),
	// config:{'concurrency':3},
	symbolList:[],
	result:null
}
var self = this

exports.name='hitbtc',

exports.fetch = function (callback){
	
	console.log('-> Fetch hitbtc Symbols');

	var st = new osmosis
		.get(settings.url)
		// .config(settings.config)
		.find('p')
		.set('json')
		.log(console.log)
		.error(console.log)
		.then(function(context, data) {
			settings.result = JSON.parse(data.json)
		})
		.done(function(data) {
			console.log('-> hitbtc fetch finished')
			callback(settings.result)
		});	
	st.run();
		
},

exports.pairs = function(){
	var pairs={}
	for (var i = 0, len = settings.result.length; i < len; i++) {
 		pairs[settings.result[i].id]=settings.result[i].fullName
	}
	return pairs
},

exports.pairs_length = function(){
	var ln=0
	Object.keys(settings.result).forEach(function(key) {
		++ln
	})
	return ln
}