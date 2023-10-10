import React, { useState, useEffect } from "react";
import Wrapper from "../../../../Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageBanner } from "Redux/Slices/HomePageBanner/HomePageBannerSlice";
import DynamicModal from "Constants/DynamicModal";
import ViewDataModal from "./Modals/ViewDataModal";
import EditDataModal from "./Modals/EditDataModal";
import DeleteDataModal from "./Modals/DeleteDataModal";
import AddDataModal from "./Modals/AddDataModal";

const HomePageBannerList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    type: null,
    data: null,
    modalContent: <></>,
    modalTitle: null,
  });
  const dispatch = useDispatch();

  const banners = useSelector(
    (state) => state?.HomePageBanner?.homePagebanners?.homePageBanners
  );
  useEffect(() => {
    if (!banners || banners.length === 0) {
      setIsLoading(true);
      dispatch(getHomePageBanner()).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, banners]);

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
        setModalData({
          type: "View",
          data: data,
          modalContent: <ViewDataModal />,
          modalTitle: "View Category",
        });
      },
    },
    {
      name: "Edit",
      class: "edit",
      icon: "far fa-edit",
      onClick: (data) => {
        setModalData({
          type: "Edit",
          data: data,
          modalContent: <EditDataModal />,
          modalTitle: "Edit Category",
        });
      },
    },
    {
      name: "Delete",
      class: "delete",
      icon: "far fa-trash-alt",
      onClick: (data) => {
        setModalData({
          type: "Delete",
          data: data,
          modalContent: <DeleteDataModal />,
          modalTitle: "Delete Category",
        });
      },
    },
  ];

  const handleAdd = () => {
    setModalData({
      type: "Add",
      data: null,
      modalContent: <AddDataModal />,
      modalTitle: "Add Category",
    });
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
                  src={banner?.banners[0]?.img}
                  alt=""
                  width={70}
                  height={70}
                  loading="lazy"
                />
              </td>
              <td>
                <div
                  className="table_icons d-flex align-items-center justify-content-center"
                  key={index}
                >
                  {tableActions?.map((action, index) => (
                    <div
                      className={action.class.toLowerCase()}
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
                <p className="text-red">Homepage Banner list is empty !!</p>
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
            <h3>HomePage Carousel Banners</h3>
            <p>Welcome to HomePage Banner page</p>
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
              <Spinner animation="border" role="status"></Spinner>
            </div>
          ) : (
            <>
              <InitialRender />
              <RenderTable />
            </>
          )}
        </Row>
      </div>

      {/* Render the dynamic Modal component */}
      {modalData.type && (
        <DynamicModal
          show={true}
          onClose={() =>
            setModalData({
              type: null,
              data: null,
              modalContent: <></>,
              modalTitle: null,
            })
          }
          type={modalData.type}
          data={modalData.data}
          modalTitle={modalData.modalTitle}
          modalContent={modalData.modalContent}
          onSubmit={() => {
            // Handle form submission or deletion logic here based on modal type
          }}
        />
      )}
    </Wrapper>
  );
};

export default HomePageBannerList;
