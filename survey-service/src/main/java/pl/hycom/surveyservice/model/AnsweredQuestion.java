package pl.hycom.surveyservice.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class AnsweredQuestion {
    @Id
    private int questionId;
    private List<String> answers;
}
