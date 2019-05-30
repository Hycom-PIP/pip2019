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
    private boolean isCurrentVersion;
    private int version = 1;
    @NotBlank(message = "Survey Name cannot be null.")
    private String surveyName;
    private String surveyDescription;
    @NotNull(message = "Page cannot be null.")
    private @Valid Page[] pageList;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean getIsCurrentVersion() {
        return isCurrentVersion;
    }

    public void setCurrentVersion(boolean currentVersion) {
        isCurrentVersion = currentVersion;
    }
    
    public int getVersion ()    {
        return version;
    }
    
    public void setVersion ( int version )    {
        this.version = version;
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
