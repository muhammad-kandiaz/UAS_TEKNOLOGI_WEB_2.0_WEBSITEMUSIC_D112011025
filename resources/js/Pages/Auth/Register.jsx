import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/register', formData, {
            onSuccess: (response) => {
                // Redirect to dashboard page after successful registration
                Inertia.visit('/dashboard', { data: response });
            },
        });
    };

    const handleLoginClick = () => {
        Inertia.visit('/login');
    };

    return (
        <div style={styles.container}>
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol md='6'>
                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                            <MDBCardBody className='p-5 d-flex flex-column align-items-center'>
                                <h2 className="fw-bold mb-4 text-uppercase">Register</h2>
                                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                    <MDBInput label='Your Name' id='name' name='name' type='text' size='lg' value={formData.name} onChange={handleChange} required />
                                    <MDBInput label='Your Email' id='email' name='email' type='email' size='lg' value={formData.email} onChange={handleChange} required />
                                    <MDBInput label='Password' id='password' name='password' type='password' size='lg' value={formData.password} onChange={handleChange} required />
                                    <MDBInput label='Repeat your password' id='password_confirmation' name='password_confirmation' type='password' size='lg' value={formData.password_confirmation} onChange={handleChange} required />

                                    <button className='btn btn-outline-light btn-lg w-100' type='submit' style={{ marginTop: '30px' }}>
                                        Register
                                    </button>
                                </form>
                                <div className='text-center mt-4'>
                                    <p className="mb-0">Already have an account? <a href="#!" className="text-white-50 fw-bold" onClick={handleLoginClick}>Login</a></p>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Register;

const styles = {
    container: {
        background: 'linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))',
        minHeight: '100vh',
    },
};
