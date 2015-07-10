var express = require('express');
var jwt = require('express-jwt');
var app = express();
app.listen(8000, function(){
	console.log("server running on port 8000");
});
var jwtCheck = jwt({
  	secret: new Buffer('O0lZnvQ6gGTT7Pt2GEQ42qmrdAG0cvK-EsG9rkmcx8idSBqYoc9Ifn116cmkQPBD', 'base64'),
  	audience: 'U7NNhPBwTTg7oe4nvYkqcMhHQ2ryGzsS'
});
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json())
app.use(express.static(__dirname + "/client"))
//Mongoose
require('./server/config/mongoose.js');
//HTTP Routes
require('./server/config/routes.js')(app);

