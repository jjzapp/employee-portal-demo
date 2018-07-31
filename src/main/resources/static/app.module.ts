import * as angular from 'angular';

// Define the `employeeApp` module
angular.module('employeeApp', [
  'ngRoute',
  'core',
  'employeeList',
  'employeeHierarchy'
]);
