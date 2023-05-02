package com.codeland.user.servlets;

import com.codeland.user.enums.ERole;
import com.codeland.user.models.Patient;
import com.codeland.user.models.Pharmacist;
import com.codeland.user.models.Physician;
import com.codeland.user.models.User;
import com.codeland.user.utils.ApiResponse;
import com.codeland.user.utils.JsonUtil;
import com.codeland.user.utils.ResponseFormat;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user/signup")
public class registerServlet extends HttpServlet {

@Override
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  try {
    User user;
    user = new JsonUtil().parseBodyJson(req, Patient.class);
    // VALIDATIONS
    if (user.getFirstName() == null)
      throw new RuntimeException("First Name is required");
    if (user.getLastName() == null)
      throw new RuntimeException("Last Name is required");
    if (user.getEmail() == null)
      throw new RuntimeException("Email is required");
    if (user.getPassword() == null)
      throw new RuntimeException("Password is required");
    if (user.getRole() == null)
      throw new RuntimeException("Role is required");
    if (user.getAge() == null)
      throw new RuntimeException("Age is required");
    if (user.getGender() == null)
      throw new RuntimeException("Gender is required");
    if (user.getPhone() == null || user.getPhone().isEmpty())
      throw new RuntimeException("Phone number is required");

    User newUser;
    switch (user.getRole()) {
        
        case Patient:
            newUser = new Patient();
            break;
        case Pharmacist:
            newUser = new Pharmacist();
            break;
        default:
            newUser = new Physician();
            break;
    }
    newUser.setFirstName(user.getFirstName());
    newUser.setGender(user.getGender());
    newUser.setPhone(user.getPhone());
    newUser.setEmail(user.getEmail());
    newUser.setRole(user.getRole());
    newUser.setLastName(user.getLastName());
    newUser.setAge(user.getAge());
    newUser.setPassword(user.getPassword());

    ApiResponse<User> result = newUser.signup();
    ResponseFormat.response(resp, result, HttpServletResponse.SC_CREATED);
  } catch (Exception error) {
//    error.printStackTrace();
    ResponseFormat.response(resp, new ApiResponse<>(error.getMessage(), null), HttpServletResponse.SC_BAD_REQUEST);
  }
}

}
