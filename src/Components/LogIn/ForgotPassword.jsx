import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotOtpSchema } from "ValidationSchema/forgotOtpSchema";
import { useDispatch } from "react-redux";
import { resetPasswordLink } from "Redux/Slices/Login/resetPasswordLink";
import { Button, Form } from "react-bootstrap";
import Logo from "images/vibezterLogo.png";
import { LOGIN } from "Routes/Routes";
import { Toast, ToastContainer } from "react-bootstrap";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  //  const [showToastMessage, setShowToastMessage] = useState();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotOtpSchema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    dispatch(resetPasswordLink(data))
      .then((res) => {
        console.log(res);
        if (res?.payload?.link) {
          //   setShowToastMessage(res?.payload?.message);
          setShowToast(true);
        } else if (res?.payload?.error) {
          setShowErrorToastMessage(
            res?.payload?.error?.response?.data?.message
          );
          setShowErrorToast(true);
        }
      })
      .catch((err) => {
        setShowToast(true);
      });
  };
  return (
    <>
      <div className="loginbg transitionStyle">
        <div className="form_area">
          <Link href="/">
            <img src={Logo} className="img-fluid" alt="" loading="lazy" />
          </Link>
          <div className="user_management_list p-0">
            <div className="user_heading">
              <h3>Forgot Password</h3>
              <p>Receive your password reset link via email.</p>
            </div>

            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="emailid">
                <Form.Label>Email ID *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="meta@email.com"
                  {...register("email")} // Assuming "email" is the form field name
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </Form.Group>
              <div className="check_with_text d-flex align-items-center justify-content-between">
                <Link className="text-red" to={LOGIN}>
                  Back to Login
                </Link>
              </div>
              <Button variant="" type="submit">
                Send reset mail
              </Button>
              {/* <p className='dont_account'>Don't have an account ? <a href="#" className='text-red'> Create One</a></p> */}
            </Form>
          </div>
        </div>
        <div className="custom_toaster">
          <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              className="bottom-end"
              delay={3000}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                  loading="lazy"
                />
                <strong className="me-auto">
                  <i class="fa-solid fa-circle-check"></i>Your password reset
                  email has been sent. Please check your email inbox.
                </strong>
              </Toast.Header>
            </Toast>
          </ToastContainer>
        </div>

        <div className="custom_toaster">
          <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setShowErrorToast(false)}
              show={showErrorToast}
              className="bottom-end"
              delay={3000}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                  loading="lazy"
                />
                <strong className="me-auto">
                  <i class="fa-solid fa-circle-check"></i>
                  {showErrorToastMessage
                    ? showErrorToastMessage
                    : "Email does not exist"}
                </strong>
              </Toast.Header>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
