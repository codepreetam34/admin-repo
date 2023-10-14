import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import { Link } from "react-router-dom";
import DeleteDataModal from "./DeleteDataModal";
import DynamicModal from "Constants/DynamicModal";
import AddTags from "./AddTags";
import EditTags from "./EditTags";
import ViewTags from "./ViewTags";

const TagsPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [openAddProductPage, setOpenAddProductPage] = useState(false);
  const [openEditProductPage, setOpenEditProductPage] = useState(false);
  const [openViewProductPage, setOpenViewProductPage] = useState(false);
  const [addShowErrorToast, setAddShowErrorToast] = useState(false);
  const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
  const [addShowToastMessage, setAddShowToastMessage] = useState("");
  const [addShowToast, setAddShowToast] = useState(false);
  const [modalData, setModalData] = useState({ type: null, data: null });
  const [showModal, setShowModal] = useState(false);
  const tagList = useSelector((state) => state?.tagList?.tags);
  const InitialRender = () => {
    return (
      <>
        <Col md={4}>
          <div className="user_heading">
            <h3 style={{ textTransform: "capitalize" }}>{"All Tags"}</h3>
            <p>Welcome to Tags page</p>
          </div>
        </Col>
        <Col md={4} style={{ paddingTop: "1.875rem" }}>
          <div className="manage_searchbar">
            <InputGroup className="">
              <InputGroup.Text id="basic-addon1" className="">
                <i className="fa-solid fa-magnifying-glass"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search NFT's"
                className=""
                aria-label="Search NFT's"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>
        </Col>
        <Col md={4}>
          <div className="add_filter_btn d-flex justify-content-end">
            <div className="bgbtnred" onClick={handleAdd}>
              Add New Tag
            </div>
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

  const DataTableBody = () => {
    return (
      <tbody>
        {tagList && tagList.length > 0 ? (
          tagList?.map((tag, index) => (
            <tr key={tag?._id}>
              <td>{index + 1}</td>
              <td>{tag?.name}</td>
              <td>{tag?.categoryName}</td>

              <td>
                <div
                  className="table_icons d-flex align-items-center justify-content-center"
                  key={index}
                >
                  {tableActions?.map((action, index) => (
                    <div
                      className={action.class.toLowerCase()}
                      onClick={() => action.onClick(tag)}
                    >
                      <Link to="#">
                        <i className={action.icon}></i>
                      </Link>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <div className="d-flex justify-content-center pt-4">
                <p className="text-red">Tag list is empty !!</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  };
  const tableHeaders = [
    { title: "S.No.", class: "" },
    { title: "Title", class: "" },
    { title: "Category", class: "" },
    { title: "Action", class: "text-center" },
  ];

  const tableActions = [
    {
      name: "View",
      class: "eye",
      icon: "fa-solid fa-eye",
      onClick: (data) => {},
    },
    {
      name: "Edit",
      class: "edit",
      icon: "far fa-edit",
      onClick: (data) => {},
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
              tagId={data._id}
              tagName={data?.name}
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
          modalTitle: "Delete Product",
        });
      },
    },
  ];

  const handleAdd = () => {};
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
              {openAddProductPage && openAddProductPage ? (
                <AddTags
                  setOpenAddProductPage={setOpenAddProductPage}
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
              ) : openEditProductPage && openEditProductPage ? (
                <EditTags
                  productData={modalData?.data}
                  setOpenEditProductPage={setOpenEditProductPage}
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
              ) : openViewProductPage && openViewProductPage ? (
                <ViewTags
                  productData={modalData?.data}
                  setOpenViewProductPage={setOpenViewProductPage}
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

export default TagsPage;
