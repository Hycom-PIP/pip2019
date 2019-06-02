package pl.hycom.surveyservice.model;

import java.util.List;

public class AnsweredPage {
    public int pageId;
    public List<AnsweredQuestion> questionList;
    public boolean validatePage()
    {
        if(pageId > -1 && !questionList.isEmpty()) {
            for (AnsweredQuestion question : questionList) {
                if (!question.validateQuestion())
                    return false;
            }
            return true;
        } else
            return false;
    }
}
