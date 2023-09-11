import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setItem } from "Services/CommonService";
import { loginSchema } from "ValidationSchema/loginSchema";
import { login } from "Redux/Slices/Login/auth.slice";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "images/vibezterLogo.png";
import { Button, Form, Box } from "react-bootstrap";
import { notify } from "Constants/utils";
const LogInPage = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const forgotPasswordNavigate = () => {
    // Handle forgot password navigation
  };

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (res) {
          setItem("userData", res?.data);
          notify({ type: "success", message: "Logged in successfully" });
          navigate("/");
        }
      })
      .catch((err) => {
        notify({
          type: "error",
          messgae: err?.error?.response?.data?.message
            ? err?.error?.response?.data?.message
            : err?.error?.response?.data?.error
            ? err?.error?.response?.data?.error
            : err?.error?.message,
        });
      });
  };

  useEffect(() => {
    const auth = localStorage.getItem("AUTH_ACCESS_TOKEN");
    if (auth) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="loginbg">
        <div className="form_area">
          <a href="/">
            <img src={Logo} className="img-fluid" alt="" />
          </a>
          <div className="user_management_list p-0">
            <div className="user_heading">
              <h3>Log in</h3>
              <p>Login to your account</p>
            </div>
            <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="emailid">
                <Form.Label>Email ID *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="meta@email.com"
                  {...register("email")} // Assuming "email" is the form field name
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={passwordType ? "password" : "text"}
                  placeholder="**********"
                  {...register("password")} // Assuming "password" is the form field name
                />
              </Form.Group>
              <div className="check_with_text d-flex align-items-center justify-content-between">
                <Form.Group className="" controlId="formBasicCheckbox">
                  {/* <Form.Check type="checkbox" label="Remember" /> */}
                </Form.Group>
                <a
                  href="#"
                  className="text-red"
                  onClick={forgotPasswordNavigate}
                >
                  Forgot password?
                </a>
              </div>
              <Button variant="" type="submit">
                Log In
              </Button>
              {/* <p className='dont_account'>Don't have an account ? <a href="#" className='text-red'> Create One</a></p> */}
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default LogInPage;
