import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setloading] = useState(false);
  const [loaddata, setloaddata] = useState(false);
  const Navigate = useNavigate();

  const username = localStorage.getItem("username");
  console.log(username);

  const toggleShowPassword = (ev) => {
    ev.preventDefault();
    setShowPassword(!showPassword);
  };
  const toggleShowPassword2 = (ev) => {
    ev.preventDefault();
    setShowPassword2(!showPassword2);
  };

  const {
    handleSubmit,
    handleChange,
    touched,
    errors,
    handleBlur,
    values, // Access Formik values
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
          "Password must contain at least one letter, one number, and one symbol"
        )
        .required("This input field is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("This input field is required"),
    }),

    onSubmit: async (values) => {
      console.log(values);
      setloaddata(!loaddata);
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          setloading(!loading);
          const password = values.password;
          const data = {
            password,
            username,
          };
          const response = await axios.post(
            "https://ultimate-thrift.onrender.com/user/resetPassword",
            data
          );
          console.log(response.data);
          toast.success(response.data.message);
          setTimeout(() => {
            Navigate("/login");
          }, 2000);
        } catch (error) {
          console.log(error.response.data);
          toast.error(error.response.data.message);
        } finally {
          setloaddata(false);
        }
      }
    },
  });

  return (
    <div className="joinGroup">
      <img
        className="logo"
        src={require("../images/Microfinance.png")}
        alt=""
      />
      <form
        onSubmit={handleSubmit}
        className="card shadow col-12 col-sm-8 col-md-6 col-lg-5 mx-auto mt-5 p-4 rounded-3"
        action=""
      >
        <h2 className="text-center text-dark">Reset Password</h2>
        <div className="form-group my-2 d-grid text-start">
          <label htmlFor="password">New Password</label>
          <div className="inp-div  w-100 ">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter New Password"
              value={values.password}
              className={
                errors.password && touched.password
                  ? "is-invalid form-control my-2"
                  : "form-control my-2"
              }
            />
            <div className="toggle" onClick={toggleShowPassword}>
              {showPassword ? <BsFillEyeFill /> : <AiFillEyeInvisible />}
            </div>
          </div>
          {errors.password && touched.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="form-group my-2 d-grid text-start">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="inp-div  w-100 ">
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword2 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={values.confirmPassword}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "is-invalid form-control my-2"
                  : "form-control my-2"
              }
            />
            <div className="toggle" onClick={toggleShowPassword2}>
              {showPassword2 ? <BsFillEyeFill /> : <AiFillEyeInvisible />}
            </div>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}
        </div>
        <button className="btn btn-primary subt">
          {" "}
          {!loaddata ? (
            "Submit"
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </form>
      {loading ? (
        <div className="loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
