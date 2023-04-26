import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import axios from "axios";
import countryList from "react-select-country-list";
import { LoginOutlined } from "@mui/icons-material";

export default function SignupForm() {
  const [selected, setSelected] = useState("");

  const selectDropdown = (e) => {
    const val = e.target.value;
    setSelected(val);
  };
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    country: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5500/api/v1/auth/user/signup", {
        ...values,
        role: selected,
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
        console.log(response, "response");
        navigate("/login");
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
        console.log(error.response, "error");
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value, key) => {
    setValue(value);
    setValues({ ...values, [key.name]: value.label });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center ">
      <div className="max-w-4xl mx-auto border-4 ring-4 ring-orange-500 w-full py-6 gap-6 flex flex-col">
        <div className="">
          <h2 className="text-center text-orange-500  font-extrabold text-3xl">
            Welcome to Go-Healthy
          </h2>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="max-w-3xl mx-auto w-full flex flex-col gap-4"
        >
          <div className="flex w-full gap-4 ">
            <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
              <input
                className="w-5/6 focus:outline-none px-4"
                type="text"
                name="firstName"
                value={values.firstName}
                placeholder="Firstname..."
                onChange={handleChange}
              />
            </div>
            <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
              <input
                className="w-5/6 focus:outline-none px-4"
                type="text"
                name="lastName"
                value={values.lastName}
                placeholder="Lastname..."
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
            <input
              className="w-5/6 focus:outline-none px-4"
              type="email"
              name="email"
              value={values.email}
              placeholder="Enter a valid Email"
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
              <input
                className="w-fit  focus:outline-none mx-auto"
                type="password"
                name="password"
                value={values.password}
                placeholder="Create a Password..."
                onChange={handleChange}
              />
            </div>
            <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
              <input
                className="w-5/6 focus:outline-none px-4"
                type="number"
                name="age"
                value={values.age}
                placeholder="Age..."
                onChange={handleChange}
              />
            </div>
          </div>

          <p className="text-opacity-20 text-black  text-xl">
            Choose your country
          </p>
          <div className="country ">
            <Select
              className=""
              options={options}
              name="country"
              value={value}
              onChange={changeHandler}
            />
          </div>
          <label htmlFor="gender" className="opacity-40 text-lg">
            Gender
          </label>
          <div className="flex justify-around">
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Male"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Female"
              />
              <label htmlFor="female">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                onChange={handleChange}
                value="Other"
              />
              <label htmlFor="other">Other</label>
            </div>
          </div>

          <div className="password pb-1 w-full rounded-3xl h-14 border-2 focus:ring-2 ring-orange-500 flex flex-col justify-center items-center">
            <select
              className="w-5/6 focus:outline-none "
              onChange={selectDropdown}
            >
              <option selected value="">
                Select Role...
              </option>
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Physician">Physician</option>
            </select>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              className="submit text-xl font-bold text-white flex justify-center p-4 rounded-full items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-300"
              type="submit"
              onClick={handleFormSubmit}
            >
              <LoginOutlined />
              <span>SIGN UP</span>
            </button>
            <span className="span text-opacity-40 text-black">
              Already a Go-Healthy member!
              <Link
                className="link text-orange-500"
                to={"/login"}
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
