app.controller('MainController', function($scope, $routeParams, $http){

	$http.get("/app/home/resources.js").success(function(data) {
     	$scope.resources = data;
    });
    $http.get("/app/home/journals.js").success(function(data) {
     	$scope.journals = data;
    });
    $http.get("/app/home/tutorials.js").success(function(data) {
     	$scope.tutorials = data;
    });

    $scope.resources =  [ 'p1', 'p2', 'p3' ];

	$scope.hello = "hello";
});