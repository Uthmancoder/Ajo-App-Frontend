import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUser = () => {
  const [currentdata, setcurrentdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/signup")
      .then((res) => res.data)
      .then((data) => {
        setcurrentdata(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(4, "Username must be at least 4 character")
        .required("this input field is required"),
      name: yup
        .string()
        .min(4, "Name must be at least 4 character")
        .required("this input field is required"),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("this input field is required"),
      password: yup
        .string()
        .min(6, "Password too short")
        .max(8, "Password too long")
        .required("this input field is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      let emailExist = currentdata.find((el) => el.email === values.email);
      let usernameExist = currentdata.find(
        (el) => el.username === values.username
      );

      if (emailExist) {
        toast.error("Email already in use");
      } else if (usernameExist) {
        toast.error("Username already in use");
      } else {
        axios
          .post("http://localhost:1243/users", values)
          .then((res) => {
            console.log(res);
            toast.success("Registration Successful");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Registration failed");
          });
      }
    },
  });

  console.log(formik.errors);

  return (
    <div className="signup_div bg-dark pt-2">
      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="form rounded-3 bg-light shadow mx-auto  rounded-2 shadow p-3"
      >
        <h1 className="text-light header text-center fw-bolder fs-1">
          Sign Up
        </h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            onChange={formik.handleChange}
            type="text"
            className={
              formik.errors.username
                ? "is-invalid form-control"
                : "form-control"
            }
            name="username"
          />
          <small className="text-danger">{formik.errors.username}</small>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={formik.handleChange}
            name="name"
            type="text"
            className={
              formik.errors.name ? "is-invalid form-control" : "form-control"
            }
          />
          <small className="text-danger">{formik.errors.name}</small>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            name="email"
            type="email"
            className={
              formik.errors.email ? "is-invalid form-control" : "form-control"
            }
          />
          <small className="text-danger">{formik.errors.email}</small>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            name="password"
            type="password"
            className={
              formik.errors.password
                ? "is-invalid form-control"
                : "form-control"
            }
          />
          <small className="text-danger">{formik.errors.password}</small>
        </div>
        <button className="sigin-btn mt-3">Sign Up</button>
        <p className="signup-link">
          Alredy have an account <Link to="/login" >Sign In</Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default SignUser;
