const express = require('express')
var main = require('./main')
var app = express()

//setup express server
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	main.home(function(data){
		response.send(data)
	})
})

//start server
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})