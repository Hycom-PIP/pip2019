package pl.hycom.surveyservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.hycom.surveyservice.model.AnsweredSurvey;

public interface AnsweredSurveyRepository extends MongoRepository<AnsweredSurvey, String> {
}
