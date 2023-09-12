import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LOGIN } from "Routes/Routes";
import { useDispatch } from "react-redux";
import { setupPasswordSchema } from "ValidationSchema/setUpNewPassword";
import { setupPassword } from "Redux/Slices/Login/setupPassword";
import { Button, Form } from "react-bootstrap";
import Logo from "images/vibezterLogo.png";
import { Toast, ToastContainer } from "react-bootstrap";
const SetupNewPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  // const [showToastMessage, setShowToastMessage] = useState();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setupPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const postData = {
      password: data.password,
      token: token,
      userId: id,
    };

    dispatch(setupPassword(postData))
      .then((res) => {
        if (res?.payload?.message) {
          //   setShowToastMessage(res?.payload?.message);
          setShowToast(true);
         // navigate("/login");
        } else if (res?.payload?.error) {
          setShowErrorToastMessage(res?.payload?.error?.message);
          setShowErrorToast(true);
        }
      })
      .catch((err) => {
        setShowErrorToast(true);
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
              <h3>Update Your Password</h3>
              <p>Easily change your account password now.</p>
            </div>

            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  {...register("password")}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Form.Group>
              <div className="check_with_text d-flex align-items-center justify-content-between">
                <Link className="text-red" to={LOGIN}>
                  Back to Login
                </Link>
              </div>
              <Button variant="" type="submit">
                Update Password
              </Button>
            </Form>
          </div>
        </div>{" "}
        <div className="custom_toaster">
          <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              className="top-end"
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
                  <i class="fa-solid fa-circle-check"></i> Your password has
                  been successfully updated.
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
              className="top-end"
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
                  <i class="fa-solid fa-circle-check"></i>{" "}
                  {showErrorToastMessage
                    ? showErrorToastMessage
                    : "Invalid or expired password reset token"}
                </strong>
              </Toast.Header>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </>
  );
};

export default SetupNewPassword;
