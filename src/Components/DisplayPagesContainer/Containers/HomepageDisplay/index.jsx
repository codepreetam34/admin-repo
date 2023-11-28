import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "../../../Wrapper";

// Import the images
// import Greenbox from "../../../../../src/images/greenbox.png";
// import Redbox from "../../../../../src/images/redbox.png";
// import Orangebox from "../../../../../src/images/orangebox.png";
// import Bluebox from "../../../../../src/images/bluebox.png";

const HomepageTwoAdsBanner = () => {

  const Greenbox = '<i class="fa-solid fa-house-circle-check fa-2xl" style="color: #00ada3;"></i>';
  const Redbox = '<i class="fa-solid fa-clipboard-list fa-2xl" style="color: #801319;"></i>';
  const Orangebox = '<i class="fa-brands fa-product-hunt fa-2xl" style="color: #ff9f5e;"></i>';
  const Bluebox = '<i class="fa-solid fa-cart-plus fa-2xl" style="color: #31456c;"></i>'

  const navigate = useNavigate();
  
  const pageInfo = [
    {
      boxHref: "/display-pages/homepage-display/homepage-banner-list",
      imgSrc: Greenbox,
      title: "Home Page Banner List",
      imgClass: "greenbox",
    },
    {
      boxHref: "/display-pages/homepage-display/homepage-two-ads-banner",
      imgSrc: Redbox,
      title: "Two Ads Banner",
      imgClass: "redbox",
    },
    {
      boxHref: "/display-pages/homepage-display/homepage-shop-by-occasion",
      imgSrc: Orangebox,
      title: "Shop By Occasion",
      imgClass: "orangebox",
    },
    {
      boxHref: "/display-pages/homepage-display/homepage-pamper-zone",
      imgSrc: Bluebox,
      title: "Pamper Zone",
      imgClass: "bluebox",
    },
  ];

  return (
    <Wrapper>
      <div className="user_management_list">
        <Row>
          <Col md={6}>
            <div className="user_heading">
              <h3>Display Pages</h3>
              <p>Welcome to all display screen page</p>
            </div>
          </Col>
          <Col md={12}>
            <div
              className="text_heading pt-4"
              style={{ cursor: "pointer" }}
              onClick={() => { navigate(-1) }}
            >
              <i class="fa-solid fa-arrow-left"></i> <span>Back</span>
            </div>
            <div className="fourboxarea">
              <Row>
                {pageInfo &&
                  pageInfo?.map((info, index) => (
                    <Col md={6} xl={6} xxl={3} key={index} style={{ paddingBottom: "2rem" }}>
                      <Link href={info?.boxHref} className="link-text">
                        <div className={`fourbox ${info?.imgClass} d-flex justify-content-center flex-column align-items-center`}>
                          <div class="">
                            <div className="pb-1">
                              {/* <img
                                src={info?.imgSrc}
                                className="img-fluid"
                                alt=""
                                loading="lazy"
                              /> */}
                              <span dangerouslySetInnerHTML={{ __html: info.imgSrc }} />
                            </div>
                          </div>
                          <h4 style={{
                            margin: "0",
                            paddingTop: "8px"
                          }}>{info?.title}</h4>
                          <div>
                            <span className="greentext">Update &nbsp;</span>Page
                          </div>
                        </div>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default HomepageTwoAdsBanner;
