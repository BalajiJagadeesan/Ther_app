angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('tabsController.map', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('tabsController.friendsList', {
    cache:false,
    url: '/friendlist',
    views: {
      'tab2': {
        templateUrl: 'templates/friendsList.html',
        controller: 'friendsListCtrl'
      }
    }
  })

  .state('tabsController.pendingRequests', {
    url: '/newfriend',
    views: {
      'tab3': {
        templateUrl: 'templates/pendingRequests.html',
        controller: 'pendingRequestsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/main',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.friendInfo', {
    cache:false,
    url: '/friendlist/addPeople',
    views: {
      'tab2': {
        templateUrl: 'templates/addPeople.html',
        controller: 'addPeopleCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('welcomePage', {
    url: '/welcome',
    templateUrl: 'templates/welcomePage.html',
    controller: 'welcomePageCtrl'
  })

  .state('signUpSuccess', {
    url: '/signup-true',
    templateUrl: 'templates/signUpSuccess.html',
    controller: 'signUpSuccessCtrl'
  })

  .state('signUpFailure', {
    url: '/signup-false',
    templateUrl: 'templates/signUpFailure.html',
    controller: 'signUpFailureCtrl'
  })



$urlRouterProvider.otherwise('/welcome')



});
