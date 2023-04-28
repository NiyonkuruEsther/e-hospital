package com.codeland;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.codeland.user.utils.ApiResponse;
import com.codeland.user.utils.ResponseFormat;
import java.io.IOException;

@WebServlet("")
public class MainServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ResponseFormat.response(resp, new ApiResponse<>("Started the Server", null), HttpServletResponse.SC_OK);
    }
}
