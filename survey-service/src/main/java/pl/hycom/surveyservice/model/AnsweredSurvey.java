package pl.hycom.surveyservice.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class AnsweredSurvey {
    @Id
    public ObjectId token;
    @NotBlank(message = "Pages cannot be null.")
    public List<AnsweredPage> pages;

    public boolean validateAnsweredSurvey()
    {
        //TODO: implement AnsweredSurvey validation
        return true;
    }
}
