var osmosis = require('osmosis')
var settings={
	url:"https://api.binance.com/api/v1/ticker/24hr",
	// lastUpdate:Date.now(),
	// config:{'concurrency':3},
	symbolList:[],
	result:null
}
var self = this

exports.name='binance',

exports.fetch = function (callback){
	
	console.log('-> Fetch Binance Symbols');

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
			console.log('-> Binance fetch finished')
			callback(settings.result)
		});	
	st.run();
		
},

exports.pairs = function(){
	var pairs={}
	for (var i = 0, len = settings.result.length; i < len; i++) {
 		if (parseInt(settings.result[i].volume)>0) pairs[settings.result[i].symbol]=settings.result[i].volume
	}
	return pairs
},

exports.pairs_length = function(){
	var ln=0
	Object.keys(settings.result).forEach(function(key) {
		if (parseInt(settings.result[key].volume)>0) ++ln
	})
	return ln
}