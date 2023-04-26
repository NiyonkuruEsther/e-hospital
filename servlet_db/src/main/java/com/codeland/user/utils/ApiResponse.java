package com.codeland.user.utils;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ApiResponse<T> {
  String message;
  T Payload;

}
