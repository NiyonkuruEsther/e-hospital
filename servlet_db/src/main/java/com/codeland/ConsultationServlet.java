/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codeland;

import com.codeland.database.Users;
import com.codeland.user.models.PatientInfo;
import com.codeland.user.models.Pharmacist;
import com.codeland.user.models.Physician;
import com.codeland.user.models.User;
import com.codeland.user.utils.ApiResponse;
import com.codeland.user.utils.ResponseFormat;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 *
 * @author TheGym
 */
@WebServlet(urlPatterns = { "/ConsultationServlet" })

public class ConsultationServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Read the data from the request body
        BufferedReader reader = request.getReader();
        StringBuilder sb = new StringBuilder();
        String line = reader.readLine();
        while (line != null) {
            sb.append(line);
            line = reader.readLine();
        }
        String requestBody = sb.toString();

        // Convert the request body to a PatientInfo object
        Gson gson = new Gson();
        PatientInfo patientInfo = gson.fromJson(requestBody, PatientInfo.class);

        // Get the myMap from the DashboardServlet
        Map<String, PatientInfo> myMap = DashboardServlet.getMyMap();

        // Add the new PatientInfo object to a new map using the id as the key
        Map<String, PatientInfo> consultation = new LinkedHashMap<>();
        Map<String, String> requestMap = new Gson().fromJson(requestBody, HashMap.class);
        String id = requestMap.get("id");
        consultation.put(id, patientInfo);

        // Merge the new map with the existing myMap
        myMap.putAll(consultation);

        // Create an ApiResponse containing the PatientInfo object and the success message
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("cunsulation", patientInfo);
        responseData.put("message", "Data added successfully");
        ApiResponse apiResponse = new ApiResponse(ResponseFormat.SUCCESS, responseData);

        // Send the ApiResponse as the JSON response back to the client
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(gson.toJson(apiResponse));
        out.flush();
    }
}


