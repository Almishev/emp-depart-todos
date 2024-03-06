import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';  // import useNavigate
import { registerAPICall } from '../services/AuthService'

const RegisterComponent = () => {

    const navigate = useNavigate(); 

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState(null);
    const [validationError, setValidationError] = useState(null);

    function isValidEmail(email) {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    

    function handleRegistrationForm(e){

        e.preventDefault();

        // Basic validation
        if (!name || !username || !email || !password) {
            setValidationError('All fields are required.');
            return;
        }

          // Validate name has at least two parts
          const nameParts = name.split(' ');
          if (nameParts.length < 2) {
              setValidationError('Name must have at least two parts.');
              return;
          }
  
          // Validate username has at least two symbols
          if (username.length < 2) {
              setValidationError('Username must have at least two symbols.');
              return;
          }
  
          // Validate email format
          if (!isValidEmail(email)) {
              setValidationError('Invalid email format.');
              return;
          }
  

        if (password.length < 4) {
            setValidationError('Password must be at least 4 characters.');
            return;
        }

        // Clear validation error if it was set
        setValidationError(null);
                 
        const register = {name, username, email, password}

        console.log(register);

        registerAPICall(register).then((response) => {
            console.log(response.data);
            setSuccessMessage('Registration successful!');  // Set success message
            setTimeout(() => {
                navigate('/todos');  // Navigate to the home page after a delay
            }, 4000);  // Adjust the delay time (in milliseconds) as needed
        })
            
         .catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'> User Registration Form </h2>
                    </div>

                    <div className='card-body'>
                    {successMessage && (
                                <div className='alert alert-success' role='alert'>
                                    {successMessage}
                                </div>
                            )}

                    {validationError && (
                                <div className='alert alert-danger' role='alert'>
                                    {validationError}
                                </div>
                            )}        

                             
                        <form>
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Name </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='name'
                                        className='form-control'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={ (e) => setName(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Username </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='username'
                                        className='form-control'
                                        placeholder='Enter username'
                                        value={username}
                                        onChange={ (e) => setUsername(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>


                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Email </label>
                                <div className='col-md-9'>
                                    <input
                                        type='text'
                                        name='email'
                                        className='form-control'
                                        placeholder='Enter email address'
                                        value={email}
                                        onChange={ (e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Password </label>
                                <div className='col-md-9'>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={ (e) => setPassword(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <button className='btn btn-primary' onClick={ (e) => handleRegistrationForm(e)}>Submit</button>

                            </div>
                        </form>

                    </div>

                </div>
            </div>
        </div>


    </div>
  )
}



export default RegisterComponent