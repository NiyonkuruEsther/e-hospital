import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Physician = () => {
  const [datas, setDatas] = useState([]);
  const [enterConsultation, setEnterConsultation] = useState(false);
  const [consultationInput, setConsultationInput] = useState("");
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [cols, setCols] = useState([]);

  function openConsultationInput(user) {
    console.log({ user });
    setSelectedPatient(user);
    setEnterConsultation(true);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:5500/api/v1/disease`)
      .then(function (response) {
        const patientInfos = [];
        for (const key of Object.keys(response.data.datas.Payload)) {
          const patientInfo = response.data.datas.Payload[key];
          patientInfos.push(patientInfo);
        }
        console.log(response.data.datas.Payload, patientInfos[0]);

        setCols(patientInfos[0].patientInfo[0]);
        console.log(cols, "kll");
        setDatas(patientInfos);
        console.log("payload", datas, cols);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleConsultationSubmit = (event) => {
    event.preventDefault();
    setConsultationInput("");
    console.log(selectedPatient[1], consultationInput);
    axios
      .post("http://localhost:5500/api/v1/consultation", {
        id: selectedPatient[1],
        consultation: consultationInput,
      })
      .then((response) => {
        toast.success("POST request was successful!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occurred during POST request.");
      });
  };
  const data = datas.map((item, index) => {
    const arr = [
      item.disease,
      ...Object.values(
        item.patientInfo ? item.patientInfo && item.patientInfo[0] : {}
      ),
    ];
    // arr.splice(1, 1);
    return arr;
  });

  console.log(data);
  return (
    <>
      <h1 className="text-4xl text-center py-8 text-darkGreen font-bold">
        List of accessible Patients
      </h1>
      {datas.length > 0 && (
        <table className=" mx-auto w-full mb-8">
          <thead className="w-full">
            <tr className="bg-darkGreen text-white">
              {Object.keys(cols)
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
                      className="bg-darkGreen hover:bg-green-900 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-darkGreen"
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
              Written Consultation for Patient {selectedPatient[2]}{" "}
              {selectedPatient[3]}
            </h3>
            <div className="w-full flex flex-col py-6 gap-4 justify-center items-center">
              <h1 className="font-semibold text-xl">
                Patient {selectedPatient[2]} {selectedPatient[3]}
                &apos;s disease
              </h1>
              <p className="text-center p-12 border-2">{selectedPatient[0]}</p>
            </div>
            <form onSubmit={handleConsultationSubmit}>
              <textarea
                placeholder="Writer here the written consultation for the patient..."
                name="disease"
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
};

export default Physician;
