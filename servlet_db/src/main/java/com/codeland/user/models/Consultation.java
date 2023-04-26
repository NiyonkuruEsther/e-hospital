/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codeland.user.models;

/**
 *
 * @author TheGym
 */
public class Consultation {
    private String id;
    private String consultation;

    public Consultation(String id, String consultation) {
        this.id = id;
        this.consultation = consultation;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getConsultation() {
        return consultation;
    }

    public void setConsultation(String consultation) {
        this.consultation = consultation;
    }
}
