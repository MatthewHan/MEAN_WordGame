app.factory('GamesFactory', function($http){
	return {
		getList: function(callback){
			console.log('GamesFactory GetList')
		}
	}
});
app.factory('ListsFactory', function($http){
	return {
		addList: function(newList, callback){
			$http.post('/lists', newList).success(function(res){
				callback(res);
			})
		},
		getLists: function(callback){
			$http.get('/lists').success(function(res){
				callback(res);
			})
		}
	}
});
