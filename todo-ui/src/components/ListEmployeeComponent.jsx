import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/AuthService'



const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 4;
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState({ field: 'firstName', order: 'asc' });

    const navigator = useNavigate();

    const isAdmin = isAdminUser();

    useEffect(() => {
        getAllEmployees();
    }, [sortBy]);

    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                const sortedEmployees = sortEmployees(response.data);
                setEmployees(sortedEmployees);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        console.log(id);

        deleteEmployee(id)
            .then((response) => {
                getAllEmployees();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function sortEmployees(employees) {
        const { field, order } = sortBy;

        return employees.slice().sort((a, b) => {
            const aValue = a[field].toLowerCase();
            const bValue = b[field].toLowerCase();

            if (aValue < bValue) {
                return order === 'asc' ? -1 : 1;
            } else if (aValue > bValue) {
                return order === 'asc' ? 1 : -1;
            }

            return 0;
        });
    }

    const toggleSortOrder = (field) => {
        setSortBy((prevSortBy) => ({
            field,
            order: prevSortBy.field === field && prevSortBy.order === 'asc' ? 'desc' : 'asc',
        }));
    };

    const renderArrow = (field) => {
        if (sortBy.field === field) {
            return sortBy.order === 'asc' ? '↑' : '↓';
        }
        return null;
    };

    const renderTableHeader = () => {
        return (
            <thead>
                <tr>
                    <th
                        onClick={() => toggleSortOrder('firstName')}
                        title='Click to sort by First Name'
                        style={{ cursor: 'pointer' }}
                    >
                        First Name {renderArrow('firstName')}
                    </th>
                    <th
                        onClick={() => toggleSortOrder('lastName')}
                        title='Click to sort by Last Name'
                        style={{ cursor: 'pointer' }}
                    >
                        Last Name {renderArrow('lastName')}
                    </th>
                    <th>Employee Email</th>
                    <th>Department Name</th>
                    {
            isAdmin &&
                    <th>Actions</th>
    }
                </tr>
            </thead>
        );
    };

    const renderTableBody = () => {
        const indexOfLastEmployee = currentPage * employeesPerPage;
        const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

        const currentEmployees = employees
            .filter((employee) =>
                employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(indexOfFirstEmployee, indexOfLastEmployee);

        return (
            <tbody>
                {currentEmployees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>{employee.departmentName}</td> {/* Display department name */}
                        <td>
                        {
                                        isAdmin &&
                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                }
                        {
                                        isAdmin &&
                            <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                    style={{marginLeft: '10px'}}
                                >Delete</button>
                }
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    const renderPagination = () => {
        return (
            <ul className='pagination'>
                {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button onClick={() => setCurrentPage(index + 1)} className='page-link'>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <div className='mb-3 col-4'>
                <label htmlFor='search' className='form-label'>
                    Search:
                </label>
                <input
                    type='text'
                    id='search'
                    className='form-control'
                    placeholder='Enter employee name...'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            { isAdmin && <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button> }
            <div className='table-responsive'>
            <table className='table table-striped table-bordered'>
                {renderTableHeader()}
                {renderTableBody()}
            </table>
            </div>
            {renderPagination()}
        </div>
    );
};

export default ListEmployeeComponent;

