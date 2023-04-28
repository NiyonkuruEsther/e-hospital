package com.codeland.database;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.codeland.user.models.User;

import lombok.Getter;

@Getter
public class Users {
  private static Map<String, User> all = new LinkedHashMap<>();

  public static void addUser(User user) {
    all.put(user.getIdentifier(), user);
  }

  public static User findUser(String identifier) {
    return all.get(identifier);
  }

  public static List<User> getUsers() {
    return new ArrayList<>(all.values());
  }

}
