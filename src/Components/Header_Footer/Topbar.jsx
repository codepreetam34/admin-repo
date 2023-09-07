import React, { useState } from 'react'
import { Dropdown, Form, InputGroup, Row, Col, Toast, ToastContainer } from 'react-bootstrap'
import User from '../../../src/images/user.png'

const Topbar = ({ toggleicon, setToggleicon, ToggleBtn }) => {

    const [showToast, setShowToast] = useState(false);



    return (
        <>
            <div className="topbar">
                <Row className='align-items-center'>
                    <Col xs={7} md={6}>
                        <div className='d-flex align-items-center'>
                            <div className='toggle_button me-3 d-none d-xl-block' onClick={() => ToggleBtn()}>
                                <i className='fa-solid fa-bars'></i>
                            </div>
                            <div className='toggle_button me-3 d-block d-xl-none' onClick={() => ToggleBtn()}>
                                <i className='fa-solid fa-bars'></i>
                            </div>
                            <div className="searchbar">
                                <InputGroup className="">
                                    <InputGroup.Text id="basic-addon1" className=''><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                                    <Form.Control placeholder="Search Here" className='' aria-label="Search Here" aria-describedby="basic-addon1" />
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                    <Col xs={5} md={6}>
                        <div className="userprofile text-end">
                            <Dropdown>
                                <Dropdown.Toggle variant="" className='p-0' id="dropdown-basic">
                                    <img src={User} className='img-fluid' alt="" /> Alexa Evans
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" onClick={() => setShowToast(true)}>Profile</Dropdown.Item>
                                    <Dropdown.Item href="#">Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='custom_toaster'>
                <ToastContainer position="bottom-end" className="p-3">
                    <Toast onClose={() => setShowToast(false)} show={showToast} className="bottom-end" delay={3000} >
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto"><i class="fa-solid fa-circle-check"></i> Success</strong>
                        </Toast.Header>
                    </Toast>
                </ToastContainer>
            </div>
        </>
    )
}

export default Topbar