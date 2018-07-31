import * as angular from 'angular';
import { IEmployeeService, IEmployeeResource, EmployeeService } from '../core/employee/employee.service';

export class EmployeeHierarchyNode {
  public id: number;
  public name: string;
  public managerId: number;
  public directReports: Array<EmployeeHierarchyNode>;

  constructor(id: number, name: string, managerId: number) {
    this.id = id;
    this.name = name;
    this.managerId = managerId;
    this.directReports = new Array<EmployeeHierarchyNode>();
  }
}

export interface IEmployeeHierarchyController {
  employees: Array<IEmployeeService>;
  orderProp: string;
  employeeTree: Array<EmployeeHierarchyNode>;
}

export class EmployeeHierarchyController implements IEmployeeHierarchyController {
  public employees: Array<IEmployeeService>;
  public orderProp: string;
  public employeeTree: Array<EmployeeHierarchyNode>;

  constructor(public Employee: IEmployeeResource) {
    this.employees = Employee.query();
    this.orderProp = 'id';
    this.employeeTree = new Array<EmployeeHierarchyNode>();

    let self: EmployeeHierarchyController = this;

    // Attach a function to the promise to enrich the data
    this.employees.$promise.then(function(data) {
      // Build a new array
      let employeNodes: Array<EmployeeHierarchyNode> = new Array<EmployeeHierarchyNode>();
      data.forEach(dataElement => {
        employeNodes.push(new EmployeeHierarchyNode(dataElement.id, dataElement.name, dataElement.managerId));
      });

      // For each of the employees, record the direct reports
      for (let i=0;i<employeNodes.length; i++) {
        if (employeNodes[i].managerId == null || employeNodes[i].managerId === 0) {
          self.employeeTree.push(employeNodes[i]);
        }

        employeNodes[i].directReports = [];
        for (let j=0;j<employeNodes.length; j++) {
          if (i === j) {
            continue;
          }

          if (employeNodes[j].managerId === employeNodes[i].id) {
            employeNodes[i].directReports.push(employeNodes[j]);
          }
        }
      }
    });
  }
}

// Register `employeeHierarchy` component, along with its associated controller and template
angular.
  module('employeeHierarchy').
  component('employeeHierarchy', {
    templateUrl: 'employee-hierarchy/employee-hierarchy.template.html',
    controller: ['Employee',
      (Employee: IEmployeeResource) => new EmployeeHierarchyController(Employee)
    ]
  });
