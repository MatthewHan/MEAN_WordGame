app.controller('GamesController', [ 'GamesFactory', 'ListsFactory', '$timeout', '$routeParams',function(GamesFactory, ListsFactory, $timeout, $routeParams){
	that = this;
	this.listId = $routeParams.gameId;
	this.list = [];
	this.set = [];
	this.question = '';
	this.timer;
	this.resetTimer;
	var getList = function(listId){
		console.log('GamesController getList');
		console.log('listId', listId);
		ListsFactory.getList(listId, function(list){
			that.list = list;
			that.set = that.list.list;
			console.log(that.list);
		})
	}
	getList(this.listId);
	//Sets random word for both starting the game and skipping words 
	var getWord = function(){
		//console.log(that.list);
		if(that.set.length>0){
			that.question = that.set[Math.floor(Math.random()*that.set.length)].question;
			that.timer = that.resetTimer;
			that.lowerTimer();
		} else {
			that.question = 'Game Completed!';
			$timeout.cancel(myTimer);
		}
		
		console.log(that.question);
	}
	this.removeWord = function(index){
		this.set.splice(index, 1);
		console.log(this.set);
	}
	this.checkAnswer = function(answer){
		console.log(answer);
		for(i=0;i<this.set.length;i++){
			if(this.set[i].question == this.question){
				if(isInArray(answer, this.set[i].answer)){
					console.log('answer correct');
					this.removeWord(i);
					this.answer = '';
					$timeout.cancel(myTimer);
					that.timer = this.resetTimer;
					getWord();
				}
			}
		}
	}
	this.setTimer = function(timer){
		console.log('time set');
		that.timer = timer;
		that.resetTimer = timer;
		getWord();
	}
	this.lowerTimer = function(){
		myTimer = $timeout(function(){
			that.timer--;
			if(that.timer <= 0) that.question = 'You Have Lost Please Try Again';
			else that.lowerTimer();
		},1000)
	}
	this.skip = function(){
		if(that.set.length >= 2){
			var tempList = angular.copy(this.set);
			$timeout.cancel(myTimer);
			for(i=0;i<tempList.length;i++){
				if(tempList[i].question == this.question){
					tempList.splice(i, 1);
					console.log('check real set', that.set);
					that.question = tempList[Math.floor(Math.random()*tempList.length)].question;
					that.timer = that.resetTimer;
					that.lowerTimer();
				}
			}
		} else {
			console.log('Cannot Skip');
		}
	}
	function isInArray(value, array){
		return array.indexOf(value)> -1;
	}
}]);

app.controller('FlashcardsController', [ 'GamesFactory', 'ListsFactory', '$timeout', '$routeParams',function(GamesFactory, ListsFactory, $timeout, $routeParams){
	that = this;
	this.listId = $routeParams.setId;
	this.list = [];
	this.set = [];
	this.question = '';
	var getList = function(listId){
		console.log('FlashController getList');
		console.log('listId', listId);
		ListsFactory.getList(listId, function(list){
			that.list = list;
			that.set = that.list.list;
			that.set = shuffle(that.set);
			console.log(that.set);
		})
	}
	getList(this.listId);
	
	//Randomize flashcard order 
	function shuffle(set){
		var idx = set.length;
		var temp, randomIdx;
		while(idx > 0){
			randomIdx = Math.floor(Math.random()*idx);
			idx-=1;
			temp = set[idx];
			set[idx] = set[randomIdx];
			set[randomIdx] = temp;
		}
		return set;
	}
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

