package com.codeland.user.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.codeland.database.Users;
import com.codeland.user.models.Pharmacist;
import com.codeland.user.models.Physician;
import com.codeland.user.models.User;
import com.codeland.user.utils.ApiResponse;
import com.codeland.user.utils.ResponseFormat;

@WebServlet("/users/all")
@WebInitParam(name = "email", value = "Not provided")
public class ListUsersServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    try {
      List<User> allUsers = Users.getUsers();
      List<User> healthcareUsers = new ArrayList<>();

      for (User user : allUsers) {
        if (user instanceof Pharmacist || user instanceof Physician) {
          healthcareUsers.add(user);
        }
      }

      ResponseFormat.response(res, new ApiResponse<>("Healthcare users retrieved", healthcareUsers), HttpServletResponse.SC_OK);
    } catch (Exception e) {
      e.printStackTrace();
      ResponseFormat.response(res, new ApiResponse<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
    }
  }
}
