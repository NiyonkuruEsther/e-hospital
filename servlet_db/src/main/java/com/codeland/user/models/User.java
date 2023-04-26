package com.codeland.user.models;

import java.util.UUID;

import javax.naming.AuthenticationException;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.codeland.user.utils.ApiResponse;
import com.google.gson.annotations.Expose;
import com.codeland.database.Users;
import com.codeland.user.enums.EGender;
import com.codeland.user.enums.ERole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.mindrot.jbcrypt.*;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public abstract class User {
  private String id;
  @NonNull
  private String firstName;
  @NonNull
  private String lastName;
  @NonNull
  private String email;
  @NonNull
  @Expose(serialize = false)
  protected String password;
  @NonNull
  @Enumerated(EnumType.STRING)
  private EGender gender;
  @NonNull
  private Integer age;
  @NonNull
  private String country;
  @NonNull
  public ERole role;

  public  User() {
    id = UUID.randomUUID().toString();
  }

  public abstract ApiResponse<User> signup() throws Exception;

  public void encryptPassword() {
    this.setPassword(BCrypt.hashpw(this.password, BCrypt.gensalt(10)));
  }

  public ApiResponse<User> login(String email, String password) throws AuthenticationException {
    User foundUser = Users.findUser(email);
    if (foundUser == null)
      throw new AuthenticationException("Invalid credentials!❌❌❌❌");
    if (!BCrypt.checkpw(password, foundUser.password))
      throw new AuthenticationException("Invalid credentials!❌❌❌❌");
    return new ApiResponse<>("User successfully loggedIn 😇", foundUser);
  }
}
