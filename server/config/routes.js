module.exports = function(app) {
	var lists = require('../controllers/lists.js');
	// Index
	app.get('/lists', function (req, res) { lists.index(req, res) })
	// Get One List
	.get('/lists/:id', function (req, res) { lists.getOne(req,res) })
	// Create
	.post('/lists', function (req, res) { lists.create(req, res) })	
	// Delete
	.delete('/lists/:id', function (req, res) { lists.destroy(req,res) })
}