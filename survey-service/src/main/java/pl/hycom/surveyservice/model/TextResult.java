package pl.hycom.surveyservice.model;

import java.util.ArrayList;
import java.util.List;

public class TextResult {
    private List<String> answerList = new ArrayList<>();
    private String questionText;

    public List<String> getAnswerList() {
        return answerList;
    }

    public void setAnswerList(List<String> answerList) {
        this.answerList = answerList;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
}
