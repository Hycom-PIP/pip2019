package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.dto.DtoPage;
import pl.hycom.surveyservice.dto.DtoSurvey;
import pl.hycom.surveyservice.repository.SurveyRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SurveyListViewController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/getSurveys/{pageNumber}", method = RequestMethod.GET)
    public ResponseEntity<DtoPage> getSurveysByPage(@PathVariable int pageNumber) {
        List<Survey> surveyList = surveyRepository.findAll(PageRequest.of(pageNumber, 10)).getContent();
        long surveyAmount = surveyRepository.countAllByIdIsNotNull();

        List<DtoSurvey> dtoSurveys = surveyList.stream()
                .map(survey -> new DtoSurvey(survey.getSurveyName(), survey.getVersion(), survey.getId().getDate(), 4, survey.getToken()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(new DtoPage((int) surveyAmount, (int) Math.ceil(surveyAmount / 10.0), dtoSurveys), HttpStatus.OK);
    }

    @RequestMapping(value = "/{tokenId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteSurvey(@PathVariable String tokenId) {
        if (surveyRepository.existsByToken(tokenId))
            surveyRepository.deleteByToken(tokenId);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(tokenId, HttpStatus.OK);
    }
}