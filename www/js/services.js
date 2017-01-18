angular.module('app.services', [])

.factory('Authentication', ['$http','$location',function($http,$location){

  // var baseurl="https://ther-api.herokuapp.com/";
  var baseurl="https://therappv2.herokuapp.com/";
  return{
    /**
     * While relaunching,if the session exists ,then automatically sign in
     */
    check:function () {
      if(localStorage.getItem("uId")!=null){
        $location.path("/main/home");
      }
    },
    /**
     * Login user
     * @param username username of the user
     * @param pass password of the user
     */
    loginUser: function (username,pass) {
      $http.defaults.useXDomain = true;
      var object={
        "username":username,
        "password":pass
      };
      $http.post(baseurl+"users/login",object).success(function(data){
        var obj=angular.fromJson(data);
        console.log(obj);
        console.log(obj.uid);
        console.log(obj.id);
        localStorage.setItem("uId",obj.uid);
        localStorage.setItem("sessionId",obj.id);
        $location.path("/main/home");
        return obj.uid;
      }).error(function () {
        $location.path("/login");
        alert("Credentials does not match")
      });
    },
    /**
     * Sign up the user
     * @param username username of the user
     * @param pass  password provided
     * @param name fullName of the user
     */
    signupLogic : function (username,pass,name) {
      $http.defaults.useXDomain = true;
      var object={
        "username":username,
        "password":pass
      };
      console.log("object");
      $http.post(baseurl+"users",object).success(function(data){
        console.log("Success");
        console.log(username);
        console.log(name);
        console.log(data.id);
        var user={
          "userName": username,
          "fullName": name,
          "location": {
            "lat": "",
            "long": ""
          },
          "visibility": true,
          "friend": [],
          "uId": data.id
        };
        console.log(user);
        $http.defaults.useXDomain = true;
        $http.post(baseurl+"userdata",user).success(function(){
          console.log("entered data");
          $location.path("/signup-true");
        }).error(function () {
          $location.path("/signup-false");
        });
      }).error(function () {
        $location.path("/signup-false");
      })
    },
    /**
     * Logout the user by deleting the session
     */
    deleteSession:function () {
      $http.defaults.useXDomain = true;
      var object={
        "sid":localStorage.getItem("sessionId")
      };
      $http.post(baseurl+"users/logout",object).success(function(data) {
        localStorage.removeItem("username");
        localStorage.removeItem("uId");
        localStorage.removeItem("password");
        localStorage.removeItem("sessionId");
        $location.path("/welcome");
        alert("Successfully logged out");
      }).error(function () {
        alert("Fatal Error.Cannot logout");
      });
    },
    /**
     * Update the location of the friends if their visibility is ON
     * @returns {Array} Array of friends along with their location
     */
    getFriendsLocation:function () {
      $http.defaults.useXDomain = true;
      var obj=[];
      $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function(result){
        // console.log(result.data);
        angular.forEach(result.data[0].friend,function(user){
          // console.log(user.uname);
          if(user.sendFlag==true && user.receivedFlag==true) {
            $http.get(baseurl + "userdata?userName=" + user.uname).success(function (data) {
              // console.log(data[0]);
              if (data[0].visibility == true) {
                var temp = {
                  "name": data[0].fullName,
                  "latitude": data[0].location.lat,
                  "longitude": data[0].location.long
                };
                obj.push(temp);
                // console.log(temp);
              }
            });
          }
         });
        console.log(obj);
      });
      return obj;
    },
    /**
     *
     * @param latdata
     * @param longdata
     */
    updateLocation: function (latdata,longdata) {
      $http.defaults.useXDomain = true;
      $http.get(baseurl + "userdata?userName=" + localStorage.getItem("username")).then(function (result) {
        console.log(result.data[0]);
        if(result.data[0].visibility==true) {
          $http.put(baseurl + "userdata/" + result.data[0].id, {
            "location": {
              "lat": latdata,
              "long": longdata
            }
          }).success(function () {
            console.log("Hurray!!");
          });
        }
      });
    },
    /**
     * the friendlist of the user
     * @returns {Array} a list of users with their info who are in the friendlist
     */
    friendList:function () {
      $http.defaults.useXDomain = true;
      var obj=[];
      $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function(result){
        console.log(result.data[0].friend);
        $http.defaults.useXDomain = true;
        angular.forEach(result.data[0].friend,function (user) {
          if(user.sendFlag==true && user.receivedFlag==true) {
            $http.get(baseurl + "userdata?userName=" + user.uname).success(function (data) {
              var temp = {
                "username": data[0].userName,
                "fullName": data[0].fullName
              };
              obj.push(temp);
            });
          }
        });
      });
      // console.log(obj);
      return obj;
    },
    /**
     * To check the visibility and toggle the visibility
     */
    getVisibility:function () {
      $http.defaults.useXDomain = true;
      $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function(result){
        var val=new Boolean(result.data[0].visibility);
        console.log(val);
        if(val==true){
          console.log(!val);
          $http.defaults.useXDomain = true;
          $http.put(baseurl+"userdata/"+result.data[0].id,{
            "visibility": !val
          }).success(function () {
            alert("You are now invisible");
          });
        }else {
          $http.defaults.useXDomain = true;
          $http.put(baseurl+"userdata/"+result.data[0].id,{
          "visibility": !!val
        }).success(function () {
          alert("You are now visible");
        });
        }

      });
    },
    /**
     * List people who are not in the friendlist
     * @returns {Array} list of people who are in the friendlist
     */
    listPeople:function () {
      $http.defaults.useXDomain = true;
      var newList=[];
      var userList=[];
      var obj=[];
      newList.push(localStorage.getItem("username"));
      $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function(result2) {
        // console.log(result2.data[0]);
        angular.forEach(result2.data[0].friend, function (user) {
          newList.push(user.uname);
        });
        // console.log(newList);
        $http.get(baseurl + "userdata").then(function (result1) {
          angular.forEach(result1.data, function (users) {
            var flag=0;
            angular.forEach(newList,function (friend) {
              // console.log(friend+" compared to "+users.userName);
              if(friend==users.userName){
                flag=1;
              }
            });
            if(flag==0) {
              userList.push(users.userName);
            }
          });
          // console.log(userList);
          angular.forEach(userList,function (user) {
            $http.get(baseurl+"userdata?userName="+user).success(function (data) {
              var temp={
                "username":data[0].userName,
                "fullName":data[0].fullName
              };
              obj.push(temp);
            });
          });
        });
      });
      // $location.path('/addPeople');
      // console.log(obj);
       return obj;
    },
    /**
     * Send a request to the selected people
     * @param friendName name of the user you wanted to add
     */
    addToListService:function (friendName) {
      $http.get(baseurl+"userdata?userName="+friendName).then(function (result) {
        var obj1=result.data[0].friend;
        console.log(obj1);
        obj1.push({
          "uname":localStorage.getItem("username"),
          "sendFlag": false,
          "receivedFlag": true
        });
        console.log(friendName+" "+obj1);
        $http.put(baseurl + "userdata/" + result.data[0].id,{friend:obj1}).success(function(){
          console.log("success");
        });
        $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function (result1) {
          var obj2=result1.data[0].friend;
          console.log(obj2);
          obj2.push({
            "uname":friendName,
            "sendFlag": true,
            "receivedFlag": false
          });
          console.log(localStorage.getItem("username")+" "+obj2);
          $http.put(baseurl + "userdata/" + result1.data[0].id,{friend:obj2}).success(function(){
            console.log("success");
          });
        });
      });
    },
    /**
     * to list the users who have send a friend request
     * @returns {Array} a list of users
     */
    friendsRequestService:function () {
      var newObj=[];
      $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function (result) {
       var obj=result.data[0].friend;
        angular.forEach(obj,function (data) {
          if(data.sendFlag==false){
            newObj.push(data);
          }
        });
        console.log(newObj);
      });
      return newObj;
    },
    /**
     * To accept a friend request
     * @param friendName the name of the accepted friend
     */
    newMemberToListService:function (friendName) {
      $http.get(baseurl+"userdata?userName="+localStorage.getItem("username")).then(function (result1) {
        var obj1=result1.data[0].friend;
        angular.forEach(obj1,function (user) {
          if(user.uname==friendName){
            console.log("triggered"+user.uname);
            user.sendFlag=true;
            user.receivedFlag=true;
          }
        });
        $http.put(baseurl+"userdata/"+result1.data[0].id,{"friend":obj1}).success(function () {
          console.log("success");
        });
        $http.get(baseurl+"userdata?userName="+friendName).then(function (result2) {
          var obj2=result2.data[0].friend;
          angular.forEach(obj2,function (user2) {
            if(user2.uname==localStorage.getItem("username")){
              console.log("triggered"+user2.uname);
              user2.sendFlag=true;
              user2.receivedFlag=true;
            }
          });
          $http.put(baseurl+"userdata/"+result2.data[0].id,{"friend":obj2}).success(function () {
            console.log("success");
          });
        });
      });
    }
  }
}])

.service('BlankService', [function(){

}]);
