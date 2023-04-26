import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import FetchUsers from "./FetchUsers";

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
    <div className="w-full ">
      <div className="flex flex-col max-w-7xl mx-auto">
        <Navbar section="dashboard" />

        <div className="mt-32">
          <div></div>
          {Role === "PATIENT" ? (
            <FetchUsers />
          ) : Role !== "ADMIN" ? (
            <div className="datas ">
              <h1>Medical Records</h1>
              <ul className="datas_1 headers">
                {datas.length &&
                  Object.keys(datas[0])
                    .filter((x) => x !== "type")
                    .map((k) => <li>{k}</li>)}
              </ul>
              {datas.length &&
                datas.map((data1) => {
                  const lis = [];
                  for (const key in data1) {
                    if (
                      Object.hasOwnProperty.call(data1, key) &&
                      key !== "type"
                    ) {
                      const element = data1[key];
                      lis.push(<li>{element}</li>);
                    }
                  }
                  return <ul className="datas_1">{lis}</ul>;
                })}
            </div>
          ) : (
            <>
              {Object.keys(datas).map((d) => {
                return (
                  <>
                    <h2 style={{ margin: "2rem 0", textAlign: "center" }}>
                      {d}
                    </h2>
                    <div className="datas">
                      <ul className="datas_1 headers">
                        {datas[d].length &&
                          Object.keys(datas[d][0])
                            .filter((x) => x !== "type")
                            .map((k) => <li>{k}</li>)}
                      </ul>
                      {datas[d].length &&
                        datas[d].map((data1) => {
                          const lis = [];
                          for (const key in data1) {
                            if (
                              Object.hasOwnProperty.call(data1, key) &&
                              key !== "type"
                            ) {
                              const element = data1[key];
                              lis.push(<li>{element}</li>);
                            }
                          }
                          return <ul className="datas_1">{lis}</ul>;
                        })}
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}