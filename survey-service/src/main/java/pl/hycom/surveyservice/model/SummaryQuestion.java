package pl.hycom.surveyservice.model;

import java.util.ArrayList;
import java.util.List;

public class SummaryQuestion {
    public int id;
    public String question;
    public Type type;
    public List<SummaryAnswer> answers;
    public SummaryQuestion()
    {
        answers = new ArrayList<>();
    }

    public enum Type {
        text, selection
    }

    public void addAnswer(String answer)
    {
        int index = findAnswer(answer);
        if(index > -1)
        {
            SummaryAnswer summaryAnswer = answers.get(index);
            summaryAnswer.value++;
            answers.set(index, summaryAnswer);
        } else {
            SummaryAnswer summaryAnswer = new SummaryAnswer();
            summaryAnswer.answer = answer;
            summaryAnswer.value = 1;
            answers.add(summaryAnswer);
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
