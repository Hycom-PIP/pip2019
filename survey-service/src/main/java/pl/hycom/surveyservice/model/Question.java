package pl.hycom.surveyservice.model;

import javax.validation.constraints.NotBlank;

public class Question {

    @NotBlank(message = "Question Text cannot be null.")
    private String questionText;
    private boolean required;
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
    
    public boolean isRequired ()    {
        return required;
    }
    
    public void setRequired ( boolean required )    {
        this.required = required;
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
