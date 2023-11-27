import React, { useState, useEffect } from "react";
import Wrapper from "../../../../Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DynamicModal from "Constants/DynamicModal";
import DeleteDataModal from "./Modals/DeleteDataModal";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import AddModalPage from "./Modals/AddModalPage";
import EditModalPage from "./Modals/EditModalPage";
import ViewModalPage from "./Modals/ViewModalPage";
import { useNavigate } from "react-router-dom";
import { getHomePageTwoAdsBanner } from "Redux/Slices/TwoAdsBanner/TwoAdsBannerSlice";
const HomePageCategorySlider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true);

  const [addShowErrorToast, setAddShowErrorToast] = useState(false);
  const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
  const [addShowToastMessage, setAddShowToastMessage] = useState("");
  const [addShowToast, setAddShowToast] = useState(false);

  const [OpenAddModalPage, setOpenAddModalPage] = useState(false);
  const [OpenEditModalPage, setOpenEditModalPage] = useState(false);
  const [openViewModalPage, setOpenViewModalPage] = useState(false);

  const [modalData, setModalData] = useState({
    type: null,
    data: null,
    modalContent: <></>,
    modalTitle: null,
  });
  const dispatch = useDispatch();

  const banners = useSelector(
    (state) => state?.twoAdsBanner?.twoAdsBanners?.homepageBanner
  );
  useEffect(() => {
    if (banners == [] || !banners || banners.length === 0) {
      setIsLoading(true);
      dispatch(getHomePageTwoAdsBanner()).then((res) => {
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  const tableHeaders = [
    { title: "S.No.", class: "" },
    { title: "Title", class: "" },
    { title: "Image", class: "" },
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
              bannerId={data._id}
              productName={data?.title}
              setShowModal={setShowModal} // Make sure you pass setShowModal
              setAddShowErrorToast={(err) => {
                setAddShowErrorToast(err);
              }} // Pass setShowErrorToast
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
          modalTitle: "Delete Category",
        });
      },
    },
  ];
  const handleAdd = () => {
    setOpenAddModalPage(true);
    setOpenEditModalPage(false);
    setOpenViewModalPage(false);
    // setModalData({ type: "Add", data: null });
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
        {banners && banners.length > 0 ? (
          banners?.map((banner, index) => (
            <tr key={banner?._id}>
              <td>{index + 1}</td>
              <td>{banner?.title}</td>
              <td>
                <img
                  src={banner?.banner}
                  alt=""
                  width={70}
                  height={70}
                  loading="lazy"
                  style={{ borderRadius: "10px" }}
                />
              </td>
              <td>
                <div
                  className="table_icons d-flex align-items-center justify-content-center"
                  key={index}
                >
                  {tableActions && tableActions?.map((action, index) => (
                    <div
                      className={action?.class?.toLowerCase()}
                      onClick={() => action.onClick(banner)}
                    >
                      <a href="#">
                        <i className={action.icon}></i>
                      </a>
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
                <p className="text-red">Homepage Two Ads Banner list is empty !!</p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  const InitialRender = () => {
    return (
      <>
        <Col md={4}>
          <div className="user_heading">
            <h3>HomePage Two Ads  Banners</h3>
            <p>Welcome to HomePage Two Ads Banner page</p>
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
            <a href="#" className="bgbtnred" onClick={handleAdd}>
              Add New Banner
            </a>
          </div>
        </Col>
      </>
    );
  };

  const RenderTable = () => {

    return (
      <Col md={12}>
        <div
          className="text_heading pt-4"
          style={{ cursor: "pointer" }}
          onClick={() => { navigate(-1) }}
        >
          <i class="fa-solid fa-arrow-left"></i> <span>Back</span>
        </div>
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
              <Spinner animation="border" role="status">
                <span className="sr-only"></span>
              </Spinner>
            </div>
          ) : (
            <>
              <InitialRender />
              {OpenAddModalPage && OpenAddModalPage ? (
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
              ) : OpenEditModalPage && OpenEditModalPage ? (
                <EditModalPage
                  bannerById={modalData?.data}
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
                  bannerData={modalData?.data}
                  setOpenViewModalPage={setOpenViewModalPage}
                />
              ) : (
                <RenderTable />
              )}
            </>
          )}
        </Row>
      </div>

      {/* Render the dynamic Modal component */}
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

export default HomePageCategorySlider;
