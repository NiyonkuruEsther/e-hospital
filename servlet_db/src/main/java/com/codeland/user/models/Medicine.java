/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codeland.user.models;

import java.util.Date;

/**
 *
 * @author TheGym
 */
public class Medicine {
    private String id;
    private String name;
    private double price;
    private Date expirationDate;

    public Medicine() {
        // Empty constructor for Gson
    }

    public Medicine(String id, double price, String name, Date expirationDate) {
        this.id = id;
        this.price = price;
       this.name = name;
        this.expirationDate = expirationDate;
    }

    public String getId() {
        return id;
    }
 public String getName() {
        return name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }
}
