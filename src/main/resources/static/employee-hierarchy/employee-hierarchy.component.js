'use strict';

// Register `employeeHierarchy` component, along with its associated controller and template
angular.
  module('employeeHierarchy').
  component('employeeHierarchy', {
    templateUrl: 'employee-hierarchy/employee-hierarchy.template.html',
    controller: ['Employee',
      function EmployeeHierarchyController(Employee) {
        this.employees = Employee.query();
        this.employeeTree = [];

        var self = this;

        // Attach a function to the promise to enrich the data
        this.employees.$promise.then(function(data) {
            // For each of the employees, record the direct reports
            var i = 0;
            for (;i<data.length; i++) {
              if (data[i].managerId == null || data[i].managerId === 0) {
                data[i].managerId = 0;   // indicates CEO
                self.employeeTree.push(data[i]);
              }

              data[i].directReports = [];
              var j = 0;
              for (;j<data.length; j++) {
                if (i === j) {
                  continue;
                }

                if (data[j].managerId === data[i].id) {
                  data[j].manager = data[i];
                  data[i].directReports.push(data[j]);                  
                }
              }
            }
            // Hierarchy array should contain CEO and their reports
            // Search for any employees with no/invalid manager, and append to Hierarchy array
            var invalidManagerEmployees = data.filter(function(employee) {
              return employee.managerId !==0 && employee.manager === undefined;
            });
            if (invalidManagerEmployees.length > 0) {
              var invalidManager = {id: 0, name: "(Unknown Manager)", managerId: 0, directReports: invalidManagerEmployees};
              self.employeeTree.push(invalidManager);
            }
        });
      }
    ]
  });
