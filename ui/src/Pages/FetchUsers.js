import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

export default function FetchUsers() {
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState({});
  const [medicine, setMedicine] = useState({});
  const [consultationInput, setConsultationInput] = useState("");
  const [showModalPhysician, setShowModalPhysician] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const [showModalPharmacist, setShowModalPharmacist] = useState(false);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);
  const [showConsultations, setShowConsultations] = useState(false);
  const [showMedicines, setShowMedicines] = useState(false);

  // new state variable for modal input
  const [modalInput, setModalInput] = useState("");

  function openModalPhysician(user) {
    setUserSelected(user);
    setShowModalPhysician(true);
  }

  function openConsultations() {
    setShowConsultations(true);
  }

  function openMedicines() {
    setShowMedicines(true);
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
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleDiseaseSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/v1/disease", {
        id: userSelected.id,
        patientInfo: [loggedInUser],
        disease: modalInput,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("POST request was successful!");
      })
      .catch((error) => {
        toast.error("Error occurred during POST request.");
      });
    setModalInput("");
  };

  const allConsultation = () => {
    axios
      .get(`http://localhost:5500/api/v1/consultation`)
      .then((response) => {
        const payloadData = response.data.datas.Payload;
        setConsultation(payloadData[loggedInUser.id]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const allMedicines = () => {
    axios
      .get(`http://localhost:5500/api/v1/medicine`)
      .then((response) => {
        const payloadData = response.data.datas.Payload;
        setMedicine(payloadData[loggedInUser.id]);
        console.log("payyyyyyyyyy", medicine);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // console.log(consultationInput, "medicine");

  const handleConsultationSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5500/api/v1/consultation/pharmacist", {
        id: loggedInUser.id,
        consultation: consultationInput,
        patientInfo: [loggedInUser],
      })
      .then((response) => {
        console.log(response, "sdhskjdfhdskj", {
          id: loggedInUser.id,
          consulation: consultationInput,
          patientInfo: [loggedInUser],
        });
        toast.success("POST request was successful!");
      })
      .catch((error) => {
        toast.error("Error occurred during POST request.");
      });
    setConsultationInput("");
  };

  const data = [
    ["Name", "Price", "Expiration Date"],
    [medicine.name, medicine.price, medicine.expirationDate],
  ];

  return (
    <>
      <div className="w-full grid justify-end h-full items-end">
        <button
          onClick={(event) => {
            allConsultation();
            openConsultations();
          }}
          className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen mt-4"
        >
          Consultations
        </button>
        <button
          onClick={(event) => {
            allMedicines();
            openMedicines();
          }}
          className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen mt-4"
        >
          MedIcine
        </button>
      </div>

      <h1 className="text-4xl text-center pb-8 text-darkGreen font-bold">
        List of available Physicians and Pharmacists
      </h1>
      {datas.length > 0 && (
        <table className="table-auto mx-auto w-full mb-8">
          <thead>
            <tr className="bg-darkGreen text-white">
              {Object.keys(datas[0])
                .filter((x) => x !== "id")
                .filter((x) => x !== "identifier")
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
                    .filter((x) => x !== "identifier")
                    .map((key) => (
                      <td key={key} className="py-2 px-4">
                        {data[key]}
                      </td>
                    ))}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => openModalPhysician(data)}
                      className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen"
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
            <form onSubmit={handleDiseaseSubmit}>
              <textarea
                name="disease"
                rows="4"
                cols="50"
                className="w-full border-gray-200 rounded px-2 py-1 border-2 outline-none focus:border-none focus:ring-2 ring-darkGreen"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showConsultations && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white mx-auto w-1/2 p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className="close absolute top-4 right-4 text-black cursor-pointer text-3xl font-bold"
              onClick={() => setShowConsultations(false)}
            >
              &times;
            </span>
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl text-center">
                Consulations from Physicians
              </h1>
              <p className="text-2xl">
                <b>Consultation</b> : {consultation.consultation}
              </p>
            </div>
          </div>
        </div>
      )}

      {showMedicines && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white mx-auto w-1/2 p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className="close absolute top-4 right-4 text-black cursor-pointer text-3xl font-bold"
              onClick={() => setShowMedicines(false)}
            >
              &times;
            </span>
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl text-center">
                Medicines from Pharmacists
              </h1>
              <div className="text-2xl border-2  flex flex-col gap-6">
                <p className="">{medicine.name}</p>
                <p className="">{medicine.price}</p>
                <p className="mb-12">{medicine.expirationDate}</p>

                <CSVLink
                  data={data}
                  className="bg-darkGreen  hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen mt-12"
                >
                  Download Medicine CSV
                </CSVLink>
              </div>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-3xl text-center py-8 text-darkGreen font-bold">
        Pharmacists
      </h2>
      {datas.length > 0 && (
        <table className="table-auto mx-auto w-full">
          <thead>
            <tr className="bg-darkGreen text-white">
              {Object.keys(datas[0])
                .filter((x) => x !== "id")
                .filter((x) => x !== "identifier")
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
                  .filter((x) => x !== "identifier")

                  .map((key) => (
                    <td key={key} className="py-2 px-4">
                      {data[key]}
                    </td>
                  ))}
                <td className="py-2 px-4">
                  <button
                    onClick={() => openModalPharmacist(data)}
                    className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen"
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
            <form onSubmit={handleConsultationSubmit}>
              <textarea
                rows="4"
                cols="50"
                className="w-full border-gray-200 rounded px-2 py-1 border-2 outline-none focus:border-none focus:ring-2 ring-darkGreen"
                value={consultationInput}
                onChange={(e) => setConsultationInput(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen mt-4"
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
