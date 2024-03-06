import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUsername } from '../services/AuthService'

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();

    const navigator = useNavigate();

    const loggedInUsername = getLoggedInUsername();

    function handleLogout(){
        logout();
        navigator('/login')
    }


  return (
    
    <div>
        <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div>
                    <a href='http://localhost:3000' className='navbar-brand'>
                        Todo Management Application
                    </a>
                </div>
                <div className='collapse navbar-collapse'>
                   
                    <ul className='navbar-nav'>

                        {
                            isAuth &&                         
                            <li className='nav-item'>
                            <NavLink to="/todos" className="nav-link">Todos</NavLink>
                        </li>
                        }
                        {
                            isAuth &&  
                        <li className='nav-item'>
                            <NavLink to="/employees" className="nav-link">Employees</NavLink>
                        </li>
                           }
                           {
                            isAuth &&  
                        <li className='nav-item'>
                            <NavLink to="/departments" className="nav-link">Departments</NavLink>
                        </li> }

                    </ul>

                </div>
                
               
                <ul className='navbar-nav'>
                {
                        isAuth && 
                        <li className='nav-item'>
                    <p className='text-warning mt-2'>Welcome, {loggedInUsername}!</p>
                    </li>
        }
                
                    {
                        !isAuth &&                         
                        <li className='nav-item'>
                        <NavLink to="/register" className="nav-link">Register</NavLink>
                    </li>
                    }

                    {
                        !isAuth &&    
                        <li className='nav-item'>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                    </li>
                    }

                    {
                        isAuth &&    
                        <li className='nav-item'>
                            
                        <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                    </li>
                    }

                    </ul>
            </nav>
        </header>

    </div>
  )
}

export default HeaderComponent