import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Pharmacist = () => {
  const [datas, setDatas] = useState([]);
  const [enterConsultation, setEnterConsultation] = useState(false);
  // const [consultationInput, setConsultationInput] = useState("");
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [cols, setCols] = useState([]);

  const [medicineName, setMedicineName] = useState("");
  const [medicinePrice, setMedicinePrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleMedicineNameChange = (event) => {
    setMedicineName(event.target.value);
    console.log(`Medicine Name: ${event.target.value}`);
  };

  const handleMedicinePriceChange = (event) => {
    setMedicinePrice(event.target.value);
    console.log(`Medicine Price: ${event.target.value}`);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
    console.log(`Expiration Date: ${event.target.value}`);
  };

  function openConsultationInput(user) {
    // console.log({ user }, "userrrrrrrrrrrrr");
    setSelectedPatient(user);
    setEnterConsultation(true);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/v1/consultation/pharmacist`)
      .then(function (response) {
        const patientInfos = [];
        // console.log(response.data.datas.Payload, "payyyyyyyyyyy");
        for (const key of Object.keys(response.data.datas.Payload)) {
          const patientInfo = response.data.datas.Payload[key];
          patientInfos.push(patientInfo);
        }
        setCols(patientInfos[0]?.patientInfo[0]);
        console.log(response.data.datas, "consultations");

        // console.log(cols, "kll");
        setDatas(patientInfos);
        // console.log("payload", datas, cols);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleMedicineSubmit = (event) => {
    event.preventDefault();
    // console.log({ selectedPatient, consultationInput });
    axios
      .post("http://localhost:5500/api/v1/medicine", {
        id: selectedPatient[1],
        price: medicinePrice,
        name: medicineName,
        expirationDate: expirationDate,
      })
      .then((response) => {
        toast.success("POST request was successful!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occurred during POST request.");
      });
    // setConsultationInput("");
    setMedicineName("");
    setMedicinePrice("");
    setExpirationDate("");
  };
  const data = datas.map((item, index) => {
    console.log(item, "item");
    const arr = [item.consultation, ...Object.values(item.patientInfo[0])];
    console.log(arr, "array");
    // arr.splice(1, 1);
    console.log(arr);
    return arr;
  });
  // .slice(1);
  console.log(data, "data");
  return (
    <>
      <h1 className="text-4xl text-center py-8 text-orange-500 font-bold">
        List of accessible Patients
      </h1>
      {datas.length > 0 && (
        <table className=" mx-auto w-full mb-8">
          <thead className="w-full">
            <tr className="bg-orange-500 text-white">
              {cols &&
                Object.keys(cols)
                  .filter((x) => x !== "id")
                  .filter((x) => x !== "identifier")
                  .map((k) => (
                    <th key={k} className="py-2 px-6">
                      {k}
                    </th>
                  ))}

              <th className="py-2 px-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(datas, "null")}
            {data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="border-b-2 border-gray-200 text-center"
                >
                  {item
                    .slice(2)
                    .slice(0, -1)
                    .map((item) => {
                      return <td>{item}</td>;
                    })}
                  {/* {item.map((item) => {
            })} */}
                  <td className="py-2 px-4">
                    <button
                      onClick={() => openConsultationInput(item)}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      Consultation
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {enterConsultation && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
          <div className="modal-content bg-white mx-auto w-1/2 p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className="close absolute top-4 right-4 text-black cursor-pointer text-3xl font-bold"
              onClick={() => setEnterConsultation(false)}
            >
              &times;
            </span>
            <h3 className="text-xl font-bold mb-4 text-center">
              Write medicins for Patient {selectedPatient[2]}
              {selectedPatient[3]}
            </h3>
            <div className="w-full flex flex-col py-6 gap-4 justify-center items-center">
              <h1 className="font-semibold text-xl">
                Patient {selectedPatient[2]} {selectedPatient[3]}
                &apos; written consultation
              </h1>
              <p className="text-center p-12 border-2">{selectedPatient[0]}</p>
            </div>
            <form onSubmit={handleMedicineSubmit}>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="medicineName"
                  className="text-gray-700 text-lg font-medium mb-2"
                >
                  Medicine Name
                </label>
                <input
                  type="text"
                  id="medicineName"
                  name="medicineName"
                  value={medicineName}
                  onChange={handleMedicineNameChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="medicinePrice"
                  className="text-gray-700 text-lg font-medium mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="medicinePrice"
                  name="medicinePrice"
                  value={medicinePrice}
                  onChange={handleMedicinePriceChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="expirationDate"
                  className="text-gray-700 text-lg font-medium mb-2"
                >
                  Expiration Date (YYYY-MM-DD)
                </label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
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
};

export default Pharmacist;
