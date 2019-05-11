package pl.hycom.surveyservice.model;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class AnsweredSurvey {
    @Id
    private String token;
    @NotBlank(message = "Pages cannot be null.")
    private List<AnsweredPage> pages;

    public boolean validateAnsweredSurvey()
    {
        //TODO: implement AnsweredSurvey validation
        return true;
    }
}
