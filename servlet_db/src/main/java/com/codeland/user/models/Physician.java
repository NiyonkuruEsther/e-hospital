package com.codeland.user.models;

import java.util.regex.Pattern;

import com.codeland.database.Users;
import com.codeland.user.utils.ApiResponse;

public class Physician extends User {
  @Override
  public ApiResponse<User> signup() throws Exception {
    if (!Pattern.matches("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*$", getEmail())) {
      throw new Exception("Invalid email address!");
    }
      setIdentifier(getEmail());
    if (Users.findUser(getIdentifier()) != null) {
      throw new Exception("User already exists");
    }
    if (!Pattern.matches("^\\w{7,8}$", getPassword())) {
      throw new Exception("Password must be between 7 to 8 characters!");
    }
    encryptPassword();
    Users.addUser(this);
    return new ApiResponse<>("physician successfully registered!", Users.findUser(getIdentifier()));
  };

    public Object getName() {
        throw new UnsupportedOperationException("Not supported yet."); 
    }

}
