package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.repository.SurveyRepository;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NewSurveyController {
    @Autowired
    SurveyRepository surveyRepository;

    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Survey> addNewSurvey(@Valid @RequestBody Survey survey) {
        if (!areQuestionTypesCorrect(survey)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        survey.setToken(UUID.randomUUID().toString());
        survey.setVersion(1);
        survey.setCurrentVersion(true);
        surveyRepository.insert(survey);
        return new ResponseEntity<>(survey, HttpStatus.OK);
    }

    @RequestMapping(value = "/{token}", method = RequestMethod.GET)
    public ResponseEntity<Survey> getAllSurveys(@PathVariable String token) {
        Optional<Survey> survey = surveyRepository.findByToken(token);
        if (!survey.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(survey.get(), HttpStatus.OK);

    }

    private boolean areQuestionTypesCorrect(Survey survey) {
        return Arrays.stream(survey.getPageList())
                .noneMatch(page -> Arrays.stream(page.getQuestionList())
                        .filter(question -> "longText".equals(question.getQuestionType())
                                || "shortText".equals(question.getQuestionType()))
                        .anyMatch(question -> question.getAnswers().length > 0));
    }
}
