/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codeland.user.models;

/**
 *
 * @author TheGym
 */
import java.util.List;

public class PatientInfo {
    private List<Object> patientInfo;
    private String disease;

    public PatientInfo() {
        // Empty constructor for Gson
    }

    public PatientInfo(List<Object> patientInfo, String disease) {
        this.patientInfo = patientInfo;
        this.disease = disease;
    }

    public List<Object> getPatientInfo() {
        return patientInfo;
    }

    public void setPatientInfo(List<Object> patientInfo) {
        this.patientInfo = patientInfo;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }
}
