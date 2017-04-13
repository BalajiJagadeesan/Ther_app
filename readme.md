# Ther App
The mobile application keeps the user informed with the location of their friends or family. The application is for family members who wants to track their children-whether they reached/left school or close family members reached home safely. It can also be used by friends/roommates to notify the other of their location during emergency situations.

Sample link : https://therapp.herokuapp.com/#/welcome
API link : https://therappv2.herokuapp.com/userdata/

## Features:
The application can be accessed only if the user is a valid member (enrolled in the system). This can be possible by enabling user authentication even before accessing the core functionality of the database. If the user tries to log in with the wrong password 5 or more times, the system will lock down and the user cannot access his account for some time.
 If the user logins in successfully, he/she can access the functionality of the application. The user has couple of options to do now.
*	Search for friends: The user can search for other friends enrolled in the system by typing their name.(By default the application shows the list of members enrolled in the system)
*	Add a friend to their list: The user can request his friend to add their account to their list, if accepted the details of their friend are added to the user personalized list.
*	Locate friend: The user can open their personalized list and track the location of the members from that list.
*	Change privacy control: The user have the ability to hide their location to members (for a predefined amount of time say 1 hour or so).
*	Cross platform compatible: No matter what platform the user or his/her friends is using, all of them can able to share and track others if they have necessary permission(should be approved by the user’s friends to track them)

### Technologies
Ther App uses number of open source project and framework to work properly
* Basic Web Technologies like HTML5,CSS3,Javascript
* Cordova - To create open source mobile apps with HTML, CSS & JS
* Ionic - Framework build on cordova
* node.js - To create API backend using deployd plugin 
* AngularJS - HTML enhanced for web apps! 

### Installation
To use the code and run locally simply fork the project and type the below commands.

<<But before that,make sure you have Cordova and Ionic installed in your computer.See respective package documentation for installation>>

```sh
$ cd PathToFolder
$ npm install
$ ionic serve
```
The code uses custom API hosted on the heroku server.

### Hosting API
To host the custom API by yourself,
* simply upload the content of "ther-api" folder into  your personal space
* Go into the <<mainFolder>>/www/js/services.js 
* Change the baseurl variable to the url where the API is hosted.

The API uses nodeJS using deployd package.To learn more about deployd view deployd documentation

