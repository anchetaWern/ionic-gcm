// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, RequestsService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


    pushNotification = window.plugins.pushNotification;


    window.onNotification = function(e){

      console.log('notification received');
       
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){
            
            var device_token = e.regid;
            RequestsService.register(device_token).then(function(response){
              alert('registered!');
            });
          }
        break;

        case 'message':
          alert('msg received');
          alert(JSON.stringify(e));
        break;

        case 'error':
          alert('error occured');
        break;

      }
    };


    window.errorHandler = function(error){
      alert('an error occured');
    }


    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'senderID': 'YOUR PROJECT ID FROM GOOGLE CONSOLE',
        'ecb': 'onNotification'
      }
    );


  });
})
