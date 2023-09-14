import React from "react";
import Wrapper from "../Wrapper";
import { Row, Col } from "react-bootstrap";
import PagesContainer from "./Components/PagesContainer";
const DisplayPagesContainer = () => {
  return (
    <>
      {" "}
      <Wrapper>
        {" "}
        <div className="user_management_list">
          <Row>
            <Col md={6}>
              <div className="user_heading">
                <h3>Discover our pages</h3>
                <p>
                  Welcome to the hub where admins wield their magic on frontend
                  pages.
                </p>
              </div>
            </Col>

            <Col md={12} className="mt-4">
              <PagesContainer />
            </Col>
          </Row>
        </div>
      </Wrapper>
    </>
  );
};

export default DisplayPagesContainer;
