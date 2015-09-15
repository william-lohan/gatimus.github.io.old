window.onload=function(){
  
  //javascript here

};

var app = angular.module('test2', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('cyan');
});

app.controller('bodyCtrl', function($scope, $mdSidenav) {
  $scope.page = "login.html";
    $scope.openLeftMenu = function() {
      $mdSidenav('left').open();
    };
    $scope.onSwipeLeft = function() {
      $mdSidenav('left').close();
    };
    $scope.sales = function() {
      $scope.page = "sales.html";
      $mdSidenav('left').close();
    };
    $scope.inventory = function() {
      $scope.page = "inventory.html";
      $mdSidenav('left').close();
    };
    $scope.customers = function() {
      $scope.page = "customers.html";
      $mdSidenav('left').close();
    };
    $scope.vendors = function() {
      $scope.page = "vendors.html";
      $mdSidenav('left').close();
    };
    $scope.setup = function() {
      $scope.page = "setup.html";
      $mdSidenav('left').close();
    };
});

app.controller('navCtrl', function($scope) {
    //
});

app.controller('mainCtrl', function($scope) {
    $scope.names=['Jani','Hege','Kai'];
});

app.controller('APICtrl', function($scope, $http) {
    //$http.get("http://ponyvillelive.com/api/station/list/category/audio")
    //  .success(function(response) {$scope.names = response.result;})
    //  .error(function(response) {alert(response);});
});

app.controller('footerCtrl', function($scope) {
    $scope.year = new Date().getFullYear();
});
    
