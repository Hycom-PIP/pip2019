package com.example.helloservice;

import com.mongodb.*;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.security.ssl.Debug;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@SpringBootApplication
@EnableEurekaClient
@RestController
@RequestMapping("/hello")
public class HelloServiceApplication {
	private static MongoDatabase database;
	public static void main(String[] args) {
		SpringApplication.run(HelloServiceApplication.class, args);
		CheckDB();
	}


    /**
     * This static function makes a connection with local mongodb database
     * Selects database named 'hello' for future use.
     * @author Mateusz Lapies
     * @version 0.1
     * @since 22.03.2019
     */
	private static void CheckDB() {
        MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
        database = mongoClient.getDatabase("hello");
        CheckCollection();
	}

    /**
     * This static function queries the database looking for collection named 'collection'
     * If there is one alreade, it deletes it and calls CreateCollection function.
     * @author Mateusz Lapies
     * @version 0.1
     * @since 22.03.2019
     */
	private static void CheckCollection()
    {
        try {
            MongoCollection collection = database.getCollection("collection");
            collection.drop();
            CreateCollection();
        } catch(MongoQueryException e) {
            CreateCollection();
        }
    }

    /**
     * This static function creates new collection which contains single doucemtn with:
     * message
     * creationTime
     * @author Mateusz Lapies
     * @version 0.1
     * @since 22.03.2019
     */
	private static void CreateCollection()
	{
		database.createCollection("collection");
		MongoCollection collection = database.getCollection("collection");
		Document person = new Document("message", "Hello World")
				.append("creationTime", Calendar.getInstance().getTime());
		try {
			collection.insertOne(person);
		} catch (MongoException e)
		{
			Debug.println("ERROR", e.getMessage());
		}
	}

    /**
     * This method will return formated string.
     * String will contain message of the document from the database
     * and current time in square brackets.
     * @author Antoni Messyasz
     * @editor Mateusz Lapies
     * @version 0.2
     * @since 22.03.2019
     */
	@GetMapping("")
	public String hello() {
	    try {
            Document first = database.getCollection("collection").find().first();
            if(!first.isEmpty()) {
                return String.format("%s [%s]",
                        first.get("message").toString().replaceAll("\\s+$", ""),
                        new SimpleDateFormat("HH:mm:ss").format(new Date()));
            } else {
                return "NOSQL ERROR: No object found!";
            }
        } catch (MongoCommandException e) {
	        return "NOSQL ERROR: Collection has not been found!";
        }

	}

}
