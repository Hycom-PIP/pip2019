package pl.hycom.surveyservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.hycom.surveyservice.model.Survey;

public interface SurveyRepository extends MongoRepository<Survey, String> {
}
