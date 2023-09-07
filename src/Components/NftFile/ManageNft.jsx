import React, { useState } from 'react';
import Wrapper from '../Wrapper';
import { Row, Col, Form, Table, Modal, Button, InputGroup } from 'react-bootstrap';
import allManageNft from '../../JsonFile/ManageNftData';
import ModalData from '../../JsonFile/ModalHisJson';
import ModalImg from '../../../src/images/modal-img.png';

const ManageNft = () => {

    const [MoHisTabData] = useState(ModalData);
    const [Nfts] = useState(allManageNft);
    const [ViewNfts, setViewNfts] = useState(false);
    const [NftDelete, setNftDelete] = useState(false);
    const [NftEdit, setNftEdit] = useState(false);

    return (
        <Wrapper>
            <div className="user_management_list">
                <Row>
                    <Col md={8}>
                        <div className="user_heading">
                            <h3>Manage NFT</h3>
                            <p>Welcome to manage NFT page</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="manage_searchbar">
                            <InputGroup className="">
                                <InputGroup.Text id="basic-addon1" className=''><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                                <Form.Control placeholder="Search NFT's" className='' aria-label="Search NFT's" aria-describedby="basic-addon1" />
                            </InputGroup>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="user_table">
                            <div className="nftstable">
                                <div className="tablearea">
                                    <Table responsive className='m-0'>
                                        <thead>
                                            <tr>
                                                <th>NFT Item</th>
                                                <th>Price(BNB)</th>
                                                <th>Date Created</th>
                                                <th>Status</th>
                                                <th className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Nfts.map((Nfts, i) => (
                                                <tr key={Nfts.id}>
                                                    <td> <img src={Nfts.nftitemimg} alt="" /> {Nfts.nftitem}</td>
                                                    <td><img src={Nfts.priceimg} alt="" /> {Nfts.price}</td>
                                                    <td>{Nfts.datecreated}</td>
                                                    <td>{Nfts.status}</td>
                                                    <td>
                                                        <div className="table_icons d-flex align-items-center justify-content-center">
                                                            <div className="eye" onClick={() => setViewNfts(true)}>
                                                                <a href="#" ><i className="fa-solid fa-eye"></i></a>
                                                            </div>
                                                            <div className="edit" onClick={() => setNftEdit(true)}>
                                                                <a href="#" ><i className="far fa-edit"></i></a>
                                                            </div>
                                                            <div className="delete" onClick={() => setNftDelete(true)}>
                                                                <a href="#" ><i className="far fa-trash-alt"></i></a>
                                                            </div>
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
            </div>

            {/* Edit Modal Component */}
            <Modal size="xl" className='user_modal' show={ViewNfts} onHide={() => setViewNfts(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton className='border-bottom-0'>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>Manage NFT View</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="user_form">
                        <Row>
                            <Col md={12} lg={3}>
                                <div className=''>
                                    <img src={ModalImg} className='img-fluid' alt="" />
                                </div>
                            </Col>
                            <Col md={12} lg={9}>
                                <div className='view-details'>
                                    <h4>Dark Knight</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                                        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                                        book... <span className='text-red'>Read more</span></p>
                                    <div>
                                        <ul className='p-0 m-0 d-flex'>
                                            <li>
                                                <span>Price -</span>
                                                <div className='d-flex align-items-center'>
                                                    <img src="./images/solana.png" className='img-fluid' alt="" />
                                                    <p>95.533 BNB</p>
                                                </div>
                                            </li>
                                            <li>
                                                <span>Owned by -</span>
                                                <div className='d-flex align-items-center'>
                                                    <p>John</p>
                                                    <img src="./images/tooltip-check.png" className='img-fluid' alt="" />
                                                </div>
                                            </li>
                                            <li>
                                                <span>Created by -</span>
                                                <div className='d-flex align-items-center'>
                                                    <p>John</p>
                                                    <img src="./images/tooltip-check.png" className='img-fluid' alt="" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} lg={5}>
                                <div className='details_box'>
                                    <h4>Details -</h4>
                                    <ul className='p-0 m-0'>
                                        <li>
                                            <span>Contract Address:</span>
                                            <span className='text-red'>73ee30Af1F</span>
                                        </li>
                                        <li>
                                            <span>Token ID:</span>
                                            <span>7144</span>
                                        </li>
                                        <li>
                                            <span>Token Standard:</span>
                                            <span>ERC-721</span>
                                        </li>
                                        <li>
                                            <span>Blockchain:</span>
                                            <span>Solana</span>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={12} lg={7}>
                                <div className='details_box'>
                                    <h4>History -</h4>
                                    <div className="modaltable">
                                        <Table responsive className='m-0'>
                                            <thead className='custom_variant'>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                    <th>Price</th>
                                                    <th>Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {MoHisTabData.map((MoHisTabData, index) => (
                                                    <tr key={MoHisTabData.id}>
                                                        <td>{MoHisTabData.name}</td>
                                                        <td>{MoHisTabData.action}</td>
                                                        <td><img src={MoHisTabData.priceimg} className='img-fluid' alt="" /> {MoHisTabData.price}</td>
                                                        <td>{MoHisTabData.time}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Modal Component */}
            <Modal size="lg" className='user_modal' show={NftEdit} onHide={() => setNftEdit(false)} aria-labelledby="example-modal-sizes-title-lg">
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
                                    <Form.Label>Surnames</Form.Label>
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
            <Modal className='user_modal' show={NftDelete} onHide={() => setNftDelete(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton className='border-bottom-0'>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>Delete Manage NFT</h3>
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

        </Wrapper>
    )
}

export default ManageNft