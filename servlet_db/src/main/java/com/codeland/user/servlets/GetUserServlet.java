package com.codeland.user.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.codeland.database.Users;
import com.codeland.user.models.User;
import com.codeland.user.utils.ApiResponse;
import com.codeland.user.utils.ResponseFormat;

@WebServlet("/users/single")
@WebInitParam(name = "email", value = "Not provided")
public class GetUserServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		try {
			String uniqueIdentifier = req.getParameter("uniqueIdentifier");
			if (uniqueIdentifier == null)
				throw new RuntimeException("No identifier specified");
			User user = Users.findUser(uniqueIdentifier);
			if (user == null)
				throw new RuntimeException("User not found");
			ResponseFormat.response(res, new ApiResponse<User>("User retrieved successfully", user),
					HttpServletResponse.SC_OK);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseFormat.response(res, new ApiResponse<>(e.getMessage(), null),
					HttpServletResponse.SC_FORBIDDEN);
		}
	}
}
