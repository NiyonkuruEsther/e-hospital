import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Navbar(props) {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const name = JSON.parse(user).firstName + " " + JSON.parse(user).lastName;
  if (!user) {
    navigate("/");
  }

  let role = (user && JSON.parse(user).role) || "";

  const Role = role && role.toUpperCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="flex flex-col items-center absolute gap-2">
      <span className="flex flex-col items-center w-full ">
        <MdOutlineAccountCircle className="text-darkGreen text-5xl" />
        <p
          style={{ marginBottom: "1rem" }}
          className="flex items-center font-bold text-lg"
        >
          {user && name}
        </p>
        <p className="font-bold opacity-40"> {role}</p>
      </span>
      <span />
      {Role && Role === "ADMIN" ? (
        props.section === "dashboard" ? (
          <Link className="users-button" to="/users">
            USERS
          </Link>
        ) : (
          <Link className="users-button" to="/dashboard">
            Dashboard
          </Link>
        )
      ) : (
        ""
      )}
      <button
        type="button"
        onClick={handleLogout}
        className=" text-base font-bold text-white flex justify-center p-2 bg-darkGreen"
      >
        LOGOUT
      </button>
    </header>
  );
}
