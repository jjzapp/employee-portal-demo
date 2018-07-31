'use strict';

angular.
  module('employeeApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
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
  ]);
