import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import the images:
// ------------------
//import Greenbox from "../../../../src/images/greenbox.png";
//import Redbox from "../../../../src/images/redbox.png";
//import Orangebox from "../../../../src/images/orangebox.png";
//import Bluebox from "../../../../src/images/bluebox.png";

const PagesContainer = () => {

  const Greenbox = '<i class="fa-solid fa-house-circle-check fa-2xl" style="color: #00ada3;"></i>';
  const Redbox = '<i class="fa-solid fa-clipboard-list fa-2xl" style="color: #801317;"></i>';
  const Orangebox = '<i class="fa-brands fa-product-hunt fa-2xl" style="color: #ff9f5e;"></i>';
  const Bluebox = '<i class="fa-solid fa-cart-plus fa-2xl" style="color: #31456c;"></i>'

  const pageInfo = [
    {
      boxHref: "/display-pages/homepage-display",
      imgSrc: Greenbox,
      title: "Home Page",
      imgClass: "greenbox",
    },
    {
      boxHref: "#",
      imgSrc: Redbox,
      title: "Category Page",
      imgClass: "redbox",
    },
    {
      boxHref: "#",
      imgSrc: Orangebox,
      title: "Product Page",
      imgClass: "orangebox",
    },
    {
      boxHref: "#",
      imgSrc: Bluebox,
      title: "Cart Page",
      imgClass: "bluebox",
    },
  ];

  return (
    <div className="fourboxarea">
      <Row>
        {/* Use the Box component for each box */}
        {pageInfo &&
          pageInfo?.map((info, index) => {
            return (
              <>
                <Col md={6} xl={6} xxl={3} key={index} style={{ paddingBottom: "2rem" }}>
                  <Link to={info?.boxHref} className="link-text">
                    <div
                      className={`fourbox ${info?.imgClass} d-flex justify-content-center flex-column align-items-center`}
                    >
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
              </>
            );
          })}
      </Row>
    </div>
  );
};

export default PagesContainer;
