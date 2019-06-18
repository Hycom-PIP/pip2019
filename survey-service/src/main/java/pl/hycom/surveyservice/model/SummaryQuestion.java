package pl.hycom.surveyservice.model;

import java.util.List;

public class SummaryQuestion {
    public int id;
    public String question;
    public Type type;
    public List<SummaryAnswer> answers;
    public enum Type {
        text, selection;
    }

    public void addAnswer(String answer)
    {
        int index = findAnswer(answer);
        if(index > -1)
        {
            answers.get(index).value++;
        } else {
            SummaryAnswer summaryAnswer = new SummaryAnswer();
            summaryAnswer.answer = answer;
            summaryAnswer.value = 1;
        }
    }

    private int findAnswer(String answer) {
        int i = 0;
        for(SummaryAnswer summaryAnswer : answers)
        {
            if(summaryAnswer.answer.equals(answer))
                return i;
            i++;
        }
        return -1;
    }
}
