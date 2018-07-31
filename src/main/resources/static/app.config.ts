class Config {
  constructor($locationProvider: angular.ILocationProvider, $routeProvider: angular.route.IRouteProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/employee', {
        template: '<employee-list></employee-list>'
      }).
      when('/employeeHierarchy', {
        template: '<employee-hierarchy></employee-hierarchy>'
      }).
      otherwise('/employee');
  }
}

angular.
  module('employeeApp').
  config([
    '$locationProvider' ,'$routeProvider',
    ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => new Config($locationProvider, $routeProvider)
  ]);
