package pl.hycom.surveyservice.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.hycom.surveyservice.model.Page;
import pl.hycom.surveyservice.model.Question;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.repository.SurveyRepository;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
public class NewSurveyController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Survey> addNewSurvey(@Valid @RequestBody Survey survey) {
        if (!areQuestionTypesCorrect(survey))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        surveyRepository.insert(survey);
        return new ResponseEntity<>(survey, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<Survey>> getAllSurveys() {
        List<Survey> surveyList = surveyRepository.findAll();
        return new ResponseEntity<>(surveyList, HttpStatus.OK);
    }

    private boolean areQuestionTypesCorrect(Survey survey) {
        return Arrays.stream(survey.getPageList())
                .noneMatch(page -> Arrays.stream(page.getQuestionList())
                        .filter(question -> "longText".equals(question.getQuestionType())
                                || "shortText".equals(question.getQuestionType()))
                        .anyMatch(question -> question.getAnswers().length > 0));
    }
}
