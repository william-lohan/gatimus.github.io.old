window.onload = function(){
  //js
};

var app = angular.module('test', []);

app.controller('mainCtrl', function($scope) {
  $scope.listMatches = function() {
    gapi.client.request({
      path: '/games/v1/turnbasedmatches',
      callback: function(response) {
        $scope.matches = response.items;
        console.log(response);
      }
    });
  };
  $scope.createMatch = function() {
    gapi.client.request({
      path: '/games/v1/turnbasedmatches/create',
      params: {
        "kind": "games#turnBasedMatchCreateRequest",
        "variant": 0,
        "invitedPlayerIds": [
          "115091908605712260933"
        ],
        "autoMatchingCriteria": {
          "kind": "games#turnBasedAutoMatchingCriteria",
          "minAutoMatchingPlayers": 2,
          "maxAutoMatchingPlayers": 8,
          "exclusiveBitmask": 0
        },
        "requestId": 0
      },
      callback: function(response) {
        console.log(response);
      }
    });
  };
});


function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}

  
function signinCallback(auth) {
  console.log(auth);
}
  
