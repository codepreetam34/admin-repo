import React from 'react';
import { Col, Row, Table, Form, Modal } from 'react-bootstrap';
import Wrapper from '../Wrapper';
import ReportData from '../../JsonFile/ReportJson';
import { useState } from 'react';
import ModalData from '../../JsonFile/ModalHisJson';
import ModalImg from '../../../src/images/modal-img.png';

const ReportCompo = () => {

    const [AllRepData] = useState(ReportData);
    const [MoHisTabData] = useState(ModalData);
    const [viewtrans, setViewTrans] = useState(false);

    return (
        <Wrapper>
            <div className='user_management_list'>
                <div className='report_page'>
                    <Row>
                        <Col md={12}>
                            <div className="user_heading">
                                <h3>Report</h3>
                                <p>Welcome to the Report page</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='py-md-5'>
                        <Col md={6} lg={4} xl={5} xxl={4}>
                            <div className='revenue_box'>
                                <h4 className='pb-2'>Total Revenue</h4>
                                <h3><span className="text-red">23,000</span> BNB</h3>
                                <h5>Last Week Revenue</h5>
                                <h3 className='small-text'><span className="text-red">23,000</span> BNB</h3>
                            </div>
                        </Col>
                        <Col md={6} lg={4} xl={5} xxl={4}>
                            <div className='revenue_box'>
                                <h4 className='pb-2'>Recent Transaction</h4>
                                <div className='recent_transfer d-flex justify-content-between'>
                                    <div className='pb-3'>
                                        <span>On  16-June-2022</span>
                                        <h5>For Dark Night artwork</h5>
                                    </div>
                                    <div>
                                        <p><span>23</span> BNB</p>
                                    </div>
                                </div>
                                <div className='recent_transfer d-flex justify-content-between'>
                                    <div>
                                        <span>On  16-June-2022</span>
                                        <h5>For Life of Art</h5>
                                    </div>
                                    <div>
                                        <p><span>77</span> BNB</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                    <Row className='pt-lg-5 align-items-center'>
                        <Col md={4} lg={3}>
                            <div className="user_heading">
                                <h3>NFT Transactions</h3>
                            </div>
                        </Col>
                        <Col md={8} lg={9}>
                            <div className='date_filter d-md-flex align-items-center justify-content-end'>
                                <p className='m-md-0'>Filter by date</p>
                                <div className='mx-md-3'>
                                    <Form.Control type="text" placeholder='From' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} />
                                </div>
                                <div>
                                    <Form.Control type="text" placeholder='To' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='pt-4 nftstable p-0'>
                            <div className='tablearea'>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>NFT Item</th>
                                            <th>Price(BNB)</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Time Sold</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AllRepData.map((AllRepData, i) => (
                                            <tr key={AllRepData.id}>
                                                <td><img src={AllRepData.nftitemimg} className='img-fluid' alt="" /> {AllRepData.nftitem}</td>
                                                <td><img src={AllRepData.priceimg} className='img-fluid' alt="" /> {AllRepData.price}</td>
                                                <td>{AllRepData.from}</td>
                                                <td>{AllRepData.to}</td>
                                                <td>{AllRepData.timesold}</td>
                                                <td>
                                                    <div className="eye" onClick={() => setViewTrans(true)}>
                                                        <i className="fa-solid fa-eye"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

            {/* Edit Modal Component */}
            <Modal size="xl" className='user_modal' show={viewtrans} onHide={() => setViewTrans(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton className='border-bottom-0'>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        <h3>NFT Transactions History</h3>
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
        </Wrapper >
    )
}

export default ReportCompo