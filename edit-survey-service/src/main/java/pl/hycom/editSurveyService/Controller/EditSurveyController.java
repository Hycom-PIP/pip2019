package pl.hycom.editSurveyService.Controller;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pl.hycom.editSurveyService.Model.Survey;
import pl.hycom.editSurveyService.Repository.ArchiveSurveyRepository;
import pl.hycom.surveyservice.repository.SurveyRepository;

import javax.validation.Valid;
import java.util.List;


@RestController
public class EditSurveyController
{
    
    @Autowired
    SurveyRepository surveyRepository;
    
    ArchiveSurveyRepository archiveSurveyRepository;
    
    @RequestMapping( value = "/", method = RequestMethod.POST )
    public ResponseEntity < Survey > addNewSurvey ( @Valid @RequestBody Survey survey )
    {
        surveyRepository.insert( ( Iterable < pl.hycom.surveyservice.model.Survey > ) survey );
        
        //archiveSurveyRepository.insert( surveyRepository.findOne( {"oldVersionToken" : survey.getOldVersionToken()} ) );
        
        
        MongoDatabase database;
        com.mongodb.MongoClient mongoClient = new com.mongodb.MongoClient( new MongoClientURI( "mongodb://localhost:27017" ) );
        database = mongoClient.getDatabase( "SurveySystem" );
        
        BasicDBObject document = ( BasicDBObject ) database.getCollection( "survey" ).find( new BasicDBObject( "oldVersionToken" , survey.getOldVersionToken() ) );


//        archiveSurveyRepository.insert( database.getCollection( "survey" ).
        
        MongoDatabase archiveDatabase;
        archiveDatabase = mongoClient.getDatabase( "SurveySystem" );
        
        archiveDatabase.getCollection( "oldVersions" ).insertOne( document );
        
        database.getCollection( "survey" ).deleteOne( document );
        
        
        return new ResponseEntity <>( survey , HttpStatus.OK );
    }
    
    @RequestMapping( value = "/", method = RequestMethod.GET )
    public ResponseEntity < List < Survey > > getAllSurveys ()
    {
        List < Survey > surveyList = archiveSurveyRepository.findAll();
        return new ResponseEntity <>( surveyList , HttpStatus.OK );
    }
}

