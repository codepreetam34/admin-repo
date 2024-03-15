import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editAVendor, getAVendor } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";
import { vendorSchema } from "ValidationSchema/vendorSchema";

const EditRegisterVendorForm = ({
  setOpenEditRegisterVendorPage,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  vendorData,
  setAddShowToast,
  setAddShowToastMessage,
  setIsLoading,
}) => {
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(vendorSchema),
    mode: "onChange",
  });


  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [gstCertificateFile, setGstCertificateFile] = useState(null);

  // Function to handle file change for Aadhar card and GST certificate
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    // Update state based on the fileType
    if (fileType === "aadharCard") {
      setAadharCardFile(file);
    } else if (fileType === "gstCertificate") {
      setGstCertificateFile(file);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    // Append form data
    formData.append("_id", vendorData._id);
    formData.append("shopName", data.shopName);
    formData.append("vendorName", data.vendorName);
    formData.append("panNumber", data.panNumber);
    formData.append("gstNumber", data.gstNumber);
    formData.append("aadharCard", aadharCardFile);
    formData.append("gstCertificate", gstCertificateFile);
    formData.append("officeAddress1", data.officeAddress1);
    formData.append("officeAddress2", data.officeAddress2);
    formData.append("officeCity", data.officeCity);
    formData.append("officeState", data.officeState);
    formData.append("officePincode", data.officePincode);
    formData.append("officePhone", data.officePhone);
    formData.append("officeEmail", data.officeEmail);
    formData.append("homeAddress1", data.homeAddress1);
    formData.append("homeAddress2", data.homeAddress2);
    formData.append("homeCity", data.homeCity);
    formData.append("homeState", data.homeState);
    formData.append("homePincode", data.homePincode);
    formData.append("homePhone", data.homePhone);
    formData.append("homeEmail", data.homeEmail);

    dispatch(editAVendor(formData)).then((res) => {
      setIsLoading(true);
      if (
        res?.paylaod?.error?.response?.status === 400 ||
        res?.paylaod?.error?.response?.status === 500
      ) {
        setIsLoading(false);
        setAddShowErrorToast(true);
        setAddShowErrorToastMessage(res.paylaod.error.message);
      } else {
        setIsLoading(false);
        setAddShowToast(true);
        setAddShowToastMessage(res.payload.message);
        //     setOpenEditRegisterVendorPage(false);
        //   dispatch(getAVendor());
      }
    });
  };

  useEffect(() => {
    // Pre-fill form with vendor data using reset function
    reset({
      shopName: vendorData?.shopName,
      vendorName: vendorData?.vendorName,
      panNumber: vendorData?.panNumber,
      gstNumber: vendorData?.gstNumber,
      officeAddress1: vendorData?.officeAddress1,
      officeAddress2: vendorData?.officeAddress2,
      officeCity: vendorData?.officeCity,
      officeState: vendorData?.officeState,
      officePincode: vendorData?.officePincode,
      officePhone: vendorData?.officePhone,
      officeEmail: vendorData?.officeEmail,

      homeAddress1: vendorData?.homeAddress1,
      homeAddress2: vendorData?.homeAddress2,
      homeCity: vendorData?.homeCity,
      homeState: vendorData?.homeState,
      homePincode: vendorData?.homePincode,
      homePhone: vendorData?.homePhone,
      homeEmail: vendorData?.homeEmail,

      aadharCard: vendorData?.aadharCard,
      gstCertificate: vendorData?.gstCertificate
    });
  }, [vendorData, reset]);


  return (
    <div className="container">
      {/* <div>
        <div className="foroverlay d-block d-lg-none"></div> */}
      <div
        className="sidebar-background"
        style={{ transition: "transform 1s ease-in-out" }}
      >
        <Form
          className="user_form"
          onSubmit={handleSubmit(onSubmit)}
          style={{ padding: "2rem" }}
        >
          <Row>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Shop Name of the Vendor</Form.Label>

                <Form.Control
                  id="shopName"
                  type="text"
                  name="shopName"
                  {...register("shopName")}
                  isInvalid={!!errors.shopName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.shopName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Name of the Vendor</Form.Label>

                <Form.Control
                  id="vendorName"
                  type="text"
                  name="vendorName"
                  {...register("vendorName")}
                  isInvalid={!!errors.vendorName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.vendorName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>PAN No. of the Vendor</Form.Label>

                <Form.Control
                  id="panNumber"
                  type="text"
                  name="panNumber"
                  {...register("panNumber")}
                  isInvalid={!!errors.panNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.panNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>GST No.</Form.Label>

                <Form.Control
                  id="gstNumber"
                  type="text"
                  name="gstNumber"
                  {...register("gstNumber")}
                  isInvalid={!!errors.gstNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.gstNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>


            <Col md={6}>
              <Form.Group controlId="aadharCard">
                <Form.Label>Aadhar Card Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="aadharCard"
                  onChange={(e) => handleFileChange(e, "aadharCard")}
                />
              </Form.Group>
            </Col>
            {/* Add GST Number Certificate Upload */}
            <Col md={6}>
              <Form.Group controlId="gstCertificate">
                <Form.Label>GST Number Certificate Upload</Form.Label>
                <Form.Control
                  type="file"
                  name="gstCertificate"
                  onChange={(e) => handleFileChange(e, "gstCertificate")}
                />
              </Form.Group>
            </Col>

            <Form.Label style={{ marginTop: "1rem", fontSize: "1.25rem", fontWeight: "500" }}>Address of Home</Form.Label>
            <Col md={12}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Enter Address 1</Form.Label>
                <Form.Control
                  id="officeAddress1"
                  type="text"
                  name="officeAddress1"
                  {...register("officeAddress1")}
                  isInvalid={!!errors.officeAddress1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officeAddress1?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Enter Address 2</Form.Label>
                <Form.Control
                  id="homeAddress2"
                  type="text"
                  name="homeAddress2"
                  {...register("homeAddress2")}
                  isInvalid={!!errors.homeAddress2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homeAddress2?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Home City</Form.Label> 
                <Form.Control
                  id="homeCity"
                  type="text"
                  name="homeCity"
                  {...register("homeCity")}
                  isInvalid={!!errors.homeCity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homeCity?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Home State</Form.Label>
                <Form.Control
                  id="homeState"
                  type="text"
                  name="homeState"
                  {...register("homeState")}
                  isInvalid={!!errors.homeState}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homeState?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Home Pincode</Form.Label>
                <Form.Control
                  id="homePincode"
                  type="text"
                  name="homePincode"
                  {...register("homePincode")}
                  isInvalid={!!errors.homePincode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homePincode?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Home Phone No.</Form.Label>
                <Form.Control
                  id="homePhone"
                  type="text"
                  name="homePhone"
                  {...register("homePhone")}
                  isInvalid={!!errors.homePhone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homePhone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Home Email Address</Form.Label>
                <Form.Control
                  id="homeEmail"
                  type="text"
                  name="homeEmail"
                  {...register("homeEmail")}
                  isInvalid={!!errors.homeEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.homeEmail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Form.Label style={{ fontSize: "1.25rem", fontWeight: "500" }}>Address of Registered Office</Form.Label>
            <Col md={12}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Enter Address 1</Form.Label>
                <Form.Control
                  id="officeAddress1"
                  type="text"
                  name="officeAddress1"
                  {...register("officeAddress1")}
                  isInvalid={!!errors.officeAddress1}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officeAddress1?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Enter Address 2</Form.Label>
                <Form.Control
                  id="officeAddress2"
                  type="text"
                  name="officeAddress2"
                  {...register("officeAddress2")}
                  isInvalid={!!errors.officeAddress2}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officeAddress2?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Office City</Form.Label>
                <Form.Control
                  id="officeCity"
                  type="text"
                  name="officeCity"
                  {...register("officeCity")}
                  isInvalid={!!errors.officeCity}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officeCity?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Office State</Form.Label>
                <Form.Control
                  id="officeState"
                  type="text"
                  name="officeState"
                  {...register("officeState")}
                  isInvalid={!!errors.officeState}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officeState?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Office Pincode</Form.Label>
                <Form.Control
                  id="officePincode"
                  type="text"
                  name="officePincode"
                  {...register("officePincode")}
                  isInvalid={!!errors.officePincode}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officePincode?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Office Phone No.</Form.Label>
                <Form.Control
                  id="officePhone"
                  type="text"
                  name="officePhone"
                  {...register("officePhone")}
                  isInvalid={!!errors.officePhone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officePhone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Office Email Address</Form.Label>
                <Form.Control
                  id="officeEmail"
                  type="text"
                  name="officeEmail"
                  {...register("officeEmail")}
                  isInvalid={!!errors.officeEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.officeEmail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>


          </Row>



          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="primary"
              style={{
                textTransform: "capitalize",
                marginTop: "2rem",
                "&:hover": {
                  border: "none",
                  textDecoration: "none",
                },
              }}
            >
              Submit
            </Button>
          </div>

        </Form>

      </div>
      {/* </div> */}

    </div >
  );
};

export default EditRegisterVendorForm;

