package pl.hycom.surveyservice;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import pl.hycom.surveyservice.controller.DisplaySurveyController;
import pl.hycom.surveyservice.model.AnsweredSurvey;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SurveyServiceApplicationTests {
	DisplaySurveyController controller;
	@Before void Initialize()
	{
		controller = new DisplaySurveyController();
	}

	@Test
	public void contextLoads() {
	}

	@Test
	public void getSurvey()
	{
		assertEquals(HttpStatus.BAD_REQUEST, controller.getSurvey("0").getStatusCode());
	}

	@Test
	public void answerSurvey()
	{
		assertEquals(HttpStatus.OK, controller.answerSurvey(new AnsweredSurvey()).getStatusCode());
	}
}
