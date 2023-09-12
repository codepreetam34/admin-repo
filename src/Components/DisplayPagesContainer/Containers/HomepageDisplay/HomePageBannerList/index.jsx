import React, { useState, useEffect } from "react";
import Wrapper from "../../../../Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageBanner } from "Redux/Slices/HomePageBanner/HomePageBannerSlice";
import DynamicModal from "./Modals/DynamicModal";

const HomePageBannerList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({ type: null, data: null });
  const dispatch = useDispatch();

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

  const banners = useSelector(
    (state) => state?.HomePageBanner?.homePagebanners?.homePageBanners
  );
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
      onClick: (nft) => {
        setModalData({ type: "View", data: nft });
      },
    },
    {
      name: "Edit",
      class: "edit",
      icon: "far fa-edit",
      onClick: (nft) => {
        setModalData({ type: "Edit", data: nft });
      },
    },
    {
      name: "Delete",
      class: "delete",
      icon: "far fa-trash-alt",
      onClick: (nft) => {
        setModalData({ type: "Delete", data: nft });
      },
    },
  ];

  const handleAdd = () => {
    setModalData({ type: "Add", data: null });
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
        {banners &&
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
          ))}
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
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
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
          onClose={() => setModalData({ type: null, data: null })}
          type={modalData.type}
          data={modalData.data}
          onSubmit={() => {
            // Handle form submission or deletion logic here based on modal type
          }}
        />
      )}
    </Wrapper>
  );
};

export default HomePageBannerList;
