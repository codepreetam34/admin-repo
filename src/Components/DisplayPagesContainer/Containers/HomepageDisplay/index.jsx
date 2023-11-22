import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// Import the images
import Greenbox from "../../../../../src/images/greenbox.png";
import Redbox from "../../../../../src/images/redbox.png";
import Orangebox from "../../../../../src/images/orangebox.png";
import Bluebox from "../../../../../src/images/bluebox.png";
import Wrapper from "../../../Wrapper";

const HomepageCategorySlider = () => {
  const navigate = useNavigate()
  const pageInfo = [
    {
      boxHref: "/display-pages/homepage-display/homepage-banner-list",
      imgSrc: Greenbox,
      title: "Home Page Banner List",
      imgClass: "green",
    },
    {
      boxHref: "/display-pages/homepage-display/homepage-category-slider",
      imgSrc: Redbox,
      title: "Two Ads Banner",
      imgClass: "redbox",
    },
    {
      boxHref: "/",
      imgSrc: Orangebox,
      title: "Product Page",
      imgClass: "orangebox",
    },
    {
      boxHref: "/",
      imgSrc: Bluebox,
      title: "Cart Page",
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
                    <Col md={6} xl={6} xxl={3} key={index}>
                      <Link to={info?.boxHref} className="link-text">
                        <div className={`fourbox ${info?.imgClass} d-flex justify-content-center flex-column align-items-center`}>
                          <div class="">
                            <div className="pb-1">
                              <img
                                src={info?.imgSrc}
                                className="img-fluid"
                                alt=""
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <h4>{info?.title}</h4>
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

export default HomepageCategorySlider;
