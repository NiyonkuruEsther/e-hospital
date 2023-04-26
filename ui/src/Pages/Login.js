/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginOutlined } from "@mui/icons-material";

export default function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const user = localStorage.getItem("user") && localStorage.getItem("user");

  useEffect(() => {
    const loggedIn = () => (user ? navigate("/dashboard") : "");

    loggedIn();
  }, []);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5500/api/v1/auth/user/login", {
        ...values,
      })
      .then(function (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("datassss===>>>", response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/dashboard");
      })
      .catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error.response);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className=" shadow-xl border-4 ring-4 ring-orange-500  rounded-3xl flex flex-col gap-6 p-6">
        <div className="">
          <h2 className="title text-orange-500  font-extrabold text-3xl">
            Welcome back to Go-Healthy
          </h2>
        </div>
        <form>
          <div className="flex flex-col w-full gap-4 ">
            <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
              <input
                className="w-5/6 focus:outline-none px-4"
                type="text"
                name="email"
                placeholder="Your email address"
                onChange={handleChange}
              />
            </div>
            <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
              <input
                className="w-5/6 focus:outline-none px-4"
                type="password"
                name="password"
                placeholder="Enter a password"
                onChange={handleChange}
              />
            </div>
            <div className="place-self-center flex flex-col">
              <button
                className="submit text-xl font-bold text-white flex justify-center p-3 rounded-full items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-300"
                type="submit"
                onClick={handleFormSubmit}
              >
                <LoginOutlined />
                LOGIN
              </button>
              <span className="span text-opacity-40 text-black">
                Not yet a member!
                <Link to="/signup" className="link text-orange-500">
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
