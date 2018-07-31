'use strict';

describe('Employee', function() {
  var $httpBackend;
  var Employee;
  var employeesData = [
    {
      "id": 100,
      "name": "Alan",
      "managerId": 150
    },
    {
        "id": 150,
        "name": "Jamie",
        "managerId": 0
    },
    {
        "id": 190,
        "name": "David",
        "managerId": 400
    },
    {
        "id": 220,
        "name": "Martin",
        "managerId": 100
    },
    {
        "id": 275,
        "name": "Alex",
        "managerId": 100
    },
    {
        "id": 400,
        "name": "Steve",
        "managerId": 150
    }
  ];

  // Add a custom equality tester before each test
  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Employee` service before each test
  beforeEach(module('core.employee'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Employee_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('api/employees').respond(employeesData);

    Employee = _Employee_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the employees data from `api/employees`', function() {
    var employees = Employee.query();

    expect(employees).toEqual([]);

    $httpBackend.flush();
    expect(employees).toEqual(employeesData);
  });

});
