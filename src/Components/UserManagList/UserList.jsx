import React, { useState } from 'react'
import Wrapper from '../Wrapper'
import { Row, Col, Form, Table, Modal, Button, Dropdown } from 'react-bootstrap'
import AllUser from '../../JsonFile/UserManageList';

const UserList = () => {

    const [TableData] = useState(AllUser);

    const [lgShow, setLgShow] = useState(false);
    const [DeleteMod, setDeleteMod] = useState(false);
    const [EditShow, setEditShow] = useState(false);
    const [Filter, setFilter] = useState(false);

    function filterbtn() {
        setFilter(!Filter)
    }
    return (
        <Wrapper>
            <div className="user_management_list">
                <Row>
                    <Col md={6}>
                        <div className="user_heading">
                            <h3>Users Management</h3>
                            <p>Welcome to user management page</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="add_filter_btn d-flex justify-content-end">
                            <div className="custom_filter_btn">
                                <a to="" className='bgbtnwhite' onClick={() => filterbtn()}><i className="fas fa-filter"></i> Filters</a>
                                <div className={Filter ? 'custom_filter' : 'custom_filter d-none'}>
                                    <ul className='p-0 m-0'>
                                        <li>
                                            <Form.Group className="" controlId="activeusers">
                                                <Form.Check type="checkbox" label="Active Users" />
                                            </Form.Group>
                                        </li>
                                        <li>
                                            <Form.Group className="" controlId="deletedusers">
                                                <Form.Check type="checkbox" label="Deleted Users" />
                                            </Form.Group>
                                        </li>
                                        <li>
                                            <Form.Group className="" controlId="blockedusers">
                                                <Form.Check type="checkbox" label="Blocked Users" />
                                            </Form.Group>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <a href="#"  className='bgbtnred' onClick={() => setLgShow(true)}>Add New User</a>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="user_table">
                            <div className="nftstable">
                                <div className="tablearea">
                                    <Table responsive className='m-0'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Full Name</th>
                                                <th>Email address</th>
                                                <th>Contact number</th>
                                                <th>Role</th>
                                                <th className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TableData.map((TableData, i) => (
                                                <tr key={TableData.id}>
                                                    <td>{TableData.count}</td>
                                                    <td>{TableData.fname}</td>
                                                    <td>{TableData.email}</td>
                                                    <td>{TableData.phone}</td>
                                                    <td>{TableData.name}</td>
                                                    <td>
                                                        <div className="table_icons d-flex align-items-center justify-content-center">
                                                            <div className="edit" onClick={() => setEditShow(true)}>
                                                                <a href="#" ><i className="far fa-edit"></i></a>
                                                            </div>
                                                            <div className="delete" onClick={() => setDeleteMod(true)}>
                                                                <a href="#" ><i className="far fa-trash-alt"></i></a>
                                                            </div>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="" className='p-0' id="dropdown-basic">
                                                                    <i className="fas fa-ellipsis-v"></i>
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#/action-1">Block User</Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>


                {/* New form Modal Component */}
                <Modal size="lg" className='user_modal' show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton className='border-bottom-0'>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h3>Create Users Management</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="user_form">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Select Role</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option value="Admin">Admin</option>
                                            <option value="Investor">Investor</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Button variant="" type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Edit Modal Component */}
                <Modal size="lg" className='user_modal' show={EditShow} onHide={() => setEditShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton className='border-bottom-0'>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h3>Edit</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="user_form">
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value="Chetu" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value="India" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value="abc@chetu.com" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" value="1234567890" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value="1234567890" />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-4" controlId="formBasicPassword">
                                        <Form.Label>Select Role</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option value="Admin">Admin</option>
                                            <option value="Investor">Investor</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Button variant="" type="submit">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Delete Modal Component */}
                <Modal className='user_modal' show={DeleteMod} onHide={() => setDeleteMod(false)} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton className='border-bottom-0'>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h3>Delete User</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className="user_form">
                            <Row>
                                <Col md={12}>
                                    <div className='delete-para'>
                                        <p>Are you sure you want to delete this items?</p>
                                    </div>
                                </Col>
                                <Col xs={6} md={6}>
                                    <div className='text-end'>
                                        <Button variant="dark" type="submit">
                                            Cancel
                                        </Button>
                                    </div>
                                </Col>
                                <Col xs={6} md={6}>
                                    <div className='text-start'>
                                        <Button variant="" type="submit">
                                            Delete
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </Wrapper>
    )
}

export default UserList