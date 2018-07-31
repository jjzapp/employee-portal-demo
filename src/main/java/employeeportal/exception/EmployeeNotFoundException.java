package employeeportal.exception;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EmployeeNotFoundException extends RuntimeException {

	public EmployeeNotFoundException(Long employeeId) {
		super("could not find employee '" + employeeId + "'.");
	}
}
