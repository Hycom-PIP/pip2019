package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.hycom.surveyservice.model.AnsweredSurvey;
import pl.hycom.surveyservice.model.MultipleChoiceResult;
import pl.hycom.surveyservice.repository.AnsweredSurveyRepository;
import pl.hycom.surveyservice.repository.SurveyRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AnsweredSurveyViewController {
    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    AnsweredSurveyRepository answeredSurveyRepository;

    @RequestMapping(value = "/survey/{token}/{version}/question/multipleChoice/{page}/{questionNumber}", method = RequestMethod.GET)
    public ResponseEntity<MultipleChoiceResult> getMultipleChoiceResults(@PathVariable("token") String token, @PathVariable("version") int version,
                                                                         @PathVariable("questionNumber") int questionNumber,
                                                                         @PathVariable("page") int page) {
        List<AnsweredSurvey> answeredSurveyList = answeredSurveyRepository.findAllByTokenAndVersion(token, version);
        MultipleChoiceResult multipleChoiceResult = new MultipleChoiceResult();

        answeredSurveyList.stream().map(answeredSurvey -> answeredSurvey.pages.get(page)
                .questionList.get(questionNumber))
                .flatMap(answeredQuestion -> answeredQuestion.answers.stream())
                .forEach(answer -> multipleChoiceResult.getChoiceList()
                        .merge(answer, 1, Integer::sum));
        return new ResponseEntity<>(multipleChoiceResult, HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{token}/{version}/question/text/{page}/{questionNumber}/{stringsPage}", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getTextResults(@PathVariable("token") String token, @PathVariable("version") int version,
                                                   @PathVariable("questionNumber") int questionNumber,
                                                   @PathVariable("page") int page,
                                                   @PathVariable("stringsPage") int stringsPage) {
        List<AnsweredSurvey> answeredSurveyList = answeredSurveyRepository.findAllByTokenAndVersion(token, version);
        List<String> results = new ArrayList<>();
        answeredSurveyList.stream().map(answeredSurvey -> answeredSurvey.pages.get(page)
                .questionList.get(questionNumber))
                .map(answeredQuestion -> answeredQuestion.answers)
                .forEach(results.subList(stringsPage * 50, (stringsPage + 1) * 50)::addAll);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

}
