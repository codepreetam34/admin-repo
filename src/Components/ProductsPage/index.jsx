import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DynamicModal from "Constants/DynamicModal";
import { Link } from "react-router-dom";
import { getProducts } from "Redux/Slices/Products/ProductsSlice";
import AddProductPage from "./Components/AddProductPage";
import EditProductPage from "./Components/EditProductPage";
import ViewProductPage from "./Components/ViewProductPage";
import DeleteDataModal from "./Components/DeleteDataModal";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import { getCategory } from "Redux/Slices/Category/CategorySlice";

const ProductsPage = () => {

  const [modalData, setModalData] = useState({ type: null, data: null });
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [openAddProductPage, setOpenAddProductPage] = useState(false);
  const [openEditProductPage, setOpenEditProductPage] = useState(false);
  const [openViewProductPage, setOpenViewProductPage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addShowErrorToast, setAddShowErrorToast] = useState(false);
  const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
  const [addShowToastMessage, setAddShowToastMessage] = useState("");
  const [addShowToast, setAddShowToast] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState();
  const [defaultCategoryName, setDefaultCategoryName] = useState();
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const productsList = useSelector(
    (state) => state?.ProductsByCatId?.productsList?.products
  );

  useEffect(() => {

    if (!productsList || productsList?.length === 0) {

      dispatch(getProducts())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));

    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  const handleAdd = () => {
    setOpenAddProductPage(true);
    // setModalData({ type: "Add", data: null });
  };
  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.value);
    setSearchInput(e.target.value);
  };

  const tableHeaders = [
    { title: "S.No.", class: "" },
    { title: "Title", class: "" },
    { title: "Category", class: "" },
    { title: "Image", class: "" },
    { title: "Action", class: "text-center" },
  ];

  const tableActions = [
    {
      name: "View",
      class: "eye",
      icon: "fa-solid fa-eye",
      onClick: (data) => {
        setOpenViewProductPage(true);
        setModalData({ data: data });
      },
    },
    {
      name: "Edit",
      class: "edit",
      icon: "far fa-edit",
      onClick: (data) => {
        setOpenEditProductPage(true);
        setModalData({ type: "Edit", data: data });
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
              productId={data?._id}
              productName={data?.name}
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

  const getFilteredProducts = () => {
    if (defaultCategory) {
      if (defaultCategory == "All") {
        return productsList;
      }
      return productsList?.filter((product) => product?.category === defaultCategory);
    }
    return productsList;
  };

  const getSearchedAndFilteredProducts = () => {
    if (searchInput) {
      const searchQuery = searchInput.toLowerCase();
      const searchedProducts = productsList?.filter((product) =>
        product?.name.toLowerCase().includes(searchQuery)
      );

      if (defaultCategory && defaultCategory !== "All") {
        // Filter by category if a specific category is selected
        return searchedProducts?.filter(
          (product) => product?.category === defaultCategory
        );
      }

      return searchedProducts;
    }

    // If no search query, return products filtered by category or all products
    if (defaultCategory && defaultCategory !== "All") {
      return productsList?.filter((product) => product?.category === defaultCategory);
    }

    return productsList; // If defaultCategory is "All" or not specified, return all products
  };

  const RenderTable = () => {
    const filteredProducts = getFilteredProducts();
    const searchedProducts = getSearchedAndFilteredProducts();

    const displayProducts = searchInput ? searchedProducts : defaultCategory ? filteredProducts : searchedProducts;

    return (
      <Col md={12}>
        <div className="user_table">
          <div className="nftstable">
            <div className="tablearea">
              <Table responsive className="m-0">
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
                <tbody>
                  {displayProducts && displayProducts?.length > 0 ? (
                    displayProducts?.map((product, index) => {
                      return (
                        <tr key={product?._id}>
                          <td>{index + 1}</td>
                          <td>{product?.name}</td>
                          <td>{product?.categoryName}</td>
                          <td>
                            <img
                              src={product?.productPictures[0]?.img}
                              style={{ borderRadius: "10px" }}
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
                              {tableActions && tableActions?.map((action, index) => (
                                <div
                                  className={action?.class?.toLowerCase()}
                                  onClick={() => action?.onClick(product)}
                                >
                                  <Link to="#">
                                    <i className={action?.icon}></i>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td>
                        <div className="d-flex justify-content-center pt-4">
                          <p className="text-red">Product list is empty !!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Col>
    );
  };

  const handleSelectCategory = (e) => {
    setDefaultCategory(e.target.value);
    const categoryIdToFind = e.target.value;
    const foundCategory = categoryList.find(
      (item) => item._id === categoryIdToFind
    );
    if (foundCategory) {
      setDefaultCategoryName(foundCategory?.name);
    } else {
      console.log("Category not found ", defaultCategoryName);
    }
  };

  const categoryList = useSelector(
    (state) => state?.CategoryList?.categoryList?.categoryList
  );

  useEffect(() => {
    if (!categoryList || categoryList.length === 0) {
      dispatch(getCategory())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);


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
              <Container>
                <Col md={12}>

                  <Row>

                    <Col md={4}>
                      <div className="user_heading">
                        <h3 style={{ textTransform: "capitalize" }}>{"All Products"}</h3>
                        <p>Welcome to All Products page</p>
                      </div>
                    </Col>
                    <Col md={4} style={{ paddingTop: "1rem" }}>
                      <div className="manage_searchbar">
                        <InputGroup className="">
                          <InputGroup.Text id="basic-addon1" className="">
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </InputGroup.Text>

                          <Form.Control
                            placeholder="Search Product"
                            value={searchInput}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md={4} className="d-flex justify-content-end">
                      <div className="add_filter_btn">
                        <div className="bgbtnred" onClick={handleAdd}>
                          Add New Product
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {/* <Row>
                    <div style={{ paddingTop: "1.875rem" }}><i class="fa-solid fa-filter"></i> Filter Products By Category</div>
                    <Col md={6} style={{ paddingTop: "0.5rem" }}>
                      <Form.Group className="form-group-padding-bottom">
                        <div className="select-wrapper">
                          <Form.Control
                            as="select"
                            name="categoryId"
                            placeholder="Filter by Category"
                            id="categoryId"
                            value={defaultCategory}
                            onChange={(e) => handleSelectCategory(e)}
                          >
                            <option selected style={{ fontWeight: "600" }}>
                              {"All"}
                            </option>
                            {categoryList &&
                              categoryList?.map((option) => (
                                <option key={option._id} value={option?._id}>
                                  {option?.name}
                                </option>
                              ))}
                          </Form.Control>
                          <div className="select-arrow">

                          </div>
                        </div>
                      </Form.Group>

                    </Col>

                  </Row> */}
                </Col>
              </Container>
              {openAddProductPage && openAddProductPage ? (
                <AddProductPage
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
                <EditProductPage
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
                <ViewProductPage
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

export default ProductsPage;
