package pl.hycom.surveyservice.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class AnsweredPage {
    @Id
    private int pageId;
    private List<AnsweredQuestion> questionList;
}
