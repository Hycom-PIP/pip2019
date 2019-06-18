package pl.hycom.surveyservice.model;

import java.util.ArrayList;

public class Summary {
    public ArrayList<SummaryQuestion> questions;

    public SummaryQuestion findQuestion(int id)
    {
        for(SummaryQuestion question : questions)
        {
            if(question.id == id)
                return question;
        }
        return null;
    }

    public boolean anyAnswered()
    {
        return !questions.isEmpty();
    }
}