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
                <h3>Display Pages</h3>
                <p>Welcome to all display screen page</p>
              </div>
            </Col>

            <Col md={12}>
              {" "}
              <PagesContainer />
            </Col>
          </Row>
        </div>
      </Wrapper>
    </>
  );
};

export default DisplayPagesContainer;
