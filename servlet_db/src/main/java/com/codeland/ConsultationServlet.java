/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codeland;

import com.codeland.user.models.Consultation;
import com.codeland.user.utils.ApiResponse;
import com.codeland.user.utils.ResponseFormat;
import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
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

@WebServlet(urlPatterns = {"/ConsultationServlet"})
public class ConsultationServlet extends HttpServlet {

    private Map<String, Consultation> consultationMap = new LinkedHashMap<>();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get the ID parameter from the request

        // Read the data from the request body
        BufferedReader reader = request.getReader();
        StringBuilder sb = new StringBuilder();
        String line = reader.readLine();
        while (line != null) {
            sb.append(line);
            line = reader.readLine();
        }

        String requestBody = sb.toString();

        // Convert the request body to a Consultation object
        Gson gson = new Gson();
        Map<String, String> requestMap = new Gson().fromJson(requestBody, HashMap.class);
        String id = requestMap.get("id");

        Consultation consultation = gson.fromJson(requestBody, Consultation.class);

        // Update the existing consultation with the new data
        consultationMap.put(id, consultation);

        // Create an ApiResponse containing the updated consultation list and a success message
        List<Consultation> consultationList = new ArrayList<>(consultationMap.values());
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("consultationList", consultationList);
        responseData.put("message", "Data updated successfully");
        ApiResponse apiResponse = new ApiResponse(ResponseFormat.SUCCESS, responseData);

        // Send the ApiResponse as the JSON response back to the client
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(gson.toJson(apiResponse));
        out.flush();
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Create a list of consultations
         Map<String, Consultation> resultMap = new LinkedHashMap<>();

         // Create an ApiResponse object with the consultationList object

        // Retrieve the Consultation object from myMap using the id as the key
        for (Map.Entry<String, Consultation> entry : consultationMap.entrySet()) {
        String id = entry.getKey();
        Consultation consultationList = entry.getValue();
        resultMap.put(id, consultationList);
    }
 ApiResponse apiResponse = new ApiResponse(ResponseFormat.SUCCESS, resultMap);

    // Send the ApiResponse object as a JSON response
    Gson gson = new Gson();
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();
    out.print(gson.toJson(apiResponse));
    System.out.println(gson.toJson(apiResponse));
    out.flush();
        // Check if the Consultation object exists
    
       
    }
}