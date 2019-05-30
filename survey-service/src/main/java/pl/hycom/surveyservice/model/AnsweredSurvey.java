package pl.hycom.surveyservice.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class AnsweredSurvey {
    public ObjectId token;
    public List<AnsweredPage> pages;

    public boolean validateAnsweredSurvey() {
        if (pages.isEmpty()) {
            return false;
        }

        for(AnsweredPage page : pages)
        {
            if(!page.validatePage())
            {
                return false;
            }
        }
        return true;
    }
}
