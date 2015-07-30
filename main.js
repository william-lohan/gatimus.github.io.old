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
        //"variant": 0,
        "invitedPlayerIds": [
          "me"
        ],
        "autoMatchingCriteria": {
          "kind": "games#turnBasedAutoMatchingCriteria",
          "minAutoMatchingPlayers": 2,
          "maxAutoMatchingPlayers": 8,
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
  gapi.client.request({
    path: '/games/v1/players/me',
    callback: function(response) {
      console.log(response);
    }
  });
}

  
function signinCallback(auth) {
  console.log(auth);
}
  
