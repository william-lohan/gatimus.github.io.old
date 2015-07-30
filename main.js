window.onload = function(){
  gapi.client.load('games','v1',function(response) {
        var request = gapi.client.games.leaderboards.list(
      {maxResults: 5}
    );
    request.execute(function(response) {
      console.log(response);
    });
      });
};


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
  


var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";
