package pl.hycom.surveyservice.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.repository.SurveyRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
public class NewSurveyController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public Survey addNewSurvey(@Valid @RequestBody Survey survey) {
        survey.setId(ObjectId.get());
        surveyRepository.insert(survey);
        return survey;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Survey> getAllSurveys() {
        return surveyRepository.findAll();
    }
}
