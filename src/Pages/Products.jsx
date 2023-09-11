import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DynamicModal from "Components/DisplayPagesContainer/Containers/HomepageDisplay/HomePageBannerList/Modals/DynamicModal";
import { useParams } from "react-router-dom";
import { getProductsByCategoryId } from "Redux/Slices/Products/ProductsSlice";
const Products = () => {
  const params = useParams();
  const { id } = params;
  const [modalData, setModalData] = useState({ type: null, data: null });
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByCategoryId(id))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  const productsList = useSelector(
    (state) => state?.ProductsByCatId?.ProductsByCatId?.products
  );
  const pageTitle = useSelector(
    (state) => state?.ProductsByCatId?.ProductsByCatId?.pageTitle
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
      onClick: (data) => {
        setModalData({ type: "View", data: data });
      },
    },
    {
      name: "Edit",
      class: "edit",
      icon: "far fa-edit",
      onClick: (data) => {
        setModalData({ type: "Edit", data: data });
      },
    },
    {
      name: "Delete",
      class: "delete",
      icon: "far fa-trash-alt",
      onClick: (data) => {
        setModalData({ type: "Delete", data: data });
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
        {productsList &&
          productsList?.map((category, index) => (
            <tr key={category?._id}>
              <td>{index + 1}</td>
              <td>{category?.name}</td>
              <td>
                <img
                  src={category?.productPictures[0].img}
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
                      onClick={() => action.onClick(category)}
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
            <h3 style={{ textTransform: "capitalize" }}>
              {pageTitle ? `${pageTitle} Products` : "Products"}
            </h3>
            <p>Welcome to Category page</p>
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
              Add New Product
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
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="300px"
            >
              Loading...
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

export default Products;
