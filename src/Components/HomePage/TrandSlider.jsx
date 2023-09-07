import React from 'react'
import {Row, Col} from 'react-bootstrap'

const TrandSlider = (props) => {
  return (
    <div className='trandnfts'>
        <div className="d-flex justify-content-between align-items-center">
            <h3>Trending NFTs</h3>
            <a href="#"  className='text-decoration-none'>View More</a>
        </div>
        <Row>
            {props.ATData.map((ATData, i) => (
                <Col md={6} lg={3} key={ATData.id}>
                    <div className="sliderbox">
                        <img src={ATData.boxImg} className='img-fluid boximg' alt="" />
                        <div className="d-flex justify-content-between align-items-center py-2">
                            <span>{ATData.OffcialName}</span>
                            <span className='m-0'>{ATData.TopBidNmae}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4>{ATData.BoxName}</h4>
                            <h4><img src={ATData.solanaimg} className='img-fluid' alt="" /> {ATData.BoxPoint}</h4>
                        </div>
                        <div className="text-end">
                            <a href="#"  className='bgbtn'>Place Bid</a>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default TrandSlider