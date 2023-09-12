import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LOGIN } from "Routes/Routes";
import { useDispatch } from "react-redux";
import { setupPasswordSchema } from "ValidationSchema/setUpNewPassword";
import { setupPassword } from "Redux/Slices/Login/setupPassword";
import { Button, Form } from "react-bootstrap";
import Logo from "images/vibezterLogo.png";
import { forgotOtpSchema } from "ValidationSchema/forgotOtpSchema";
const SetupNewPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setupPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("data ", data)
    const postData = {
      password: data.password,
      token: token,
      userId: id,
    };

    dispatch(setupPassword(postData)).then((res) => {
       navigate(LOGIN);
    });
  };

  // useEffect(() => {
  //   if (password && confirmPassword) {
  //     setPasswordMatch(password === confirmPassword);
  //   }
  // }, [password, confirmPassword]);
  return (
    <>
      <div className="loginbg">
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
                  type={passwordType ? "password" : "text"}
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
                  type={passwordType ? "password" : "text"}
                  placeholder="**********"
                  {...register("confirmPassword")}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-danger">{errors.confirmPassword.message}</p>
                )}
              </Form.Group>
              {/* {confirmPassword && !passwordMatch ? (
                <p className="text-danger">Passwords do not match.</p>
              ) : (
                <></>
              )} */}
              <Button variant="" type="submit">
                Update Password
              </Button>

            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupNewPassword;
