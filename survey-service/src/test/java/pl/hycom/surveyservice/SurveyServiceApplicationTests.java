package pl.hycom.surveyservice;

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

	@Test
	public void contextLoads() {
	}

	@Test
	public void getSurvey()
	{
		DisplaySurveyController dsc = new DisplaySurveyController();
		assertEquals(HttpStatus.BAD_REQUEST, dsc.getSurvey("0").getStatusCode());
	}

	@Test
	public void answerSurvey()
	{
		DisplaySurveyController dsc = new DisplaySurveyController();
		assertEquals(HttpStatus.OK, dsc.answerSurvey(new AnsweredSurvey()).getStatusCode());
	}
}
