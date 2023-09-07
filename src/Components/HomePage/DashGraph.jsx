import React from 'react'
import {Row, Col} from 'react-bootstrap';
import SellHistory from '../../../src/images/sell_history.png'
import MarketVisiting from '../../../src/images/marketvisiting.png'

const DashGraph = () => {
  return (
    <div className='grapharea'>
        <Row>
            <Col md={6}>
                <div className="sellhistory">
                    <img src={SellHistory} className='img-fluid' alt="" />
                </div>
            </Col>
            <Col md={6}>
                <div className="marketvisitor">
                    <img src={MarketVisiting} className='img-fluid' alt="" />
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default DashGraph