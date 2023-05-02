import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import FetchUsers from "./FetchUsers";
import Physician from "./Physician";
import Pharmacist from "./Pharmacist";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") && localStorage.getItem("user");
  const role = user === null ? "" : JSON.parse(user).role;
  const Role = role && role.toUpperCase();

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const loggedIn = () => (!user ? navigate("/") : "");

    loggedIn();
    axios
      .get(`http://localhost:5500/api/v1/${Role}`)
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
        setDatas(response.data.data);
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
      });
  }, []);

  return (
    <div className="w-full mt-">
      <div className="flex flex-col max-w-7xl mx-auto">
        <Navbar section="dashboard" />

        <div className={` ${Role === "PATIENT" ? "mt-12" : "mt-32"}`}>
          <div></div>
          {Role === "PATIENT" ? (
            <FetchUsers />
          ) : Role === "PHYSICIAN" ? (
            <Physician />
          ) : (
            <Pharmacist />
          )}
        </div>
      </div>
    </div>
  );
}
