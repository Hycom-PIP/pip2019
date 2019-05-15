package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.model.ViewPage;
import pl.hycom.surveyservice.repository.SurveyRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SurveyListViewController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/getSurveys/{pageNumber}", method = RequestMethod.GET)
    public ResponseEntity<ViewPage> getSurveysByPage(@PathVariable int pageNumber) {
        List<Survey> surveyList = surveyRepository.findAll(PageRequest.of(pageNumber, 10)).getContent();
        long surveyAmount = surveyRepository.countAllByIdIsNotNull();
        return new ResponseEntity<>(new ViewPage((int) surveyAmount, (int) Math.ceil(surveyAmount / 10.0), surveyList), HttpStatus.OK);
    }

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteSurvey(@PathVariable String surveyId) {
        if (surveyRepository.existsById(surveyId))
            surveyRepository.deleteById(surveyId);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(surveyId, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public ResponseEntity<Survey> deleteSurvey(@RequestBody Survey survey) {
        if (surveyRepository.existsById(survey.getId().toString()))
            surveyRepository.deleteById(survey.getId().toString());
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(survey, HttpStatus.OK);
    }
}