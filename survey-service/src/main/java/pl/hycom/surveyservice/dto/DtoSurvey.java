package pl.hycom.surveyservice.dto;

import java.util.Date;

public class DtoSurvey {
    private String name;
    private int version;
    private Date creationDate;
    private int numberOfCompletedSurveys;
    private String token;

    public DtoSurvey(String name, int version, Date creationDate, int numberOfCompletedSurveys, String token) {
        this.name = name;
        this.version = version;
        this.creationDate = creationDate;
        this.numberOfCompletedSurveys = numberOfCompletedSurveys;
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public int getNumberOfCompletedSurveys() {
        return numberOfCompletedSurveys;
    }

    public void setNumberOfCompletedSurveys(int numberOfCompletedSurveys) {
        this.numberOfCompletedSurveys = numberOfCompletedSurveys;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}