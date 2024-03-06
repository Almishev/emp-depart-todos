package net.javaguides.todo.repository;


import net.javaguides.todo.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e JOIN FETCH e.department")
    List<Employee> findAllWithDepartment();


    // JPQL query to fetch employees with department name
    @Query("SELECT e, d.departmentName FROM Employee e JOIN e.department d")
    List<Object[]> findEmployeesWithDepartmentName();
}
