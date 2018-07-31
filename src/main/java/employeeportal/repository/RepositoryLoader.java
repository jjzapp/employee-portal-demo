package employeeportal.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import employeeportal.domain.Employee;

@Component
public class RepositoryLoader implements CommandLineRunner {

	private final EmployeeRepository employeeRepository;

	@Autowired
	public RepositoryLoader(EmployeeRepository employeeRepository) {

		this.employeeRepository = employeeRepository;
	}

	@Override
	public void run(String... strings) throws Exception {

		employeeRepository.save(new Employee(100L, "Alan", 150L));
		employeeRepository.save(new Employee(220L, "Martin", 100L));
		employeeRepository.save(new Employee(150L, "Jamie", null));
		employeeRepository.save(new Employee(275L, "Alex", 100L));
		employeeRepository.save(new Employee(400L, "Steve", 150L));
		employeeRepository.save(new Employee(190L, "David", 400L));
	}
}
