app.factory('GamesFactory', function($http){
	return {
		
	}
});
app.factory('ListsFactory', function($http){
	return {
		getList: function(listId, callback){
			console.log('ListsFactory getList');
			$http.get('/lists/'+listId).success(function(res){
				callback(res);
			})
		},
		addList: function(newList, callback){
			$http.post('/lists', newList).success(function(res){
				callback(res);
			})
		},
		getLists: function(callback){
			$http.get('/lists').success(function(res){
				callback(res);
			})
		},
		removeList: function(list, callback){
			$http.delete('/lists/'+list._id).success(function(res){
				callback(res);
			})
		}
	}
});
