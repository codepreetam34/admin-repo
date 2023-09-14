import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import the images
import Greenbox from "../../../../src/images/greenbox.png";
import Redbox from "../../../../src/images/redbox.png";
import Orangebox from "../../../../src/images/orangebox.png";
import Bluebox from "../../../../src/images/bluebox.png";

const PagesContainer = () => {
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
                <Col md={6} xl={6} xxl={3} key={index}>
                  <Link to={info?.boxHref} className="link-text">
                    <div className={`fourbox ${info?.imgClass}`}>
                      <img
                        src={info?.imgSrc}
                        className="img-fluid"
                        alt=""
                        loading="lazy"
                      />
                      <h4>{info?.title}</h4>
                      <p>Modify {info?.title} Frontend UI</p>
                      <h3>
                        <span className="greentext">Click</span> Here
                      </h3>
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
