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

public class ConsultationPharma {
    private List<Object> patientInfo;
    private String consultation;

    public ConsultationPharma() {
        // Empty constructor for Gson
    }

    public ConsultationPharma(List<Object> patientInfo, String consultation) {
        this.patientInfo = patientInfo;
        this.consultation = consultation;
    }

    public List<Object> getPatientInfo() {
        return patientInfo;
    }

    public void setPatientInfo(List<Object> patientInfo) {
        this.patientInfo = patientInfo;
    }

    public String getConsultation() {
        return consultation;
    }

    public void setConsultation(String consultation) {
        this.consultation = consultation;
    }
}