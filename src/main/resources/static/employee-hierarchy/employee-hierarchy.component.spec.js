'use strict';

describe('employeeHierarchy', function() {

  // Load the module that contains the `employeeHierarchy` component before each test
  beforeEach(module('employeeHierarchy'));

  // Test the controller
  describe('employeeHierarchyController', function() {
    var $httpBackend, ctrl;

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service and assign it to a variable with the same name
    // as the service while avoiding a name conflict.
    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('api/employees')
                  .respond([{"id": 100,"name": "Alan","managerId": 150},{"id": 150,"name": "Jamie","managerId": 0}]);

      ctrl = $componentController('employeeHierarchy');
    }));

    it('should create a `employeeTree` property with employees Jamie fetched with `$http`', function() {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.employees).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.employeeTree[0].name).toEqual("Jamie");
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(ctrl.orderProp).toBe('id');
    });

  });

});
