import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editUserById, getAllUsers } from "Redux/Slices/Users/Users";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "ValidationSchema/profileSchema";
import { format, parseISO } from "date-fns";
import { editAVendor, getAVendor } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";

const EditModalForm = ({
  dataId,
  modalData,
  setOpenAddRegisterVendorPage,
  setAddShowErrorToast,
  setAddShowErrorToastMessage,
  setAddShowToast,
  setAddShowToastMessage,
  setIsLoading,
}) => {

  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [viewProfileImage, setViewProfileImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isRoleSectionDisabled, setIsRoleSectionDisabled] = useState(true);
  const authString = localStorage.getItem("Sidebar_Module_Assigned_Admin");
  const auth = JSON.parse(authString);

  const enableRoleSection = () => {
    setIsRoleSectionDisabled(!isRoleSectionDisabled);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  });

  const parsedDob = modalData?.dob ? parseISO(modalData.dob) : null;
  const formattedDob = parsedDob ? format(parsedDob, "dd/MM/yyyy") : "";

  useEffect(() => {
    reset({
      firstName: modalData?.firstName || "",
      lastName: modalData?.lastName || "",
      email: modalData?.email || "",
      contactNumber: modalData?.contactNumber || "",
      dob: formattedDob,
      role: modalData?.role || "",
      gender: modalData?.gender || "",
    });
    setViewProfileImage(modalData?.profilePicture);
  }, [reset, modalData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
    setViewProfileImage("");
  };

  const loadUserFromServer = useCallback(async () => {
    dispatch(getAllUsers())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [dispatch, dataId]);

  useEffect(() => {
    loadUserFromServer();
  }, [loadUserFromServer]);

  const onSubmit = (data) => {
    const formData = new FormData();

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
        setOpenAddRegisterVendorPage(false);
        dispatch(getAVendor());
      }
    });
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="product-detail-design">
          <Row className="m-0 p-0">

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  {...register("firstName")}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  {...register("lastName")}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  type="text"
                  placeholder="Enter Email"
                  {...register("email")}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  name="contactNumber"
                  id="contactNumber"
                  type="text"
                  placeholder="Enter Contact Number"
                  {...register("contactNumber")}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Gender</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Male"
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    {...register("gender")}
                  />
                  <Form.Check
                    inline
                    label="Female"
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    {...register("gender")}
                  />
                  <Form.Check
                    inline
                    label="Prefer not to say"
                    type="radio"
                    id="preferNotToSay"
                    name="gender"
                    value="Prefer Not To Say"
                    {...register("gender")}
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>D.O.B</Form.Label>
                <Form.Control
                  name="dob"
                  id="dob"
                  type="date"
                  defaultValue={formattedDob}
                  placeholder="Enter Date of Birth"
                  {...register("dob")}
                />
              </Form.Group>
            </Col>

            <Col md={6} className="">
              <Form.Group className="form-group-padding-bottom">
                <Form.Label>Role</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="User"
                    type="radio"
                    id="user"
                    name="role"
                    value="user"
                    disabled={isRoleSectionDisabled}
                    {...register("role")}
                  />
                  <Form.Check
                    inline
                    label="Admin"
                    type="radio"
                    id="admin"
                    name="role"
                    value="admin"
                    disabled={isRoleSectionDisabled}
                    {...register("role")}
                  />
                  <Form.Check
                    inline
                    label="Vendor"
                    type="radio"
                    id="vendor"
                    name="role"
                    value="vendor"
                    disabled={isRoleSectionDisabled}
                    {...register("role")}
                  />
                  <Form.Check
                    inline
                    label="Super Admin"
                    type="radio"
                    id="super-admin"
                    name="role"
                    value="super-admin"
                    disabled={isRoleSectionDisabled}
                    {...register("role")}
                  />
                </div>
                {auth.role === "super-admin" ? (
                  <Button
                    type="button"
                    className="mt-3"
                    onClick={enableRoleSection}
                  >
                    {isRoleSectionDisabled ? "Change Role" : "Disable"}
                  </Button>
                ) : (
                  <></>
                )}
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group className="mb-4">
                <Form.Label>Verified</Form.Label>
                <Form.Control
                  type="text"
                  id="verified"
                  name="verified"
                  value={modalData?.verified ? "Verified" : "Not Verified"}
                  disabled
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  id="profilePicture"
                  onChange={handleImageChange}
                />
              </Form.Group>
            </Col>{" "}

            <Col md={12} className="mb-4">
              {imagePreview && imagePreview ? (
                <div className="">
                  <div className="mb-2">{`Image Preview`} </div>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="categoryImage"
                      style={{ maxWidth: "100%", height: "300px" }}
                    />
                  </div>
                </div>
              ) : viewProfileImage && viewProfileImage ? (
                <div className="">
                  <div className="mb-2">{`Image Preview`} </div>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                    }}
                  >
                    <img
                      src={viewProfileImage}
                      alt="profilePicture"
                      style={{ maxWidth: "100%", height: "300px" }}
                    />{" "}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </Col>

          </Row>
        </div>

        <div className="pt-4">
          <Button type="submit">Update</Button>
        </div>

      </Form>
      
    </div>
  );
};

export default EditModalForm;
