var player = {};

player.loadPlayer = function() {
  gapi.client.request({
        path: '/games/v1/players/me',
        callback: function(response) {
          console.log(response);
          player = response;
          document.getElementById("avitar").src = player.avatarImageUrl;
        }
      }
  );
};