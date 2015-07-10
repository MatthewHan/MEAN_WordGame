var List = mongoose.model('List');
module.exports = (function(){
	return {
		index: function(req, res){
			List.find({}, function (err, lists){
				if(err){
					res.json([{name: "Updating, come back later"}]);
				} else {
					res.json(lists);
				}
			})
		},
		getOne: function(req, res){
			console.log('Server/Ctrl/List/GetOne');
			console.log(req.params);
			List.findOne({_id:req.params.id}, function(err, list){
				if(err)
					res.json({status:false});
				else
					res.json(list);
			})
		},
		create: function(req, res){
			var list = new List;
			list.list = req.body.items;
			list.creator = req.body.creator;
			list.isDefault = req.body.isDefault;
			list.creatorId = req.body.creatorId;
			list.title = req.body.title;
			list.description = req.body.description;
			list.tags = req.body.tags.split(',');
			for(i=0;i<list.list.length;i++){
				list.list[i].answer = list.list[i].answer.split(',');
				console.log(list.list[i].answer);
			}
			console.log(list);
			list.save(function(err){
				if(err){
					console.log('dammit', err);
					res.json({status: false});
				} else {
					res.json({status: true});
				}
			})
			// customer.name = req.body.name;
			// customer.save(function(err){
			// 	if(err){
			// 		//console.log(err);
			// 		res.json({status:false, error:'Name is Required & must be Unique'});
			// 	} else {
			// 		res.json({status:true});
			// 	}
			// })
		},
		destroy: function(req, res){
			List.remove({_id:req.params.id}, function(err){
				if(err){
					res.json({status:false});
				} else {
					res.json({status:true});
				}
			})
		}
	}
})();