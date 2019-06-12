package pl.hycom.surveyservice.model;

import java.util.List;

public class AnsweredQuestion {
    public int questionId;
    public String questionText;
    public String questionType;
    public List<String> answers;
    public boolean validateQuestion() {
        return questionId > -1 && !answers.isEmpty();
    }
}
