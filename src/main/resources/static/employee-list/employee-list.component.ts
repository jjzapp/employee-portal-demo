import * as angular from 'angular';
import { IEmployeeService, IEmployeeResource, EmployeeService } from '../core/employee/employee.service';

export interface IEmployeeListController {
  employees: Array<IEmployeeService>;
  orderProp: string;
}

export class EmployeeListController implements IEmployeeListController {
  public employees: Array<IEmployeeService>;
  public orderProp: string;

  constructor(public Employee: IEmployeeResource) {
    this.employees = Employee.query();
    this.orderProp = 'id';
  }
}

// Register `employeeList` component, along with its associated controller and template
angular.
  module('employeeList').
  component('employeeList', {
    templateUrl: 'employee-list/employee-list.template.html',
    controller: ['Employee',
      (Employee: IEmployeeResource) => new EmployeeListController(Employee)
    ]
  });
