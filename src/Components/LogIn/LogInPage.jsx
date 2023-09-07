import React from 'react'
import Logo from '../../../src/images/vibezterLogo.png'
import { Button, Form } from 'react-bootstrap';

const LogInPage = () => {
    return (
        <div className='loginbg'>
            <div className='form_area'>
                <a href='/'><img src={Logo} className="img-fluid" alt="" /></a>
                <div className='user_management_list p-0'>
                    <div className="user_heading">
                        <h3>Log in</h3>
                        <p>Login to your account</p>
                    </div>
                    <Form className='mt-4'>
                        <Form.Group className="mb-3" controlId="emailid">
                            <Form.Label>Email ID *</Form.Label>
                            <Form.Control type="email" placeholder="meta@email.com" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="**********" />
                        </Form.Group>
                        <div className='check_with_text d-flex align-items-center justify-content-between'>
                            <Form.Group className="" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember" />
                            </Form.Group>
                            <a href="#" className='text-red'>Forgot password?</a>
                        </div>
                        <Button variant="" type="submit">Log In</Button>
                        <p className='dont_account'>Don't have an account ? <a href="#" className='text-red'> Create One</a></p>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LogInPage