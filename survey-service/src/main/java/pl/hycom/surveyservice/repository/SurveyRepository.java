package pl.hycom.surveyservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.hycom.surveyservice.model.Survey;

import java.util.List;

public interface SurveyRepository extends MongoRepository<Survey, String> {
    List<Survey> findByUuid (String uuid);
    Long countAllByIdIsNotNull();
}
