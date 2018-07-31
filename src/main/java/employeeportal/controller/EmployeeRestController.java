package employeeportal.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import employeeportal.domain.Employee;
import employeeportal.repository.EmployeeRepository;
import employeeportal.exception.EmployeeNotFoundException;

@RestController
@RequestMapping("/api/employees")
public class EmployeeRestController {

    private final EmployeeRepository _employeeRepository;

    public EmployeeRestController(EmployeeRepository employeeRepository) {
        this._employeeRepository = employeeRepository;
    }

    @GetMapping
    public List<Employee> getEmployees() {
        return this._employeeRepository.findAll();
    }

    @GetMapping("/{employeeId}")
    public Employee getEmployee(@PathVariable Long employeeId) {
        return this._employeeRepository.findById(employeeId)
            .orElseThrow(() -> new EmployeeNotFoundException(employeeId));
    }
}
