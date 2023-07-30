import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/login', formData, {
            onSuccess: () => {
                // Redirect to dashboard page after successful login
                Inertia.visit('/dashboard');
            },
        });
    };

    const handleSignUpClick = () => {
        Inertia.visit('/register');
    };

    return (
        <div style={styles.container}>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol md='6'>
                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center'>
                                <h2 className="fw-bold mb-4 text-uppercase">Login</h2>
                                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                    <MDBInput label='Email address' id='email' name='email' type='email' size='lg' value={formData.email} onChange={handleChange} required />
                                    <MDBInput label='Password' id='password' name='password' type='password' size='lg' value={formData.password} onChange={handleChange} required />
                                    <p className="small mb-4"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                    <button className='btn btn-outline-light btn-lg w-100' type='submit'>
                                        Login
                                    </button>
                                </form>
                                <div className='d-flex flex-row mt-4'>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'white' }}>
                                        <MDBIcon fab icon='facebook-f' size='lg' />
                                    </MDBBtn>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'white' }}>
                                        <MDBIcon fab icon='twitter' size='lg' />
                                    </MDBBtn>
                                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: 'white' }}>
                                        <MDBIcon fab icon='google' size='lg' />
                                    </MDBBtn>
                                </div>
                                <div className='mt-4'>
                                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold" onClick={handleSignUpClick}>Sign Up</a></p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Login;

const styles = {
    container: {
        background: 'linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))',
        minHeight: '100vh',
    },
};
