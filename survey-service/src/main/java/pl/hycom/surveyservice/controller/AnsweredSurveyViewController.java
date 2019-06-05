package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.hycom.surveyservice.model.*;
import pl.hycom.surveyservice.repository.AnsweredSurveyRepository;
import pl.hycom.surveyservice.repository.SurveyRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AnsweredSurveyViewController {
    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    AnsweredSurveyRepository answeredSurveyRepository;

    @RequestMapping(value = "/survey/{token}/{version}/questions/multipleChoice/{page}/{questionNumber}", method = RequestMethod.GET)
    public ResponseEntity<List<MultipleChoiceResult>> getMultipleChoiceResults(@PathVariable("token") String token, @PathVariable("version") int version,
                                                                               @PathVariable("questionNumber") int questionNumber,
                                                                               @PathVariable("page") int page) {
        List<AnsweredSurvey> AnsweredSurveyList = answeredSurveyRepository.findAllByTokenAndVersion(token, version);
        Optional<Survey> optionalSurvey = surveyRepository.findByTokenAndVersion(token, version);
        if (!optionalSurvey.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Survey survey = optionalSurvey.get();

        MultipleChoiceResult multipleChoiceResults = new ArrayList<>();

        if() {

        }

        for (Answer answer : survey.getPageList()[page].getQuestionList()[questionNumber].getAnswers()) {

        }

        return new ResponseEntity<>(multipleChoiceResults, HttpStatus.OK);
    }

    public static boolean isChoicePresentInMultipleChoiceResult(MultipleChoiceResult multipleChoiceResult, String name) {
        return multipleChoiceResult.getChoiceList().stream().anyMatch(choice -> name.equals(choice.getChoiceName()));
    }

    @RequestMapping(value = "/survey/{token}/{version}/questions/text/{page}/{questionNumber}/{questionPage}", method = RequestMethod.GET)
    public ResponseEntity<Integer> getSurvey(@PathVariable("token") String token, @PathVariable("version") int version,
                                             @PathVariable("questionNumber") int questionNumber, @PathVariable("page") int page,
                                             @PathVariable("questionPage") int questionPage) {
        return null;
    }

    @RequestMapping(value = "/survey/{token}/{version}/questions/amount", method = RequestMethod.GET)
    public ResponseEntity<Integer> getQuestionAmount(@PathVariable("token") String token, @PathVariable("version") int version) {
        int questionAmount = 0;
        Optional<Survey> optionalSurvey = surveyRepository.findByTokenAndVersion(token, version);
        if (!optionalSurvey.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Survey survey = optionalSurvey.get();

        for (Page page : survey.getPageList()) {
            questionAmount += page.getQuestionList().length;
        }
        return new ResponseEntity<>(questionAmount, HttpStatus.OK);
    }

}
