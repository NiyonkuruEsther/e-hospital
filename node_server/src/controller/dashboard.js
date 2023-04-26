import express from "express";
import { json } from "body-parser";

const app = express();

// Middleware to parse JSON request body
app.use(json());

// Define a POST endpoint to handle patient info sent from the DashboardServlet
app.post("/dashboard", (req, res) => {
  const patientInfo = req.body;
  console.log("Received patient info:", patientInfo);

  // Here you can perform any necessary processing or validation on the received data

  // Send a response back to the servlet indicating success
  const responseData = { message: "Patient info received successfully" };
  res.status(200).json(responseData);
});

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
