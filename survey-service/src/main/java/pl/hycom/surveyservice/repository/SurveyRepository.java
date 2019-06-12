package pl.hycom.surveyservice.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import pl.hycom.surveyservice.model.Survey;

import java.util.List;
import java.util.Optional;

public interface SurveyRepository extends MongoRepository<Survey, String> {
    Long countAllByIdIsNotNull();
    Optional<Survey> findByToken(String token);
    void deleteByToken(String token);
    boolean existsByToken(String token);
    List<Survey> findAllByToken(String token);
    List<Survey> findAllByIsCurrentVersion(boolean isCurrent, PageRequest page);
    Optional<Survey> findByIsCurrentVersionAndToken(boolean isCurrent, String token);
    Optional<Survey> findByTokenAndVersion (String token, int version);
}
