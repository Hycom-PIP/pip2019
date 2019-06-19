package pl.hycom.surveyservice.model;

import java.util.ArrayList;

public class Summary {
    public String surveyName;
    public String surveyDesc;
    public ArrayList<SummaryQuestion> questions;
    public Summary()
    {
        questions = new ArrayList<>();
    }

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