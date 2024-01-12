import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editUserById, getAllUsers } from "Redux/Slices/Users/Users";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "ValidationSchema/profileSchema";
import { format, parseISO } from "date-fns";

const EditModalForm = ({
  dataId,
  modalData,
  setOpenEditModalPage,
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
  const auth = localStorage.getItem("Sidebar_Module_Assigned_Admin");
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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (dataId) {
        formData.append("_id", dataId.toString());
      }

      // Append other fields
      formData.append("firstName", data?.firstName?.toString());
      formData.append("lastName", data?.lastName?.toString());
      formData.append("email", data?.email?.toString());
      formData.append("contactNumber", data?.contactNumber?.toString());
      formData.append("dob", data?.dob?.toString());
      formData.append("role", data?.role?.toString());
      formData.append("gender", data?.gender?.toString());

      // Append profile image if available
      if (profileImage) {
        formData.append("profilePicture", profileImage);
      }

      dispatch(editUserById(formData)).then((res) => {
        setIsLoading(true);
        if (
          res?.payload?.error?.response?.status === 400 ||
          res?.payload?.error?.response?.status === 404 ||
          res?.payload?.error?.response?.status === 500
        ) {
          setIsLoading(false);
          setAddShowErrorToast(true);
          setAddShowErrorToastMessage(
            res.payload?.error?.response?.data?.message
          );
          dispatch(getAllUsers());
        } else {
          setIsLoading(false);
          setAddShowToast(true);
          setAddShowToastMessage(res.payload.message);
          setOpenEditModalPage(false);
          dispatch(getAllUsers());
        }
      });
    } catch (error) {
      setIsLoading(false);
      setAddShowErrorToast(true);
      setAddShowErrorToastMessage("Internal Server Error! Please try again");
      setOpenEditModalPage(false);
      dispatch(getAllUsers());
    }
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
