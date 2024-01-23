import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import { Link } from "react-router-dom";
import { getAllUsers } from "Redux/Slices/Users/Users";
import DynamicModal from "Constants/DynamicModal";
import ViewModalPage from "./ViewModalPage";
import DeleteDataModal from "./DeleteDataModal";
import EditModalPage from "./EditModalPage";
import AddModalPage from "./AddModalPage";

const UsersPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openViewModalPage, setOpenViewModalPage] = useState(false);
  const [addShowErrorToast, setAddShowErrorToast] = useState(false);
  const [addShowToast, setAddShowToast] = useState(false);
  const [modalData, setModalData] = useState({ type: null, data: null });
  const [showModal, setShowModal] = useState(false);
  const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
  const [addShowToastMessage, setAddShowToastMessage] = useState("");
  const [openAddModalPage, setOpenAddModalPage] = useState(false);
  const [openEditModalPage, setOpenEditModalPage] = useState(false);
  const auth = localStorage.getItem("Sidebar_Module_Assigned_Admin");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userData = useSelector((state) => state?.usersStore?.getAllUserDetails);

  const InitialRender = () => {
    return (
      <>
        <Col md={4}>
          <div className="user_heading">
            <h3 style={{ textTransform: "capitalize" }}>{"All Users"}</h3>
            <p>Welcome to Users page</p>
          </div>
        </Col>

        <Col md={4} style={{ paddingTop: "1.875rem" }}>
          <div className="manage_searchbar">
            <InputGroup className="">
              <InputGroup.Text id="basic-addon1" className="">
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search Users"
                className=""
                aria-label="Search Users"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>
        </Col>
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
  const onViewDetail = (data) => {
    setOpenViewModalPage(true);
    setModalData({ data: data });
  };
  const DataTableBody = () => {
    return (
      <>
        <React.Fragment>
          <tbody>
            {userData && userData?.length > 0 ? (
              userData?.map((user, userIndex) => (
                <tr key={userIndex}>
                  <td>{userIndex + 1}</td>
                  <td>{`${user?.firstName} ${user?.lastName}`}</td>
                  <td>{user?.email}</td>
                  <td>
                    {new Date(user?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user?.verified ? "verified" : "not-verified"
                      }`}
                    >
                      {user?.verified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  <td>
                    <div className="table_icons d-flex align-items-center justify-content-center">
                      {auth && auth.role === "super-admin" ? (
                        tableActions &&
                        tableActions?.map((action, index) => (
                          <div
                            className={action?.class?.toLowerCase()}
                            onClick={() => action.onClick(user)}
                            key={index}
                          >
                            <Link to="#">
                              <i className={action.icon}></i>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <>
                          <div
                            className="eye"
                            onClick={() => onViewDetail(user)}
                          >
                            <Link to="#">
                              <i className="fa-solid fa-eye"></i>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div className="d-flex justify-content-center pt-4">
                    <p className="text-red">Users list is empty !!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </React.Fragment>
      </>
    );
  };

  const tableHeaders = [
    { title: "S.No.", class: "" },
    { title: "Full Name", class: "" },
    { title: "Email", class: "" },
    { title: "Join Date", class: "" },
    { title: "Verified", class: "" },
    { title: "Action", class: "text-center" },
  ];

  const tableActions = [
    {
      name: "View",
      class: "eye",
      icon: "fa-solid fa-eye",
      onClick: (data) => {
        setOpenViewModalPage(true);
        setModalData({ data: data });
      },
    },
    {
      name: "Edit",
      class: "edit",
      icon: "far fa-edit",
      onClick: (data) => {
        setOpenEditModalPage(true);
        setOpenViewModalPage(false);
        setOpenAddModalPage(false);
        setModalData({ data: data });
      },
    },

    {
      name: "Delete",
      class: "delete",
      icon: "far fa-trash-alt",
      onClick: (data) => {
        setShowModal(true);
        setModalData({
          type: "Delete",
          data: data,
          modalContent: (
            <DeleteDataModal
              dataId={data._id}
              tagName={data?.email}
              setShowModal={setShowModal}
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
          ),
          modalTitle: "Delete Modal",
        });
      },
    },
  ];

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
              {openAddModalPage && openAddModalPage ? (
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
              ) : openViewModalPage && openViewModalPage ? (
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
      )}
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

export default UsersPage;
