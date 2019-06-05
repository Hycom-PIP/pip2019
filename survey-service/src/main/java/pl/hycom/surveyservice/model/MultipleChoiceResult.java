package pl.hycom.surveyservice.model;

import java.util.ArrayList;
import java.util.List;

public class MultipleChoiceResult {
    private List<ResultChoice> choiceList = new ArrayList<>();
    private String QuestionText;

    public List<ResultChoice> getChoiceList() {
        return choiceList;
    }

    public void setChoiceList(List<ResultChoice> choiceList) {
        this.choiceList = choiceList;
    }

    public String getQuestionText() {
        return QuestionText;
    }

    public void setQuestionText(String questionText) {
        QuestionText = questionText;
    }
}
