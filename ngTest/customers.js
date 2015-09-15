app.controller('custCtrl', function($scope, $http, $timeout, $mdBottomSheet) {
    $http.get("cust.json")
      .success(function(response) {$scope.customers = response;})
      .error(function(response) {alert(response);});
      
    $scope.test = "test";
    
    $scope.viewCust = function($event, cust){
      $scope.selectedCust = cust;
      $mdBottomSheet.show({
        templateUrl: 'view_cust.html',
        scope: $scope,
        preserveScope: true
      });
    };
});

app.controller('viewCustCtrl', function($scope, $mdBottomSheet) {
  
});