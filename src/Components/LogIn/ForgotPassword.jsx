import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotOtpSchema } from "ValidationSchema/forgotOtpSchema";
import { useDispatch } from "react-redux";
import { resetPasswordLink } from "Redux/Slices/Login/resetPasswordLink";
import { Button, Form } from "react-bootstrap";
import Logo from "images/vibezterLogo.png";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        if (res) {
          navigate("/login");
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  };
  return (
    <>
      <div className="loginbg">
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

              <Button variant="" type="submit">
                Send reset link
              </Button>
              {/* <p className='dont_account'>Don't have an account ? <a href="#" className='text-red'> Create One</a></p> */}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
