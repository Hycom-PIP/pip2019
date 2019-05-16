package pl.hycom.surveyservice.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.hycom.surveyservice.model.Page;
import pl.hycom.surveyservice.model.Question;
import pl.hycom.surveyservice.model.Survey;
import pl.hycom.surveyservice.repository.SurveyRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EditSurveyController {
    @Autowired
    SurveyRepository surveyRepository;

    @RequestMapping(value = "/getSurvey/{surveyId}", method = RequestMethod.GET)
    public ResponseEntity<Survey> getSurveyToEdit(@PathVariable String surveyId) {
        List<Survey> surveyList = surveyRepository.findAllByToken(surveyId);
        for (Survey survey: surveyList) {
            if(survey.getIsCurrentVersion()) {
                return new ResponseEntity<>(survey, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/addNewVersion", method = RequestMethod.PUT)
    public ResponseEntity<Survey> addNewVersion(@RequestBody Survey survey) {
        survey.setCurrentVersion(false);
        surveyRepository.save(survey);
        survey.setId(new ObjectId());
        survey.setCurrentVersion(true);
        int version = survey.getVersion();
        survey.setVersion(++version);

        surveyRepository.insert(survey);

        return new ResponseEntity<>(survey, HttpStatus.OK);
    }

}


