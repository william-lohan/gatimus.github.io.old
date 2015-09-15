var app = angular.module('gearCalc', ['ngMaterial']);

app.controller('main', function($scope) {
    $scope.rpm = 800;
    $scope.gears = [
      {gear:1,ratio:2.80},
      {gear:2,ratio:1.53},
      {gear:3,ratio:1.00},
      {gear:4,ratio:0.75}
    ];
    $scope.gear = 1;
    $scope.isLow = true;
    $scope.lowRange = 4.00;
    $scope.axleGear = 4.56;
    
    $scope.idle = function(){
      $scope.rpm = 800;
    };
    $scope.addGear = function(){
      $scope.gears.push({gear:$scope.gears.length+1,ratio:$scope.rpm});
    };
    $scope.removeGear = function(){
      $scope.gears.pop();
    };
});



