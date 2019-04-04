package pl.hycom.surveyservice.model;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Document(collection = "surveys")
public class Question {

    @NotNull(message = "Question Text cannot be null.")
    private String questionText;
    private String questionDescription;
    private boolean isRequiered;
    @NotNull(message = "Question Type cannot be null.")
    private String questionType;
    private Answer[] answers;

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getQuestionDescription() {
        return questionDescription;
    }

    public void setQuestionDescription(String questionDescription) {
        this.questionDescription = questionDescription;
    }

    public boolean isRequiered() {
        return isRequiered;
    }

    public void setIsRequiered(boolean isRequiered) {
        this.isRequiered = isRequiered;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public Answer[] getAnswers() {
        return answers;
    }

    public void setAnswers(Answer[] answers) {
        this.answers = answers;
    }
}
