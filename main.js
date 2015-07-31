window.onload = function(){
  //js
};

var app = angular.module('test', []);

app.controller('mainCtrl', function($scope) {
  $scope.loadApp = function() {
    gapi.client.request({
      path: '/games/v1/applications/365755626363',
      callback: function(response) {
        $scope.title = response.name;
        console.log(response);
      }
    });
  };
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
        //"variant": 0,
        "invitedPlayerIds": [
          "me"
        ],
        "autoMatchingCriteria": {
          "kind": "games#turnBasedAutoMatchingCriteria",
          "minAutoMatchingPlayers": 2,
          "maxAutoMatchingPlayers": 2,
          "exclusiveBitmask": 0
        },
        "requestId": 1
      },
      method: 'post',
      callback: function(response) {
        console.log(response);
      }
    });
  };
});


function onSignIn(googleUser) {
  console.log(googleUser.getBasicProfile());
  player.loadPlayer();
  
}

  
function signinCallback(auth) {
  console.log(auth);
}
  
