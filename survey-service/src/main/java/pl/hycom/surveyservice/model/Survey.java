package pl.hycom.surveyservice.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.UUID;

public class Survey {

    @Id
    private ObjectId id;
    private String token;
    @NotBlank(message = "Survey Name cannot be null.")
    private String surveyName;
    private String surveyDescription;
    @NotNull(message = "Page cannot be null.")
    private @Valid Page[] pageList;

    public String getOldVersionToken() {
        return token;
    }

    public void setOldVersionToken(String oldVersionToken) {
        this.token = oldVersionToken;
    }

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public String getSurveyDescription() {
        return surveyDescription;
    }

    public void setSurveyDescription(String surveyDescription) {
        this.surveyDescription = surveyDescription;
    }

    public Page[] getPageList() {
        return pageList;
    }

    public void setPageList(Page[] pageList) {
        this.pageList = pageList;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }
}
