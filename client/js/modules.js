var app = angular.module('app', ['ngRoute','auth0','angular-storage','angular-jwt']);

app.config(function(authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider){
	$routeProvider
	.when('/', {
		controller: 'ListsController',
		controllerAs: 'listsCtrl',
		templateUrl: '/partials/lists.partial.html'
	})
	.when('/game/:gameId', {
		controller: 'GamesController',
		controllerAs: 'gamesCtrl',
		templateUrl: '/partials/game.partial.html'
	})
	.when('/flash/:setId', {
		controller: 'FlashcardsController',
		controllerAs: 'cardsCtrl',
		templateUrl: '/partials/flashcards.partial.html'
	})
	.when('/create', {
		controller: 'ListsController',
		controllerAs: 'listsCtrl',
		templateUrl: '/partials/createList.partial.html'
	})
	.when('/lists', {
		controller: 'ListsController',
		controllerAs: 'listsCtrl',
		templateUrl: '/partials/lists.partial.html'
	})
	.when('/login', {
		controller: 'LoginController',
		controllerAs: 'loginCtrl',
		templateUrl: '/partials/login.partial.html'
	})
	.otherwise('/');

	jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    	return store.get('token');
	}];

	$httpProvider.interceptors.push('jwtInterceptor');
});

app.config(function (authProvider) {
  	authProvider.init({
    	domain: 'matthewhan.auth0.com',
    	clientID: 'U7NNhPBwTTg7oe4nvYkqcMhHQ2ryGzsS'
  	});
});

app.config(function(flipConfigProvider){
  flipConfigProvider.setClassName("flipperCosmic");
  flipConfigProvider.setTempo("3s");
  flipConfigProvider.setDim({width:"300px", height:"300px"});
  flipConfigProvider.flipsOnClick(false);
});

app.run(function($rootScope, auth, store, jwtHelper, $location) {
	// This hooks al auth events to check everything as soon as the app starts
	auth.hookEvents();
  	// This events gets triggered on refresh or URL change
  	$rootScope.$on('$locationChangeStart', function() {
	    var token = store.get('token');
	    if (token) {
	      	if (!jwtHelper.isTokenExpired(token)) {
		        if (!auth.isAuthenticated) {
		          	auth.authenticate(store.get('profile'), token);
		        }
		    } else {
		        // Either show Login page or use the refresh token to get a new idToken
		        $location.path('/');
	      	}
	    }
  	});
});