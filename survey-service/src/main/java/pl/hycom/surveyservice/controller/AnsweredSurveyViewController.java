package pl.hycom.surveyservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${answeredsurvey.itemsperlist}")
    private int pageItemAmount;

    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    AnsweredSurveyRepository answeredSurveyRepository;

    @RequestMapping(value = "/survey/{token}/questions", method = RequestMethod.GET)
    public ResponseEntity<Summary> getQuestions(@PathVariable("token") String token) {
        List<AnsweredSurvey> answeredSurveyList = answeredSurveyRepository.findAllByTokenAndVersion(token, 1);
        boolean first = true;
        Summary summary = new Summary();
        summary.questions = new ArrayList<>();
        for (AnsweredSurvey survey : answeredSurveyList) {
            for (AnsweredPage page : survey.pages) {
                for (AnsweredQuestion question : page.questionList) {
                    if (first) {
                        SummaryQuestion summaryQuestion = new SummaryQuestion();
                        summaryQuestion.id = question.questionId;
                        summaryQuestion.question = question.questionText;
                        if (question.questionType.equals("text")) {
                            summaryQuestion.type = SummaryQuestion.Type.text;
                        } else if (question.questionType.equals("selection")) {
                            summaryQuestion.type = SummaryQuestion.Type.selection;
                        }
                        summary.questions.add(summaryQuestion);
                    }
                }
            }
            first = false;
            for (AnsweredPage page : survey.pages) {
                for (AnsweredQuestion question : page.questionList) {
                    SummaryQuestion summaryQuestion = summary.findQuestion(question.questionId);
                    for (String answer : question.answers) {
                        summaryQuestion.addAnswer(answer);
                    }

                }
            }
        }
        if (summary.anyAnswered())
            return new ResponseEntity<>(summary, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/survey/{token}/{version}/question/multipleChoice/{page}/{questionNumber}", method = RequestMethod.GET)
    public ResponseEntity<MultipleChoiceResult> getMultipleChoiceResults(@PathVariable("token") String token, @PathVariable("version") int version,
                                                                         @PathVariable("questionNumber") int questionNumber,
                                                                         @PathVariable("page") int page) {
        Optional<Survey> optionalSurvey = surveyRepository.findByTokenAndVersion(token, version);
        if (isQuestionIncorrect(optionalSurvey, page, questionNumber)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Survey survey = optionalSurvey.get();
        if (survey.getPageList()[page].getQuestionList()[questionNumber].getQuestionType().equals("shortText") ||
                survey.getPageList()[page].getQuestionList()[questionNumber].getQuestionType().equals("longText")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        MultipleChoiceResult multipleChoiceResult = new MultipleChoiceResult();

        Arrays.stream(survey.getPageList()[page].getQuestionList()[questionNumber].getAnswers())
                .forEach(answer -> multipleChoiceResult.getChoiceList()
                        .put(answer.getAnswer(), 0));

        List<AnsweredSurvey> answeredSurveyList = answeredSurveyRepository.findAllByTokenAndVersion(token, version);
        answeredSurveyList.stream().map(answeredSurvey -> answeredSurvey.pages.get(page)
                .questionList.get(questionNumber))
                .flatMap(answeredQuestion -> answeredQuestion.answers.stream())
                .forEach(answer -> multipleChoiceResult.getChoiceList()
                        .merge(answer, 1, Integer::sum));

        multipleChoiceResult.setQuestionText(survey.getPageList()[page].getQuestionList()[questionNumber].getQuestionText());
        return new ResponseEntity<>(multipleChoiceResult, HttpStatus.OK);
    }

    @RequestMapping(value = "/survey/{token}/{version}/question/text/{page}/{questionNumber}/{stringsPage}", method = RequestMethod.GET)
    public ResponseEntity<TextResult> getTextResults(@PathVariable("token") String token, @PathVariable("version") int version,
                                                     @PathVariable("questionNumber") int questionNumber,
                                                     @PathVariable("page") int page,
                                                     @PathVariable("stringsPage") int stringsPage) {
        Optional<Survey> optionalSurvey = surveyRepository.findByTokenAndVersion(token, version);
        if (isQuestionIncorrect(optionalSurvey, page, questionNumber)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Survey survey = optionalSurvey.get();
        if (survey.getPageList()[page].getQuestionList()[questionNumber].getQuestionType().equals("multipleOptions") ||
                survey.getPageList()[page].getQuestionList()[questionNumber].getQuestionType().equals("singleOption")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if(stringsPage < 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<AnsweredSurvey> answeredSurveyList = answeredSurveyRepository.findAllByTokenAndVersion(token, version);
        TextResult textResult = new TextResult();
        answeredSurveyList.stream().map(answeredSurvey -> answeredSurvey.pages.get(page)
                .questionList.get(questionNumber))
                .map(answeredQuestion -> answeredQuestion.answers)
                .forEach(textResult.getAnswerList()::addAll);
        textResult.setAnswerList(textResult.getAnswerList().subList(Math.min(stringsPage * pageItemAmount, textResult.getAnswerList().size()), Math.min((stringsPage + 1) * pageItemAmount, textResult.getAnswerList().size())));
        textResult.setQuestionText(survey.getPageList()[page].getQuestionList()[questionNumber].getQuestionText());
        return new ResponseEntity<>(textResult, HttpStatus.OK);
    }

    private boolean isQuestionIncorrect(Optional<Survey> survey, int page, int questionNumber) {
        if (!survey.isPresent()) {
            return true;
        }
        if (survey.get().getPageList().length - 1 < page || page < 0) {
            return true;
        }
        if (survey.get().getPageList()[page].getQuestionList().length - 1 < questionNumber || questionNumber < 0) {
            return true;
        }
        return false;
    }
}
