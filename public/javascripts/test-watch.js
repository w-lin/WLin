var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(function($routeProvider){
        $routeProvider

        .when("/y",
            {
                templateUrl: "views/hello.html",
                controller: "AppCtrl",
            }
        )
        .otherwise({
                redirectTo: '/'
        });
    });

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


    var refresh = function() {
        $http.get('/contactlist').success(function(response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        }).error(function(response){
            console.log('eeeeee')
            console.log(response);
        });
    };

    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        })
    };

    $scope.deselect = function() {
        $scope.contact = "";
    };

}]);
var one = "1";
var two = "2222";
var three = "3333444";

function firstFunction()
{
    console.log('hello world');
}
var three = "1";
var four = "2";

