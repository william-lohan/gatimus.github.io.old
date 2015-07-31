
function onSignIn(googleUser) {
  console.log(googleUser.getBasicProfile());
  player.loadPlayer();
}
  
function signinCallback(auth) {
  console.log(auth);
}