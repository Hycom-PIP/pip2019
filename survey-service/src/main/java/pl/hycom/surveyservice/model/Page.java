package pl.hycom.surveyservice.model;

import javax.validation.constraints.NotNull;

public class Page {

    private String pageDescription;
    @NotNull(message = "Question List cannot be null.")
    private Question[] questionList;

    public String getPageDescription() {
        return pageDescription;
    }

    public void setPageDescription(String pageDescription) {
        this.pageDescription = pageDescription;
    }

    public Question[] getQuestionList() {
        return questionList;
    }

    public void setQuestionList(Question[] questionList) {
        this.questionList = questionList;
    }
}
