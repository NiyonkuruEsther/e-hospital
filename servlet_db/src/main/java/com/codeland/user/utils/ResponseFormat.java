package com.codeland.user.utils;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.http.HttpServletResponse;

public class ResponseFormat {
      public static final String SUCCESS = "success";
  public static void response(HttpServletResponse res, ApiResponse payload, int status) {
    res.setContentType("application/json");
    res.setCharacterEncoding("UTF-8");
    res.addHeader("Access-Control-Allow-Origin", "*");
    try {
      if (payload != null) {
        OutputStream output = res.getOutputStream();
        output.write(new JsonUtil().toJSon(payload).getBytes());
        output.flush();
      }
    } catch (IOException error) {
      error.printStackTrace();
    }
  }
}
