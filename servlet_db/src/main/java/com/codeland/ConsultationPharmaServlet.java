package com.codeland;

import com.codeland.database.Users;
import com.codeland.user.models.ConsultationPharma;
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
@WebServlet(urlPatterns = {"/ConsultationPharmaServlet"})
public class ConsultationPharmaServlet extends HttpServlet {

    private static Map<String, ConsultationPharma> consultationMap = new LinkedHashMap<>();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        // Read the request body as a string
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String inputLine;
        while ((inputLine = reader.readLine()) != null) {
            buffer.append(inputLine);
        }
        String requestBody = buffer.toString();

        // Parse the request body JSON into the ConsultationPharma object
        Map<String, String> requestMap = new Gson().fromJson(requestBody, HashMap.class);

        // Parse the request body JSON into the ConsultationPharma object
        Gson gson = new Gson();
        ConsultationPharma consultationInfo = gson.fromJson(requestBody, ConsultationPharma.class);
        String id = requestMap.get("id");

        // Store the values in a linked hash map
        consultationMap.put(id, consultationInfo);

        ApiResponse apiResponse = new ApiResponse(ResponseFormat.SUCCESS, consultationMap);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        out.print(gson.toJson(apiResponse));
        out.flush();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Get the id parameter from the request
    Map<String, ConsultationPharma> resultMap = new LinkedHashMap<>();

        // Retrieve the ConsultationPharma object from consultationMap using the id as the key
        for (Map.Entry<String, ConsultationPharma> entry : consultationMap.entrySet()) {
        String id = entry.getKey();
        ConsultationPharma consultationInfo = entry.getValue();
        resultMap.put(id, consultationInfo);
    }
 ApiResponse apiResponse = new ApiResponse(ResponseFormat.SUCCESS, resultMap);

    // Send the ApiResponse object as a JSON response
    Gson gson = new Gson();
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();
    out.print(gson.toJson(apiResponse));
    System.out.println(gson.toJson(apiResponse));
    out.flush();
        // Check if the ConsultationPharma object exists
    }

}

