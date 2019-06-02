package pl.hycom.surveyservice.model;

import java.util.List;

public class AnsweredSurvey {
    public String token;
    public int version;
    public List<AnsweredPage> pages;

    public boolean validateAnsweredSurvey()
    {
        if(pages.isEmpty())
            return false;
        else
            for (AnsweredPage page:pages) {
                if(!page.validatePage())
                    return false;
            }
        return true;
    }
}
