module.exports = function(app) {
	var lists = require('../controllers/lists.js');
	// Index
	app.get('/lists', function (req, res) { lists.index(req, res) })
	// Create
	.post('/lists', function (req, res) { lists.create(req, res) })	
}