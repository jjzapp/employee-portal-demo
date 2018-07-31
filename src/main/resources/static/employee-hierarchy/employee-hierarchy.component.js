'use strict';

// Register `employeeHierarchy` component, along with its associated controller and template
angular.
  module('employeeHierarchy').
  component('employeeHierarchy', {
    templateUrl: 'employee-hierarchy/employee-hierarchy.template.html',
    controller: ['Employee',
      function EmployeeHierarchyController(Employee) {
        this.employees = Employee.query();
        this.orderProp = 'id';
        this.employeeTree = [];

        var self = this;

        // Attach a function to the promise to enrich the data
        this.employees.$promise.then(function(data) {
            // For each of the employees, record the direct reports
            var i = 0;
            for (;i<data.length; i++) {
              if (data[i].managerId == null || data[i].managerId === 0) {
                self.employeeTree.push(data[i]);
              }

              data[i].directReports = [];
              var j = 0;
              for (;j<data.length; j++) {
                if (i === j) {
                  continue;
                }

                if (data[j].managerId === data[i].id)
                  data[i].directReports.push(data[j]);
              }
            }
        });
      }
    ]
  });
