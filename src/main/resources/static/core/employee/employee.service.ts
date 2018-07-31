import * as angular from 'angular';

export interface IEmployeeService {
  id: number;
  name: string;
  managerId: number;

  query(): IEmployeeResource;
}

export type IEmployeeResource = ng.resource.IResourceClass<IEmployeeService>;

export class EmployeeService implements IEmployeeService {
  public id: number;
  public name: string;
  public managerId: number;

  constructor(public $resource: ng.resource.IResourceService) {
    this.id = 0;
    this.name = "";
    this.managerId = 0;
  }

  query(): ng.resource.IResourceClass<any> {
    return this.$resource('api/employees/:employeeId', {}, {
      query: {
        method: 'GET',
        params: {employeeId: ''},
        isArray: true
      }
    });
  }
}

angular.
  module('core.employee').
  factory('Employee', ['$resource',
    ($resource: ng.resource.IResourceService) => new EmployeeService($resource).query()
  ]);
