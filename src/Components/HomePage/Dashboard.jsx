// import React from "react";
// import Wrapper from "../Wrapper";
// import { Row, Col } from "react-bootstrap";

// const Dashboard = () => {
//   return (
//     <Wrapper>
//       <div className="dashbcontent">
//         <Row>
//           <Col>
//             <div className="collect-bg">
//               <h3>Vibezter Dashboard is Coming Soon...</h3>
//               <div className="">
//                 <a href="/" className="bgbtn">
//                   Discover
//                 </a>
//                 <a href="/" className="borderbtn">
//                   Create
//                 </a>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </Wrapper>
//   );
// };


import React from "react";
import Wrapper from "../Wrapper";
import { Row } from "react-bootstrap";
import "./Dashboard.css";
import dollar from "../fonts/dollar.svg";
import truck from "../fonts/truck-alt.svg";
import checkCircle from "../fonts/check-circled.svg";
import cart from "../fonts/cart-alt.svg";
import users from "../fonts/users-alt-5.svg";
import newspaper from "../fonts/newspaper.svg";

const Dashboard = () => {

  const DashboardCard = ({ title, number, link, iconImage, bgColor }) => {

    return (
      <div className={`col-md-12 col-lg-6 col-xl-4`}>
        <div className={`mycard ${bgColor}`}>
          <div className="left">
            <h5 className="title">{title}</h5>
            <span className="number">{number}</span>
            <a href="/#" className="link">
              View All
            </a>
          </div>
          <div className="right d-flex align-self-center">
            <div className="icon">
              <img
                src={iconImage}
                alt=""
                style={{ width: "60px", height: "60px" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (

    <Wrapper>

      <div className="dashbcontent">

        <Row>

          <div className="row row-cards-one">

            <DashboardCard
              title="Orders Pending!"
              number="88"
              link="https://geeken.in/admin/orders/pending"
              iconImage={dollar}
              bgColor="bg1"
            />

            <DashboardCard
              title="Orders Procsessing!"
              number="1"
              link="https://geeken.in/admin/orders/processing"
              iconImage={truck}
              bgColor="bg2"
            />

            <DashboardCard
              title="Orders Completed!"
              number="1"
              link="https://geeken.in/admin/orders/completed"
              iconImage={checkCircle}
              bgColor="bg3"
            />

            <DashboardCard
              title="Total Products!"
              number="509"
              link="https://geeken.in/admin/products"
              iconImage={cart}
              bgColor="bg4"
            />

            <DashboardCard
              title="Total Customers!"
              number="519"
              link="https://geeken.in/admin/users"
              iconImage={users}
              bgColor="bg5"
            />

            <DashboardCard
              title="Total Posts!"
              number="3"
              link="https://geeken.in/admin/blog"
              iconImage={newspaper}
              bgColor="bg6"
            />

          </div>

        </Row>

      </div>

    </Wrapper>

  );

};

export default Dashboard;
