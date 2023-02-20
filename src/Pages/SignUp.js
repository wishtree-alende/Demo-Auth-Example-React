import React from "react";
import Slider from "../components/Slider";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Logger } from "../Logger/Logger";
import ForgetPassword from "./ForgetPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AuthService from "../services/auth.service";
const loginFormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = (prop) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const submitFormData = (data) => {
    Logger.info(data);
    Logger.info("called...");
    console.log("..................", data.firstName);
    // axios
    //   .post("http://localhost:8080/api/auth/signup", data)
    AuthService.register(
      data.firstName,
      data.lastName,
      data.username,
      data.email,
      data.password
    )
      .then((response) => {
        console.log("response", response);
        Swal.fire("User registred successfully!", "", "success");
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        Swal.fire("Something went wrong!", "", "error");
      });
  };

  const handleClickShowPassword = () => {};
  const handleMouseDownPassword = () => {};
  const navigateToForgetPassword = () => {
    {
      <ForgetPassword />;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  return (
    <>
      <div className="page-wrapper">
        <div className="container">
          <div className="login-section">
            <div className="left-blk">
              <Slider />
            </div>
            <div className="right-blk">
              <div className="login-blk">
                <div className="logo"></div>
                <h1 className="page-title">Sign Up</h1>
                <form onSubmit={handleSubmit(submitFormData)}>
                  <div className="signup-namediv ">
                    {/* signup-namediv */}
                    <div className="name-div">
                      <label htmlFor="firstName" className="login-label">
                        First Name <span className="mandatory">*</span>
                      </label>
                      <TextField
                        className={`input-field ${
                          errors.firstName && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter first name"
                        variant="outlined"
                        autoComplete={"off"}
                        {...register("firstName")}
                        //   helperText={errors.firstName ? errors.firstName.message : " "}
                      />
                      <p className={`password-error-1`}>
                        {errors?.firstName ? (
                          errors.firstName?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="name-div">
                      <label htmlFor="lastName" className="login-label">
                        Last Name <span className="mandatory">*</span>
                      </label>
                      <TextField
                        className={`input-field ${
                          errors.lastName && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter last name"
                        variant="outlined"
                        autoComplete={"off"}
                        {...register("lastName")}
                        //   helperText={errors.lastName ? errors.lastName.message : " "}
                      />
                      <p className={`password-error-1`}>
                        {errors?.lastName ? (
                          errors.lastName?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username" className="login-label">
                      Username <span className="mandatory">*</span>
                    </label>
                    <TextField
                      className={`input-field ${
                        errors.username && "input-error"
                      }`}
                      id="outlined-basic"
                      placeholder="Enter username id"
                      variant="outlined"
                      autoComplete={"off"}
                      {...register("username")}
                      //   helperText={errors.username ? errors.username.message : " "}
                    />
                    <p className={`password-error-1`}>
                      {errors?.username ? (
                        errors.username?.message
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailid" className="login-label">
                      Email Id <span className="mandatory">*</span>
                    </label>
                    <TextField
                      className={`input-field ${errors.email && "input-error"}`}
                      id="outlined-basic"
                      placeholder="Enter email id"
                      variant="outlined"
                      autoComplete={"off"}
                      {...register("email")}
                      //   helperText={errors.email ? errors.email.message : " "}
                    />
                    <p className={`password-error-1`}>
                      {errors?.email ? (
                        errors.email?.message
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="login-label">
                      Password <span className="mandatory">*</span>
                    </label>
                    <div className="password-field">
                      <OutlinedInput
                        //   fullWidth
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className={`input-field ${
                          errors.password && "input-error"
                        }`}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              className="eye-btn"
                            >
                              {/* {!values.showPassword ? (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/non-visibleicon.svg"
                                }
                                alt=""
                                class="img-fluid"
                              />
                            ) : (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/visibleicon.svg"
                                }
                                alt=""
                                class="img-fluid"
                              />
                            )} */}
                            </IconButton>
                          </InputAdornment>
                        }
                        {...register("password")}
                      />
                      <p className={`password-error-1`}>
                        {errors?.password ? (
                          errors.password?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="submit-button-grp">
                    <button type="submit" className="smt-btn">
                      Sign Up
                    </button>
                    <div className="forget-link">
                      <a
                        href="/"
                        onClick={() => navigateToForgetPassword()}
                        className="tag"
                      >
                        Already have an account?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
