var osmosis = require('osmosis')
const flow = require('./lib/flow')

var App={
	exchanges:[],
	requires:{}
}

//loads exchanges ja files
var normalizedPath = require("path").join(__dirname, "exchanges");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  App.requires[file.split('.').shift()] = require("./exchanges/" + file);
});

//creates instance of each exchange into array
Object.keys(App.requires).forEach(function(key) {
	var exchange = App.requires[key]
	App.exchanges.push(exchange)
})

console.log(App)

var self = this

exports.home = function (callback){
	//async execute same function for all items in array
	flow.serialForEach(App.exchanges, function(val){
			console.log('-> flow',val)
			val.fetch(this)
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