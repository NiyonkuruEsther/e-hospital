// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Navbar from "../Components/Navbar";
// import "../Assets/Styles/users.css";

// export default function FetchUsers() {
//   const navigate = useNavigate();

//   const [datas, setDatas] = useState([]);

//   const user = localStorage.getItem("user");
//   if (!user) navigate("/");

//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:5500/api/v1/users/all?role[]=pharmacist&role[]=physician`
//       )
//       .then(function (response) {
//         toast.success(response?.data?.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setDatas(response?.data?.datas?.Payload);
//       })
//       .catch(function (error) {
//         toast.error(error.response?.data?.message, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         console.log(error);
//       });
//   }, []);

//   const csvmaker = function () {
//     // Check if there are no datas or if any of the users is of role patient
//     if (datas.length && !datas.some((data) => data.role === "patient")) {
//       let arrayData = [
//         [
//           "ID",
//           "Firstname",
//           "Lastname",
//           "Email",
//           "Gender",
//           "Age",
//           "Country",
//           "Role",
//         ],
//         ...datas.map(Object.values),
//       ];

//       let csvContent =
//         "data:text/csv;charset=utf-8," +
//         arrayData.map((e) => e.join(",")).join("\n");
//       let encodedUri = encodeURI(csvContent);
//       window.open(encodedUri);
//     } else {
//       // If any user has role patient, display an error message
//       toast.error("CSV download not allowed for patients.", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   return (
//     <div className="main">
//       <Navbar />
//       <div
//         style={{
//           margin: "30rem 0 0 35rem",
//           transform: "translate(-50%, -50%)",
//           display: "flex",
//           width: "60%",
//           height: "90vh",
//           padding: "2rem",
//           flexDirection: "column",
//           flex: "2",
//         }}
//       >
//         <h1 style={{ marginBottom: "4rem", textAlign: "center" }}>App Users</h1>
//         <div className="datas">
//           <ul className="datas_1 headers">
//             {datas.length &&
//               Object.keys(datas[0])
//                 .filter((x) => x !== "id")
//                 .map((k) => <li>{k}</li>)}
//           </ul>
//           {datas.length &&
//             datas.map((data1) => {
//               const lis = [];
//               for (const key in data1) {
//                 if (Object.hasOwnProperty.call(data1, key) && key !== "id") {
//                   const element = data1[key];
//                   lis.push(<li>{element}</li>);
//                 }
//               }
//               return <ul className="datas_1">{lis}</ul>;
//             })}
//         </div>
//         <button
//           style={{
//             width: "20%",
//             height: "3rem",
//             marginTop: "2rem",
//             background: "none",
//             fontWeight: "bolder",
//             fontSize: "large",
//             color: "white",
//             border: "1px solid",
//             backgroundColor: "blue",
//             cursor: "pointer",
//             borderRadius: "10px",
//             alignSelf: "center",
//           }}
//           type="button"
//           onClick={csvmaker}
//         >
//           DOWNLOAD CSV
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FetchUsers() {
  const navigate = useNavigate();
  const [showModalPhysician, setShowModalPhysician] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [toPhysician, setToPhysician] = useState({
    id: undefined,
    patientInfo: {
      patientInfo: [],
      disease: "",
    },
  });

  const [showModalPharmacist, setShowModalPharmacist] = useState(false);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);

  // new state variable for modal input
  const [modalInput, setModalInput] = useState("");

  function openModalPhysician(user) {
    setUserSelected(user);
    setShowModalPhysician(true);
  }

  function openModalPharmacist(pharmacist) {
    setSelectedPharmacist(pharmacist);
    setShowModalPharmacist(true);
  }

  const [datas, setDatas] = useState([]);

  const user = localStorage.getItem("user");
  if (!user) navigate("/");

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/v1/users/all")
      .then(function (response) {
        setDatas(response.data.datas.Payload);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const pharmacists = datas.filter(
    (data1) => data1.role === "Pharmacist" && data1.age
  );

  const sortedPharmacists = [...pharmacists].sort(
    (a, b) => new Date(a.age) - new Date(b.age)
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modalInput !== "") {
      setToPhysician({
        id: userSelected.id,
        patientInfo: {
          patientInfo: [],
          disease: modalInput,
        },
      });
      setModalInput("");
    } else {
      return false;
    }
    console.log(userSelected, toPhysician, "jjjj", modalInput);
  };

  return (
    <>
      <h1 className="text-4xl text-center py-8 text-orange-500 font-bold">
        List of available Physicians and Pharmacists
      </h1>
      {datas.length > 0 && (
        <table className="table-auto mx-auto w-full mb-8">
          <thead>
            <tr className="bg-orange-500 text-white">
              {Object.keys(datas[0])
                .filter((x) => x !== "id")
                .map((k) => (
                  <th key={k} className="py-2 px-4">
                    {k}
                  </th>
                ))}

              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datas
              .filter((data) => data.role === "Physician" && data.age)
              .sort((a, b) => a.firstName.localeCompare(b.firstName))
              .map((data) => (
                <tr key={data.id} className="border-b-2 border-gray-200">
                  {Object.keys(data)
                    .filter((x) => x !== "id")
                    .map((key) => (
                      <td key={key} className="py-2 px-4">
                        {data[key]}
                      </td>
                    ))}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => openModalPhysician(data)}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      Grant Access
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {showModalPhysician && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white mx-auto w-1/2 p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className="close absolute top-4 right-4 text-black cursor-pointer text-3xl font-bold"
              onClick={() => setShowModalPhysician(false)}
            >
              &times;
            </span>
            <h3 className="text-xl font-bold mb-4 text-center">
              Grant Access to Physician {userSelected?.firstName}
            </h3>
            <form onSubmit={handleSubmit}>
              <textarea
                name="disease"
                rows="4"
                cols="50"
                className="w-full border-gray-200 rounded px-2 py-1 border-2 outline-none focus:border-none focus:ring-2 ring-orange-500"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-3xl text-center py-8 text-orange-500 font-bold">
        Pharmacists
      </h2>
      {datas.length > 0 && (
        <table className="table-auto mx-auto w-full">
          <thead>
            <tr className="bg-orange-500 text-white">
              {Object.keys(datas[0])
                .filter((x) => x !== "id")
                .map((k) => (
                  <th key={k} className="py-2 px-4">
                    {k}
                  </th>
                ))}
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPharmacists.map((data) => (
              <tr key={data.id} className="border-b-2 border-gray-200">
                {Object.keys(data)
                  .filter((x) => x !== "id")
                  .map((key) => (
                    <td key={key} className="py-2 px-4">
                      {data[key]}
                    </td>
                  ))}
                <td className="py-2 px-4">
                  <button
                    onClick={() => openModalPharmacist(data)}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Grant Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModalPharmacist && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white mx-auto w-1/2 p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className="close absolute top-4 right-4 text-black cursor-pointer text-3xl font-bold"
              onClick={() => setShowModalPharmacist(false)}
            >
              &times;
            </span>
            <h3 className="text-xl font-bold mb-4 text-center">
              Grant Access to Pharmacist {selectedPharmacist?.firstName}
            </h3>
            <form>
              <textarea
                rows="4"
                cols="50"
                className="w-full border-gray-200 rounded px-2 py-1 border-2 outline-none focus:border-none focus:ring-2 ring-orange-500"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
