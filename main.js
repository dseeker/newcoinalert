var osmosis = require('osmosis')
const flow = require('./lib/flow')
var binance = require('./binance')
var yobit = require('./yobit')

var App={
	exchanges:[binance,yobit]
}

var self = this

exports.home = function (callback){
	//async execute same function for all items in array
	flow.serialForEach(App.exchanges, function(val){
			console.log('-> flow',val)
			val.fetch(this)
			// postData '', 'GET', 'delTag='+val.replace(' ', '%20'), @
		},null, function(complete){
			console.log('-> complete')

			callback(self.listAllLength())
			this()
		}
	)
			
},

exports.listAllLength=function(){
	var output=""
	Object.keys(App.exchanges).forEach(function(key) {
		output+=App.exchanges[key].name+": "+App.exchanges[key].pairs_length()+"\n"
	})
	return output
}