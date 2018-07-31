'use strict';

describe('employeeList', function() {

  // Load the module that contains the `employeeList` component before each test
  beforeEach(module('employeeList'));

  // Test the controller
  describe('employeeListController', function() {
    var $httpBackend, ctrl;

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service and assign it to a variable with the same name
    // as the service while avoiding a name conflict.
    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('api/employees')
                  .respond([{"id": 100,"name": "Alan","managerId": 150},{"id": 150,"name": "Jamie","managerId": 0}]);

      ctrl = $componentController('employeeList');
    }));

    it('should create a `employees` property with 2 employees fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.employees).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.employees).toEqual([{"id": 100,"name": "Alan","managerId": 150},{"id": 150,"name": "Jamie","managerId": 0}]);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('id');
    });

  });

});
