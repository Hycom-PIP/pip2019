

package pl.hycom.surveyservice.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class Survey {
    
    @Id
    private ObjectId id;
    private String uuid;
    private String token;
    private int version;
    @NotBlank(message = "Survey Name cannot be null.")
    private String surveyName;
    private String surveyDescription;
    @NotNull(message = "Page cannot be null.")
    private @Valid Page[] pageList;
    
    public String getToken () {
        return token;
    }
    
    public void setToken ( String token ) {
        this.token = token;
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
    
    public String getUuid() {
        return uuid;
    }
    
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
    
    public int getVersion ()
    {
        return version;
    }
    
    public void setVersion ( int version )
    {
        this.version = version;
    }
}
