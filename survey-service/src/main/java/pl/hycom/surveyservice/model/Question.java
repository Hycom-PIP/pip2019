package pl.hycom.surveyservice.model;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Document(collection = "surveys")
public class Question {

    @NotBlank(message = "Question Text cannot be null.")
    private String questionText;
    private boolean isRequiered;
    private String questionDescription;
    @NotBlank(message = "Question Type cannot be blank.")
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
