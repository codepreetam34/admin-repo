import React from 'react'
import {Row, Col} from 'react-bootstrap';
import Greenbox from '../../../src/images/greenbox.png'
import Orangebox from '../../../src/images/orangebox.png'
import Bluebox from '../../../src/images/bluebox.png'
import Redbox from '../../../src/images/redbox.png'

const TotalBox = () => {
  return (
    <div className="fourboxarea">
        <Row>
            {}
            <Col md={6} xl={6} xxl={3}>
                <div className="fourbox green">
                    <img src={Greenbox} className='img-fluid' alt="" />
                    <h4>Total NFT</h4>
                    <p>25 Items</p>
                    <h3><span className='greentext'>23,000</span> BNB</h3>
                </div>
            </Col>
            <Col md={6} xl={6} xxl={3}>
                <div className="fourbox redbox">
                    <img src={Redbox} className='img-fluid' alt="" />
                    <h4>NFT Available</h4>
                    <p>25 Items</p>
                    <h3><span className='greentext'>23,000</span> BNB</h3>
                </div>
            </Col>
            <Col md={6} xl={6} xxl={3}>
                <div className="fourbox orangebox">
                    <img src={Orangebox} className='img-fluid' alt="" />
                    <h4>NFT Sold</h4>
                    <p>25 Items</p>
                    <h3><span className='greentext'>23,000</span> BNB</h3>
                </div>
            </Col>
            <Col md={6} xl={6} xxl={3}>
                <div className="fourbox bluebox">
                    <img src={Bluebox} className='img-fluid' alt="" />
                    <h4>NFT Created</h4>
                    <p>25 Items</p>
                    <h3><span className='greentext'>23,000</span> BNB</h3>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default TotalBox