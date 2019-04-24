Feature:  Demo karate script
  Scenario:  verify that survey-service is up and recives short survey
    Given url 'http://localhost:8080/survey-service'
    And request read('shortSurvey.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 200
  Scenario: verify that survey-service is up and recives long survey
    Given url 'http://localhost:8080/survey-service'
    And request read('longSurvey.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 200
  Scenario: verify if empty page returns 400
    Given url 'http://localhost:8080/survey-service'
    And request read('wrongSurvey-Page.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 400
  Scenario: verify if empty survey name returns 400
    Given url 'http://localhost:8080/survey-service'
    And request read('wrongSurvey-Name.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 400
  Scenario: verify if empty question text returns 400 @not working - not checking question text status
    Given url 'http://localhost:8080/survey-service'
    And request read('wrongSurvey-Question-Text.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 400
  Scenario: verify if empty question type returns 400 @not working - not checking question text status
    Given url 'http://localhost:8080/survey-service'
    And request read('wrongSurvey-Question-Type.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 400
  Scenario: verify if user decided if question is required @not working - not checking if question is required
    Given url 'http://localhost:8080/survey-service'
    And request read('wrongSurvey-Question-Required.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 400
  Scenario: verify if question type and questions are correct @not working - not checking question type
    Given url 'http://localhost:8080/survey-service'
    And request read('wrongSurvey-Question-Type-Correct.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 400
