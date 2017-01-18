angular.module('app.controllers', [])

.controller('welcomePageCtrl', ['$scope', '$stateParams','Authentication', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Authentication) {
  Authentication.check();
}])


.controller('loginCtrl', ['$scope', '$stateParams','Authentication', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Authentication) {

  $scope.loginLogic=function () {
      var username=document.getElementById("username").value;
      var password=document.getElementById("password").value;
      localStorage.setItem("username",username);
      localStorage.setItem("password",password);
      Authentication.loginUser(username,password);
  }
}])

.controller('signupCtrl', ['$scope', '$stateParams','Authentication', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Authentication) {

  $scope.signUpLogic=function () {
    var username=document.getElementById("usernameSignUp").value;
    var password=document.getElementById("passwordSignUp").value;
    var name=document.getElementById("nameSignUp").value;
    console.log(username);
    Authentication.signupLogic(username, password, name);
  }

}])



.controller('signUpSuccessCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('signUpFailureCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('mapCtrl', ['$scope', '$stateParams','NgMap','Authentication','$interval','$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,NgMap,Authentication,$interval,$cordovaGeolocation) {
  // $scope.googleMapsUrl="https://maps.google.com/maps/api/js?key=AIzaSyC6d3auYROWoVsnlDGwvj_lRsM0nIbIS80&callback=initMap";
  $interval(function() {
    $scope.points=Authentication.getFriendsLocation();
    console.log($scope.points);
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      $scope.lat  = position.coords.latitude;
      $scope.long = position.coords.longitude;
      console.log($scope.lat + " and " + $scope.long );
      Authentication.updateLocation(position.coords.latitude,position.coords.longitude);
    }, function(err) {
      console.log("GeoLocation failed fatal error!!")
    });
  }, 20000);
  $scope.points=Authentication.getFriendsLocation();
  // console.log($scope.points);

  $scope.setVal=false;
  // Authentication.getVisibility();
  $scope.toggleVisibility=function () {
    Authentication.getVisibility();
  };

  $scope.logoutLogic=function () {
    Authentication.deleteSession();
  }
}])

.controller('friendsListCtrl', ['$scope', '$stateParams','Authentication','$location',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Authentication,$location) {

  $scope.friends=Authentication.friendList();
  console.log($scope.friends);

  // $scope.addToList=function (username) {
  //   Authentication.addFriend();
  // };

  $scope.logoutLogic=function () {
    Authentication.deleteSession();
  }
}])

.controller('pendingRequestsCtrl', ['$scope', '$stateParams','Authentication', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Authentication) {

  $scope.friendRequests=Authentication.friendsRequestService();
  $scope.newMemberToList=function (friendName,item) {
    Authentication.newMemberToListService(friendName);
    $scope.friendRequests.splice($scope.friendRequests.indexOf(item), 1);
    console.log($scope.newUsers);
  };
  $scope.logoutLogic=function () {
    Authentication.deleteSession();
  }

}])


.controller('addPeopleCtrl', ['$scope', '$stateParams','Authentication', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,Authentication) {

  $scope.newUsers=Authentication.listPeople();
  $scope.addToList=function (friendName,item) {
    Authentication.addToListService(friendName);
    $scope.newUsers.splice($scope.newUsers.indexOf(item), 1);
    console.log($scope.newUsers);

  };
  $scope.logoutLogic=function () {
    Authentication.deleteSession();
  }
}]);
