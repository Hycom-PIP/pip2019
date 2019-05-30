package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hycom.surveyservice.model.AnsweredSurvey;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.repository.AnsweredSurveyRepository;
import pl.hycom.surveyservice.repository.SurveyRepository;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DisplaySurveyController {
    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    AnsweredSurveyRepository answeredSurveyRepository;

    @RequestMapping(value = "/ankieta/{id}", method = RequestMethod.GET)
    public ResponseEntity<Survey> getSurvey(@PathVariable("id") String id) {
        Optional<Survey> survey = surveyRepository.findById(id);
        return survey.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(new Survey(), HttpStatus.BAD_REQUEST));
    }

    @RequestMapping(value = "/ankieta", method=RequestMethod.POST)
    public ResponseEntity answerSurvey(@Valid @RequestBody AnsweredSurvey answeredSurvey) {
        if(surveyRepository.findById(answeredSurvey.token.toString()).isPresent()) {
            if (answeredSurvey.validateAnsweredSurvey()) {
                answeredSurveyRepository.insert(answeredSurvey);
                return new ResponseEntity(HttpStatus.OK);
            }
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
