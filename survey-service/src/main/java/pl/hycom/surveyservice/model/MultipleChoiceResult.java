package pl.hycom.surveyservice.model;

import java.util.HashMap;
import java.util.Map;

public class MultipleChoiceResult {
    private Map<String, Integer> choiceList = new HashMap<>();
    private String QuestionText;

    public Map<String, Integer> getChoiceList() {
        return choiceList;
    }

    public void setChoiceList(Map<String, Integer> choiceList) {
        this.choiceList = choiceList;
    }

    public String getQuestionText() {
        return QuestionText;
    }

    public void setQuestionText(String questionText) {
        QuestionText = questionText;
    }
}
