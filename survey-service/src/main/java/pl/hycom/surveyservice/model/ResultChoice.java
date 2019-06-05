package pl.hycom.surveyservice.model;

public class ResultChoice {
    private String choiceName;
    private int choiceAmount;

    public String getChoiceName() {
        return choiceName;
    }

    public void setChoiceName(String choiceName) {
        this.choiceName = choiceName;
    }

    public int getChoiceAmount() {
        return choiceAmount;
    }

    public void setChoiceAmount(int choiceAmount) {
        this.choiceAmount = choiceAmount;
    }

    public ResultChoice(String choiceName) {
        this.choiceName = choiceName;
        choiceAmount = 0;
    }
}