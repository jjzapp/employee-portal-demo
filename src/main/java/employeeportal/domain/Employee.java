package employeeportal.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Employee {

    @Id
    private Long id;

    private String name;

    private Long managerId;

    private Employee() { } // JPA only

    public Employee(final Long id, final String name, final Long managerId) {
        
        this.id = id;
        this.name = name;
        this.managerId = managerId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getManagerId()
    {
        return managerId;
    }
}
