import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DynamicModal from "Constants/DynamicModal";
import { Link } from "react-router-dom";
import AddRegisterVendorPage from "./Components/AddRegisterVendorPage";
import EditRegisterVendorPage from "./Components/EditRegisterVendorPage";
import ViewRegisterVendorPage from "./Components/ViewRegisterVendorPage";
import DeleteDataModal from "./Components/DeleteDataModal";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import { getAVendor } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";

const RegisterVendorPage = () => {

    const [modalData, setModalData] = useState({ type: null, data: null });
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [openAddRegisterVendorPage, setOpenAddRegisterVendorPage] = useState(false);
    const [openEditRegisterVendorPage, setOpenEditRegisterVendorPage] = useState(false);
    const [openViewRegisterVendorPage, setOpenViewRegisterVendorPage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [addShowErrorToast, setAddShowErrorToast] = useState(false);
    const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
    const [addShowToastMessage, setAddShowToastMessage] = useState("");
    const [addShowToast, setAddShowToast] = useState(false);

    const [searchInput, setSearchInput] = useState("");

    const dispatch = useDispatch();

    const productsList = useSelector(
        (state) => state?.vendorStore?.vendorData
    );

    console.log("productsList ", productsList)

    useEffect(() => {

        if (!productsList || productsList?.length === 0) {

            dispatch(getAVendor())
                .then(() => {
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));

        } else {
            setIsLoading(false);
        }
    }, [dispatch]);

    const handleAdd = () => {
        setOpenAddRegisterVendorPage(true);
        // setModalData({ type: "Add", data: null });
    };
    const handleInputChange = (e) => {
        console.log("Input changed:", e.target.value);
        setSearchInput(e.target.value);
    };

    const tableHeaders = [
        { title: "S.No.", class: "" },
        { title: "Shop Name", class: "" },
        { title: "Vendor Name", class: "" },
        { title: "Gst Number", class: "" },
        { title: "Action", class: "text-center" },
    ];

    const tableActions = [
        {
            name: "View",
            class: "eye",
            icon: "fa-solid fa-eye",
            onClick: (data) => {
                setOpenViewRegisterVendorPage(true);
                setModalData({ data: data });
            },
        },
        {
            name: "Edit",
            class: "edit",
            icon: "far fa-edit",
            onClick: (data) => {
                setOpenEditRegisterVendorPage(true);
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
                            vendorId={data?._id}
                            shopName={data?.shopName}
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


    const getSearchedAndFilteredProducts = () => {
        if (searchInput) {
            const searchQuery = searchInput.toLowerCase();
            const searchedProducts = productsList?.filter((product) =>
                product?.name.toLowerCase().includes(searchQuery)
            );
            return searchedProducts;
        }
        return productsList;
    };

    const RenderTable = () => {
        const searchedProducts = getSearchedAndFilteredProducts();
        const displayProducts = searchedProducts;

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
                                                    <td>{product?.shopName}</td>
                                                    <td>{product?.vendorName}</td>
                                                    <td>{product?.gstNumber}</td>
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
                                                    <p className="text-red">Vendor list is empty !!</p>
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
                                                <h3 style={{ textTransform: "capitalize" }}>{"All Vendors"}</h3>
                                                <p>Welcome to All Vendors page</p>
                                            </div>
                                        </Col>
                                        <Col md={4} style={{ paddingTop: "1rem" }}>
                                            <div className="manage_searchbar">
                                                <InputGroup className="">
                                                    <InputGroup.Text id="basic-addon1" className="">
                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                    </InputGroup.Text>

                                                    <Form.Control
                                                        placeholder="Search Category"
                                                        value={searchInput}
                                                        onChange={handleInputChange}
                                                    />
                                                </InputGroup>
                                            </div>
                                        </Col>
                                        <Col md={4} className="d-flex justify-content-end">
                                            <div className="add_filter_btn">
                                                <div className="bgbtnred" onClick={handleAdd}>
                                                    Add New Vendor
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </Col>
                            </Container>
                            {openAddRegisterVendorPage && openAddRegisterVendorPage ? (
                                <AddRegisterVendorPage
                                    setOpenAddRegisterVendorPage={setOpenAddRegisterVendorPage}
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
                            ) : openEditRegisterVendorPage && openEditRegisterVendorPage ? (
                                <EditRegisterVendorPage
                                    vendorData={modalData?.data}
                                    setOpenEditRegisterVendorPage={setOpenEditRegisterVendorPage}
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
                            ) : openViewRegisterVendorPage && openViewRegisterVendorPage ? (
                                <ViewRegisterVendorPage
                                    vendorData={modalData?.data}
                                    setOpenViewRegisterVendorPage={setOpenViewRegisterVendorPage}

                                    setIsLoading={setIsLoading}

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

export default RegisterVendorPage;
