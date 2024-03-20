import React, { useState, useEffect } from "react";
import Wrapper from "Components/Wrapper";
import { Row, Col, Form, Table, InputGroup, Spinner, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToaster, SuccessToaster } from "Constants/utils";
import { Link } from "react-router-dom";
import DynamicModal from "Constants/DynamicModal";
import ViewModalPage from "./Components/ViewProductPage";
import VendorApprovalModal from "./Components/VendorApprovalModal";
import { getVendorProductsApproval } from "Redux/Slices/Products/ProductsSlice";
import EditProductPage from "./Components/EditProductPage";
import VendorDeleteModal from "./Components/VendorDeleteModal";

const ProductApprovalPage = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [openViewModalPage, setOpenViewModalPage] = useState(false);
    const [addShowErrorToast, setAddShowErrorToast] = useState(false);
    const [addShowToast, setAddShowToast] = useState(false);
    const [modalData, setModalData] = useState({ type: null, data: null });
    const [showModal, setShowModal] = useState(false);
    const [addShowErrorToastMessage, setAddShowErrorToastMessage] = useState("");
    const [addShowToastMessage, setAddShowToastMessage] = useState("");
    const [openEditModalPage, setOpenEditModalPage] = useState(false);

    useEffect(() => {
        dispatch(getVendorProductsApproval());
    }, [dispatch]);

    const productsList = useSelector(
        (state) => state?.ProductsByCatId?.getVendorProductsApprovalData?.products
    );

    const InitialRender = () => {
        return (
            <>
                <Col md={4}>
                    <div className="user_heading">
                        <h3 style={{ textTransform: "capitalize" }}>{"All Vendor Products"}</h3>
                        <p>Welcome to Vendor Product page</p>
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
            <>
                {productsList && productsList?.length > 0 ? (
                    productsList?.map((vendorProducts, index) => (
                        <React.Fragment key={index}>
                            <tbody>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{vendorProducts?.name}</td>
                                    <td>{vendorProducts?.vendorName}</td>
                                    <td>
                                        <img
                                            src={vendorProducts?.productPictures[0]?.img}
                                            style={{ borderRadius: "10px" }}
                                            alt="vendorProductPicture"
                                            width={70}
                                            height={70}
                                            loading="lazy"
                                        />
                                    </td>
                                    <td>
                                        {vendorProducts?.approvedBySuperAdmin ? (
                                            <Badge bg="success">Approved</Badge>
                                        ) : (
                                            <Badge bg="warning">Pending</Badge>
                                        )}
                                    </td>
                                    <td>
                                        <div className="table_icons d-flex align-items-center justify-content-center">
                                            {tableActions &&
                                                tableActions?.map((action, index) => (
                                                    <div
                                                        className={action?.class?.toLowerCase()}
                                                        onClick={() => action.onClick(vendorProducts)}
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
                            </tbody>
                        </React.Fragment>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">
                            <div className="d-flex justify-content-center pt-4">
                                <p className="text-red">Vendor Products list is empty !!</p>
                            </div>
                        </td>
                    </tr>
                )}
            </>
        );
    };

    const tableHeaders = [
        { title: "S.No.", class: "" },
        { title: "Product Name", class: "" },
        { title: "Vendor Name", class: "" },
        { title: "Image", class: "" },
        { title: "Status", class: "" },
        { title: "Action", class: "text-center" },
    ];

    const tableActions = [
        {
            name: "Delete",
            class: "edit",
            icon: "fa-solid fa-thumbs-up",
            onClick: (data) => {
                setShowModal(true);
                setModalData({
                    type: "Delete",
                    data: data,
                    modalContent: (
                        <VendorApprovalModal
                            productId={data._id}
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
                    modalTitle: "Product Approval Modal",
                });
            },
        },
        {
            name: "View",
            class: "eye",
            icon: "fa-solid fa-eye",
            onClick: (data) => {
                setOpenViewModalPage(true)
                setModalData({ data: data });
            },
        },
        // {
        //     name: "Edit",
        //     class: "edit",
        //     icon: "far fa-edit",
        //     onClick: (data) => {
        //         setOpenEditModalPage(true);
        //         setOpenViewModalPage(false);
        //         setModalData({ data: data });
        //     },
        // },
        // {
        //     name: "Delete",
        //     class: "delete",
        //     icon: "far fa-trash-alt",
        //     onClick: (data) => {
        //         setShowModal(true);
        //         setModalData({
        //             type: "Delete",
        //             data: data,
        //             modalContent: (
        //                 <VendorDeleteModal
        //                     productId={data._id}
        //                     productName={data?.name}
        //                     setShowModal={setShowModal}
        //                     setIsLoading={setIsLoading}
        //                     setAddShowErrorToast={(err) => {
        //                         setAddShowErrorToast(err);
        //                     }}
        //                     setAddShowErrorToastMessage={(msg) => {
        //                         setAddShowErrorToastMessage(msg);
        //                     }}
        //                     setAddShowToast={(show) => {
        //                         setAddShowToast(show);
        //                     }}
        //                     setAddShowToastMessage={(showMessage) => {
        //                         setAddShowToastMessage(showMessage);
        //                     }}
        //                 />
        //             ),
        //             modalTitle: "Delete Modal",
        //         });
        //     },
        // },
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
                            <InitialRender />
                            {openEditModalPage && openEditModalPage ? (
                                <EditProductPage
                                    productData={modalData?.data}
                                    setOpenEditProductPage={setOpenEditModalPage}
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
                            ) :
                                openViewModalPage && openViewModalPage ? (
                                    <ViewModalPage
                                        productData={modalData?.data}
                                        setOpenViewProductPage={setOpenViewModalPage}
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

export default ProductApprovalPage;
