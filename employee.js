var ma = angular.module("ma", []);
// ma.config(['$routeProvider',function($routeProvider){
//     $routeProvider
//     .when('/showAllEmployees',{templateUrl:'employee.html', controller:"employeeController"})
//     .otherwise({redirectTo:'/showAllEmployees'})
// }]);
ma.service('employeeService', function ($q, $http) {
    this.getAllEmployees = function(){
        var deferred = $q.defer();
    $http.get("employees.txt").success(function(data){deferred.resolve(data)}).error(function(msg){deferred.reject(msg)});
    return deferred.promise;
    }
});
ma.controller("employeeController", function ($scope, employeeService) {
    $scope.employees = [];
    var promise = employeeService.getAllEmployees();
    promise.then(function(emps){
        $scope.employees = emps;
    });
    $scope.addEmployee = function(new_employee){
            new_employee['empId'] = parseInt($scope.employees[$scope.employees.length - 1].empId) + 1;
            $scope.employees.push(new_employee);
            $scope.new_employee = [];
    }
    $scope.deleteEmployee= function(empId)
    {
        delete $scope.employees.splice(empId -1, empId);
        if (length($scope.employees) ==1){
            delete $scope.employees;
        }
    }
});