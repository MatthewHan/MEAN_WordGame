app.controller('GamesController', [ 'GamesFactory', 'ListsFactory', '$timeout', '$routeParams',function(GamesFactory, ListsFactory, $timeout, $routeParams){
	that = this;
	console.log('in game ctrller');
	this.listId = $routeParams.gameId;
	console.log(this.listId);
	this.list = [];
	this.word = '';
	this.timer;
	this.resetTimer;
	var getList = function(listId){
		ListsFactory.getList(function(list){

		})
	}
	// var getWord = function(){
	// 	//console.log(that.list);
	// 	if(that.list.length>0){
	// 		that.word = that.list[Math.floor(Math.random()*that.list.length)].word;
	// 		that.timer = that.resetTimer;
	// 		that.lowerTimer();
	// 	} else {
	// 		that.word = 'Game Completed!';
	// 		$timeout.cancel(myTimer);
	// 	}
		
	// 	console.log(that.word);
	// }
	// this.removeWord = function(index){
	// 	this.list.list.splice(index, 1);
	// 	console.log(this.list);
	// }
	// this.checkAnswer = function(answer){
	// 	console.log(answer);
	// 	for(i=0;i<this.list.length;i++){
	// 		if(this.list[i].word == this.word){
	// 			if(isInArray(answer, this.list[i].answer)){
	// 				console.log('answer correct');
	// 				this.removeWord(i);
	// 				this.answer = '';
	// 				$timeout.cancel(myTimer);
	// 				that.timer = this.resetTimer;
	// 				getWord();
	// 			}
	// 		}
	// 	}
	// }
	// this.setTimer = function(timer){
	// 	console.log('time set');
	// 	that.timer = timer;
	// 	that.resetTimer = timer;
	// 	getWord();
	// }
	// this.lowerTimer = function(){
	// 	myTimer = $timeout(function(){
	// 		that.timer--;
	// 		if(that.timer <= 0) that.word = 'You Have Lost Please Try Again';
	// 		else that.lowerTimer();
	// 	},1000)
	// }
	// this.skip = function(){
	// 	if(that.list.length >= 2){
	// 		var tempList = angular.copy(this.list);
	// 		$timeout.cancel(myTimer);
	// 		for(i=0;i<tempList.length;i++){
	// 			if(tempList[i].word == this.word){
	// 				tempList.splice(i, 1);
	// 				console.log('check real list', that.list);
	// 				that.word = tempList[Math.floor(Math.random()*tempList.length)].word;
	// 				that.timer = that.resetTimer;
	// 				that.lowerTimer();
	// 			}
	// 		}
	// 	} else {
	// 		console.log('Cannot Skip');
	// 	}
	// }
	// function isInArray(value, array){
	// 	return array.indexOf(value)> -1;
	// }
	// getList();
}]);

app.controller('ListsController', [ 'ListsFactory','$rootScope', function (ListsFactory, $rootScope){
	that = this;
	this.show;
	this.auth = $rootScope.auth;
	this.lists = [];
	this.newList = {};
	this.errors = [];
	this.newList.items = [{id: '1', question: null, answer: null},{id: '2', question: null, answer: null},{id: '3', question: null, answer: null}];
	this.newList.isDefault = false;
	this.addNewItem = function(){
		var newNumber = that.newList.items.length+1;
		that.newList.items.push({id:newNumber, question: null, answer: null});
	}
	this.addList = function(newList){
		that.errors = [];
		for(i=0;i<newList.items.length;i++){
			if(!newList.items[i].question && !newList.items[i].answer){
				newList.items.splice(i,1);
				i--;
			}
		}
		if(newList.items.length < 3){
			for(i=0;newList.items.length < 3; i++){
				that.addNewItem();
			}
			that.errors.push('Must have at least 3 question-answer pairs');
		} else {
			if(!newList.title || !newList.tags){
				that.errors.push('Title and at least one tag are required');
			} else {
				ListsFactory.addList(newList, function(res){
					if(res.status == false) {that.errors.push(res.error)};
				})
				that.newList = {};
				this.newList.creator = this.auth.profile.nickname;
				this.newList.creatorId = this.auth.profile.user_id;
				this.newList.items = [{id: '1', question: null, answer: null},{id: '2', question: null, answer: null},{id: '3', question: null, answer: null}];
				this.newList.isDefault = false;
			}
		}
	}
	var getLists = function(){
		ListsFactory.getLists(function(lists){
			that.lists = lists;
		})
	}
	getLists();
}]);

app.controller('LoginController', ['$rootScope','$http', 'auth', 'store', '$location', function ($rootScope, $http, auth, store, $location) {
  	that = this;
  	$rootScope.auth = auth;
  	this.auth = $rootScope.auth;
  	this.login = function () {
    	auth.signin({}, function (profile, token) {
      		// Success callback
      		store.set('profile', profile);
      		store.set('token', token);
      		$location.path('/');
    	}, function () {
      	// Error callback
    	});
	}
	this.logout = function() {
	  	auth.signout();
	  	store.remove('profile');
	  	store.remove('token');
	}
}]);

