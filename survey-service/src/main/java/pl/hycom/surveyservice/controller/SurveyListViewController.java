package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.dto.PageDTO;
import pl.hycom.surveyservice.dto.SurveyDTO;
import pl.hycom.surveyservice.repository.SurveyRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SurveyListViewController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/getSurveys/{pageNumber}", method = RequestMethod.GET)
    public ResponseEntity<PageDTO> getSurveysByPage(@PathVariable int pageNumber) {
        List<Survey> surveyList = surveyRepository.findAllByIsCurrentVersion(true, PageRequest.of(pageNumber, 10));
        long surveyAmount = surveyRepository.countAllByIdIsNotNull();

        List<SurveyDTO> surveyDtos = surveyList.stream()
                .map(survey -> new SurveyDTO(survey.getSurveyName(), survey.getVersion(), survey.getId().getDate(), 4, survey.getToken()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(new PageDTO((int) surveyAmount, (int) Math.ceil(surveyAmount / 10.0), surveyDtos), HttpStatus.OK);
    }

    @RequestMapping(value = "/{tokenId}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteSurvey(@PathVariable String tokenId) {
        if (!surveyRepository.existsByToken(tokenId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        surveyRepository.deleteByToken(tokenId);
        return new ResponseEntity<>(tokenId, HttpStatus.OK);
    }
}