package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.repository.SurveyRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SurveyListViewController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/{surveyId}", method = RequestMethod.GET)
    public ResponseEntity<Optional<Survey>> getSurveyById(@PathVariable String surveyId) {
        return new ResponseEntity<>(surveyRepository.findById(surveyId), HttpStatus.OK);
    }

    @RequestMapping(value = "/getSurveys/{pageNumber}", method = RequestMethod.GET)
    public ResponseEntity<List<Survey>> getSurveysByPage(@PathVariable int pageNumber) {
        List<Survey> surveyList = surveyRepository.findAll(PageRequest.of(pageNumber, 10)).getContent();
        return new ResponseEntity<>(surveyList, HttpStatus.OK);
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

    @RequestMapping(value = "/UUID/{surveyId}", method = RequestMethod.GET)
    public ResponseEntity<String> getUUID(@PathVariable String surveyId) {
        return new ResponseEntity<>(surveyRepository.findById(surveyId).get().getUuid(), HttpStatus.OK);
    }

    @RequestMapping(value = "/UUID", method = RequestMethod.PUT)
    public ResponseEntity<String> generateUUID(@RequestBody Survey survey) {
        if (survey.getUuid() == null) {
            survey.setUuid(java.util.UUID.randomUUID().toString());
            return new ResponseEntity<>(survey.getUuid(), HttpStatus.OK);
        } else
            return new ResponseEntity<>("UUID already exists", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/getByUUID/{uuid}", method = RequestMethod.GET)
    public ResponseEntity<Survey> getSurveyByUUID(@PathVariable String uuid) {
        return new ResponseEntity<>(surveyRepository.findByUuid(uuid).get(0), HttpStatus.OK);
    }
}