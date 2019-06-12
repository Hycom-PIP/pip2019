package pl.hycom.surveyservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "config.properties", ignoreResourceNotFound = true)
public class SurveyServiceConfig {
}
