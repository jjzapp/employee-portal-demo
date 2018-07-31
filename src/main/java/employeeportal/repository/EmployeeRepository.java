package employeeportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import employeeportal.domain.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
