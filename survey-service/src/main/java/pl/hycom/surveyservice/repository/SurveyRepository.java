package pl.hycom.surveyservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.hycom.surveyservice.model.Survey;

import java.util.List;
import java.util.Optional;

public interface SurveyRepository extends MongoRepository<Survey, String> {
    Long countAllByIdIsNotNull();
    Optional<Survey> findByToken(String token);
}
