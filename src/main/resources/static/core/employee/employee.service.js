'use strict';

angular.
  module('core.employee').
  factory('Employee', ['$resource',
    function($resource) {
      return $resource('api/employees/:employeeId', {}, {
        query: {
          method: 'GET',
          params: {employeeId: ''},
          isArray: true
        }
      });
    }
  ]);
