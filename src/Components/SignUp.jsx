import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
// import useFetch from "./Fetch";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [loaddata, setloadData] = useState(true);
  const Navigate = useNavigate();

  const toggleShowPassword = (ev) => {
    ev.preventDefault();
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = (ev) => {
    ev.preventDefault();
    setConfirmPassword(!confirmPassword);
  };
  // const {currentData, error} = useFetch("")
  const { handleSubmit, handleChange, touched, errors, handleBlur } = useFormik(
    {
      initialValues: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: yup.object().shape({
        firstname: yup
          .string()
          .min(5, "Firstname must be at least 5 characters")
          .required("This input field is required"),
        lastname: yup
          .string()
          .min(5, "Lastname must be at least 5 characters")
          .required("This input field is required"),
        username: yup
          .string()
          .min(5, "Username must be at least 5 characters")
          .required("This input field is required"),
        email: yup
          .string()
          .email("Must be a valid Email")
          .required("this input field is required"),
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
          .min(6, "Password must be at least 6 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            "Password must contain at least one letter, one number, and one symbol"
          )
          .required("This input field is required"),
      }),

      onSubmit: async (values) => {
        console.log(values);
        localStorage.setItem("userdetails", JSON.stringify(values))

        if (values.password !== values.confirmPassword) {
          toast.error("Password does not match")
          return
        }

        try {
          setloadData(!loaddata);
          const response = await axios.post(
            "http://localhost:3000/user/signup",
            values
          );
          console.log(response.data);
          toast.success("Sign up successful");
          setTimeout(() => {
            Navigate("/login");
          }, 6000);
        } catch (error) {
          toast.error(error.response.data.message);
          console.error(error);
        } finally {
          setloadData(true); // Hide the loader
        }
      },
    }
  );

  return (
    <div className="signup_div  py-2 w-100 ">
      <form
        onSubmit={handleSubmit}
        className="form mx-auto  rounded-3 bg-light shadow"
      >
        <div className="header py-3">Sign Up</div>
        <div className="inputs row">
          <div className="col-12 col-sm-6 col-md-6">
            <label htmlFor="username">First Name</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={
                errors?.firstname && touched.firstname
                  ? "is-invalid form-control"
                  : "form-control"
              }
              name="firstname"
            />
            {errors?.firstname && touched.firstname ? (
              <small className="text-danger">{errors.firstname}</small>
            ) : null}
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <label className="mx-1" htmlFor="username ">
              Last Name
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={
                errors.lastname && touched.lastname
                  ? "is-invalid form-control"
                  : "form-control"
              }
              name="lastname"
            />
            {errors.lastname && touched.lastname ? (
              <small className="text-danger">{errors.lastname}</small>
            ) : null}
          </div>
          <div className="col-12 col-sm-6 col-md-6">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              className={
                errors.username && touched.username
                  ? "is-invalid form-control"
                  : "form-control"
              }
              name="username"
            />
            {errors.username && touched.username ? (
              <small className="text-danger">{errors.username}</small>
            ) : null}
          </div>


          <div className="col-12 col-sm-6 col-md-6">
            <label className="mx-1" htmlFor="email ">
              Email
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              type="email"
              className={
                errors?.email && touched.email
                  ? "is-invalid form-control"
                  : "form-control"
              }
            />
            {errors?.email && touched.email ? (
              <small className="text-danger">{errors.email}</small>
            ) : null}
          </div>
          <div className=" my-2">
            <label htmlFor="password">Password</label>
            <div className="password_div">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                type={showPassword ? "text" : "password"}
                className={
                  errors?.password && touched.password
                    ? "is-invalid form-control"
                    : "form-control"
                }
              />
              <button onClick={toggleShowPassword} className="input_type">
                {showPassword ? <AiFillEyeInvisible /> : <BsFillEyeFill />}
              </button>
            </div>
            {errors?.password && touched.password ? (
              <small className="text-danger">{errors.password}</small>
            ) : null}
          </div>
          <div className="my-1">
            <label htmlFor="Confirm password">Confirm Password</label>
            <div className="password_div">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
                type={confirmPassword ? "text" : "password"}
                className={
                  errors?.confirmPassword && touched.confirmPassword
                    ? "is-invalid form-control"
                    : "form-control"
                }
              />
              <button onClick={toggleConfirmPassword} className="input_type">
                {confirmPassword ? <AiFillEyeInvisible /> : <BsFillEyeFill />}
              </button>
            </div>
            {errors?.confirmPassword && touched.confirmPassword ? (
              <small className="text-danger">{errors.confirmPassword}</small>
            ) : null}
          </div>
          <div>
            <button className="sigin-btn mt-1" type="submit">
              {loaddata ? (
                "Submit"
              ) : (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
            <p className="signup-link">
              Alredy have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUp;
