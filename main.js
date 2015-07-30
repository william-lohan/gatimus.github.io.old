window.onload = function(){
  gapi.client.request({
      path: '/games/v1/turnbasedmatches',
      callback: function(response) {
        console.log(response);
      }
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
