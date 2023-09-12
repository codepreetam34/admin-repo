import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setItem } from "Services/CommonService";
import { loginSchema } from "ValidationSchema/loginSchema";
import { login } from "Redux/Slices/Login/auth.slice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "images/vibezterLogo.png";
import { Button, Form } from "react-bootstrap";
import { FORGOT_PASSWORD } from "Routes/Routes";
const LogInPage = () => {
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

  const onSubmit = (data) => {
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (res) {
          setItem("userData", res?.data);
          navigate("/");
        }
      })
      .catch((err) => {
        navigate("/login");
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
      <div className="loginbg transitionStyle">
        <div className="form_area">
          <Link to="/">
            <img src={Logo} className="img-fluid" alt="" loading="lazy" />
          </Link>
          <div className="user_management_list p-0">
            <div className="user_heading">
              <h3>Welcome Back</h3>
              <p>Login to access your account.</p>
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

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**********"
                  {...register("password")}
                />{" "}
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>
              <div className="check_with_text d-flex align-items-center justify-content-between">
                {/* <Form.Group className="" controlId="formBasicCheckbox">
                   <Form.Check type="checkbox" label="Remember" /> 
                </Form.Group> */}
                <Link className="text-red" to={FORGOT_PASSWORD}>
                  Forgot password?
                </Link>
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
