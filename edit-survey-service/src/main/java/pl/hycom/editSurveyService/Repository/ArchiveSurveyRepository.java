package pl.hycom.editSurveyService.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.hycom.editSurveyService.Model.Survey;

public interface ArchiveSurveyRepository extends MongoRepository<Survey, String> {
}
