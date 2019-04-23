Feature:  Demo karate script
  Scenario:  verify that survey-service is up and recives survey
    Given url 'http://localhost:8080/survey-service'
    And request read('shortSurvey.json')
    And header Content-Type = 'application/json'
    When method post
    Then status 200