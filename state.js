var state = {};

state.body = '';

state.load = function(){
  gapi.client.request({
    path: '/appstate/v1/states/0',
    method: 'get',
    callback: function(response) {
      state.body = response.data;
      document.getElementById("text_area").innerText = state.body;
      console.log(response);
    }
  });
};

state.save = function(){
  state.body = document.getElementById("text_area").innerText;
  gapi.client.request({
    path: '/appstate/v1/states/0',
    params: {
      "kind": "appstate#updateRequest",
      "data": state.body
    },
    method: 'put',
    callback: function(response) {
      console.log(response);
    }
  });
};