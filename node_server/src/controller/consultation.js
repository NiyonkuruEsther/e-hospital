import fetch from "node-fetch";
import { config } from "dotenv";

//App configuration
config();

const host = process.env.HOST || "http://localhost";

const url = `${host}:8080/java_servlet_app`;

export default class Consultation {
  static async getConsultation(req, res) {
    try {
      const response = await fetch(`${url}/ConsultationServlet`, {
        method: "GET",
      });
      const datas = await response.json();
      return res.status(200).json({ message: datas.message, datas });
    } catch (err) {
      console.log(err);
      if (res.statusCode === 500) {
        return res
          .status(500)
          .json({ message: "internal server error", error: err });
      }
      return res.status(400).json({ message: "Unable to signup", error: err });
    }
  }
  static async createConsultation(req, res) {
    try {
      const response = await fetch(`${url}/ConsultationServlet`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...req.body }),
      });

      const datas = await response.json();
      return res
        .status(200)
        .json({ message: datas.message, data: datas.Payload });
    } catch (err) {
      return res.status(400).json({ message: "Unable to login", error: err });
    }
  }
}
