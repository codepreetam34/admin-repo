import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import { Link } from "react-router-dom";
import DeleteDataModal from "./DeleteDataModal";
import DynamicModal from "Constants/DynamicModal";
import EditModalPage from "./EditModalPage";
import ViewModalPage from "./ViewModalPage";
import AddModalPage from "./AddModalPage";
import { getAllOrders } from "Redux/Slices/Order/Order";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [openAddModalPage, setOpenAddModalPage] = useState(false);
  const [openEditModalPage, setOpenEditModalPage] = useState(false);
  const [openViewModalPage, setOpenViewModalPage] = useState(false);
  const [addShowErrorToast, setAddShowErrorToast] = useState(false);
  const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
  const [addShowToastMessage, setAddShowToastMessage] = useState("");
  const [addShowToast, setAddShowToast] = useState(false);
  const [modalData, setModalData] = useState({ type: null, data: null });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const orderData = useSelector(
    (state) => state?.myOrders?.getAllOrderDetails?.allOrders
  );
  console.log("orderData ", orderData);
  const InitialRender = () => {
    return (
      <>
        <Col md={4}>
          <div className="user_heading">
            <h3 style={{ textTransform: "capitalize" }}>{"All Orders"}</h3>
            <p>Welcome to Orders page</p>
          </div>
        </Col>

        <Col md={4} style={{ paddingTop: "1.875rem" }}>
          <div className="manage_searchbar">
            <InputGroup className="">
              <InputGroup.Text id="basic-addon1" className="">
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Orders"
                className=""
                aria-label="Search Orders"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>
        </Col>

        {/* <Col md={4}>
          <div className="add_filter_btn d-flex justify-content-end">
            <div className="bgbtnred" onClick={handleAdd}>
              Add New Order
            </div>
          </div>
        </Col> */}
      </>
    );
  };

  const RenderTable = () => {
    return (
      <Col md={12}>
        <div className="user_table">
          <div className="nftstable">
            <div className="tablearea">
              <Table responsive className="m-0">
                <DataTableHeader />
                <DataTableBody />
              </Table>
            </div>
          </div>
        </div>
      </Col>
    );
  };
  const DataTableHeader = () => {
    return (
      <thead>
        <tr>
          {tableHeaders &&
            tableHeaders?.map((header, index) => (
              <th className={header?.class} key={index}>
                {header?.title}
              </th>
            ))}
        </tr>
      </thead>
    );
  };

  const DataTableBody = () => {
    return (
      <tbody>
        {orderData && orderData?.length > 0 ? (
          orderData?.map((userOrder, userIndex) => (
            <React.Fragment key={userIndex}>
              <tr>
                <td colSpan="7">
                  <strong>User: {userOrder?.user?.fullName}</strong>
                </td>
              </tr>
              {userOrder.orders.map((order, orderIndex) => (
                <tr key={orderIndex}>
                  <td>{orderIndex + 1}</td>
                  <td>{order?._id}</td>
                  <td>{order?.address?.name}</td>
                  <td>{order?.paymentStatus}</td>
                  <td>
                    {order?.orderStatus.find((ele) => ele.isCompleted)?.type ||
                      "N/A"}
                  </td>
                  <td>
                    <div className="table_icons d-flex align-items-center justify-content-center">
                      {tableActions &&
                        tableActions?.map((action, index) => (
                          <div
                            className={action?.class?.toLowerCase()}
                            onClick={() => action.onClick(order)}
                            key={index}
                          >
                            <Link to="#">
                              <i className={action.icon}></i>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="7">
              <div className="d-flex justify-content-center pt-4">
                <p className="text-red">Orders list is empty !!</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  const tableHeaders = [
    { title: "S.No.", class: "" },
    { title: "Order Id", class: "" },
    { title: "Receiver Name", class: "" },
    { title: "Payment Status", class: "" },
    { title: "Order Status", class: "" },
    { title: "Action", class: "text-center" },
  ];

  const tableActions = [
    {
      name: "View",
      class: "eye",
      icon: "fa-solid fa-eye",
      onClick: (data) => {
        setOpenViewModalPage(true);
        setOpenAddModalPage(false);
        setOpenEditModalPage(false);
        setModalData({ data: data });
      },
    },
    // {
    //   name: "Edit",
    //   class: "edit",
    //   icon: "far fa-edit",
    //   onClick: (data) => {
    //     setOpenEditModalPage(true);
    //     setOpenViewModalPage(false);
    //     setOpenAddModalPage(false);
    //     setModalData({ data: data });
    //   },
    // },
    // {
    //   name: "Delete",
    //   class: "delete",
    //   icon: "far fa-trash-alt",
    //   onClick: (data) => {
    //     setShowModal(true);
    //     setModalData({
    //       type: "Delete",
    //       data: data,
    //       modalContent: (
    //         <DeleteDataModal
    //           dataId={data._id}
    //           tagName={data?.tagName}
    //           setShowModal={setShowModal}
    //           setIsLoading={setIsLoading}
    //           setAddShowErrorToast={(err) => {
    //             setAddShowErrorToast(err);
    //           }}
    //           setAddShowErrorToastMessage={(msg) => {
    //             setAddShowErrorToastMessage(msg);
    //           }}
    //           setAddShowToast={(show) => {
    //             setAddShowToast(show);
    //           }}
    //           setAddShowToastMessage={(showMessage) => {
    //             setAddShowToastMessage(showMessage);
    //           }}
    //         />
    //       ),
    //       modalTitle: "Delete Modal",
    //     });
    //   },
    // },
  ];

  // const handleAdd = () => {
  //   setOpenAddModalPage(true);
  //   setOpenEditModalPage(false);
  //   setOpenViewModalPage(false);
  //   // setModalData({ type: "Add", data: null });
  // };

  return (
    <Wrapper>
      <div className="user_management_list">
        <Row>
          {isLoading && isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
              }}
            >
              <Spinner animation="border" role="status"></Spinner>
            </div>
          ) : (
            <>
              <InitialRender />{" "}
              {/* {openAddModalPage && openAddModalPage ? (
                <AddModalPage
                  setOpenAddModalPage={setOpenAddModalPage}
                  setIsLoading={setIsLoading}
                  setAddShowErrorToast={(err) => {
                    setAddShowErrorToast(err);
                  }}
                  setAddShowErrorToastMessage={(msg) => {
                    setAddShowErrorToastMessage(msg);
                  }}
                  setAddShowToast={(show) => {
                    setAddShowToast(show);
                  }}
                  setAddShowToastMessage={(showMessage) => {
                    setAddShowToastMessage(showMessage);
                  }}
                />
              ) : openEditModalPage && openEditModalPage ? (
                <EditModalPage
                  modalData={modalData?.data}
                  dataId={modalData?.data?._id}
                  setOpenEditModalPage={setOpenEditModalPage}
                  setIsLoading={setIsLoading}
                  setAddShowErrorToast={(err) => {
                    setAddShowErrorToast(err);
                  }}
                  setAddShowErrorToastMessage={(msg) => {
                    setAddShowErrorToastMessage(msg);
                  }}
                  setAddShowToast={(show) => {
                    setAddShowToast(show);
                  }}
                  setAddShowToastMessage={(showMessage) => {
                    setAddShowToastMessage(showMessage);
                  }}
                />
             ) :  */}{" "}
              {openViewModalPage && openViewModalPage ? (
                <ViewModalPage
                  modalData={modalData?.data}
                  setOpenViewModalPage={setOpenViewModalPage}
                />
              ) : (
                <RenderTable />
              )}
            </>
          )}
        </Row>
      </div>
      {modalData.type && (
        <DynamicModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          modalTitle={modalData.modalTitle}
          modalContent={modalData.modalContent}
        />
      )}{" "}
      {addShowErrorToast && (
        <ErrorToaster
          showErrorToast={addShowErrorToast}
          setShowErrorToast={setAddShowErrorToast}
          showErrorToastMessage={addShowErrorToastMessage}
          customErrorMessage={"Something went wrong! Please Try Again"}
        />
      )}
      {addShowToast && (
        <SuccessToaster
          showToast={addShowToast}
          setShowToast={setAddShowToast}
          showToastMessage={addShowToastMessage}
          customMessage={`Please recheck your entry once`}
        />
      )}
    </Wrapper>
  );
};

export default OrdersPage;
