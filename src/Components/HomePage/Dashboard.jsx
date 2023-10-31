import React from 'react';
import Wrapper from '../Wrapper';
import { Row, Col } from 'react-bootstrap';
import TotalBox from '../HomePage/TotalBox'
import DashGraph from './DashGraph';
import NftsTable from './NftsTable';
import TrandSlider from './TrandSlider';
import AllTrendData from '../../JsonFile/TrendData'
import CollectionTwo from '../../../src/images/collection-2.png'
import Collectionthree from '../../../src/images/collection-3.png'
import CollectionFour from '../../../src/images/collection-4.png'
import CollectionFive from '../../../src/images/collection-5.png'
import Banner from '../../../src/images/banner-01.png'


const Dashboard = () => {

  return (
    <Wrapper>

      <div className="dashbcontent">
        <Row>

          <Col>
            <div className="collect-bg">
              <h3>Vibezter Dashboard is Coming Soon...</h3>
              <div className="">
                <a href="#" className='bgbtn'>Discover</a> 
                <a href="#" className='borderbtn'>Create</a>
              </div>
            </div>
          </Col>

          {/* <Col md={6} xl={5} xxl={4}>
            <div className="top-creators">

              <div className="boxheading d-flex justify-content-between">
                <h4 className='m-0'>Top Creators</h4>
                <a href='#'>See all</a>
              </div>

              <div className="creators-list">
                <ul className='m-0'>
                  <li className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                      <img src={CollectionTwo} className='img-fluid' alt="" />
                      <div className="">
                        <h5 className='m-0'>Liguid Wave</h5>
                        <p className='m-0'>@Liguid Wave</p>
                      </div>
                    </div>
                    <div className="">
                      <a href="#"  className='bgbtn'>Following</a>
                    </div>
                  </li>
                  <li className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                      <img src={Collectionthree} className='img-fluid' alt="" />
                      <div className="">
                        <h5 className='m-0'>Liguid Wave</h5>
                        <p className='m-0'>@Liguid Wave</p>
                      </div>
                    </div>
                    <div className="">
                      <a href="#"  className='lightbtn'>Follow</a>
                    </div>
                  </li>
                  <li className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                      <img src={CollectionFour} className='img-fluid' alt="" />
                      <div className="">
                        <h5 className='m-0'>Liguid Wave</h5>
                        <p className='m-0'>@Liguid Wave</p>
                      </div>
                    </div>
                    <div className="">
                      <a href="#"  className='lightbtn'>Follow</a>
                    </div>
                  </li>
                  <li className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                      <img src={CollectionFive} className='img-fluid' alt="" />
                      <div className="">
                        <h5 className='m-0'>Liguid Wave</h5>
                        <p className='m-0'>@Liguid Wave</p>
                      </div>
                    </div>
                    <div className="">
                      <a href="#"  className='lightbtn'>Follow</a>
                    </div>
                  </li>
                  <li className='d-flex justify-content-between align-items-center'>
                    <div className="d-flex align-items-center">
                      <img src={Banner} className='img-fluid' alt="" />
                      <div className="">
                        <h5 className='m-0'>Liguid Wave</h5>
                        <p className='m-0'>@Liguid Wave</p>
                      </div>
                    </div>
                    <div className="">
                      <a href="#"  className='lightbtn'>Follow</a>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </Col> */}

        </Row>
      </div>

      {/* <TotalBox />
      <DashGraph />
      <NftsTable />
      <TrandSlider ATData={AllTrendData} /> */}

    </Wrapper>
  )
}

export default Dashboard
