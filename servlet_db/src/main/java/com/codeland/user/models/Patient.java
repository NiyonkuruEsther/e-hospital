package com.codeland.user.models;

import java.util.regex.Pattern;

import com.codeland.database.Users;
import com.codeland.user.utils.ApiResponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Patient extends User {
  @Override
  public ApiResponse<User> signup() throws Exception {
      setIdentifier(getFirstName() + getLastName());
    if (!Pattern.matches("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*$", getEmail())) {
      throw new Exception("Invalid email address!");
    }
    if (Users.findUser(getIdentifier()) != null) {
      throw new Exception("User already exists");
    }
    if (!Pattern.matches("^\\w{4,6}$", getPassword())) {
      throw new Exception("Password must be between 4 to 6 characters!");
    }
    encryptPassword();
    Users.addUser(this);
    return new ApiResponse<>("Patient successfully registered!", Users.findUser(getIdentifier()));
  }
}
