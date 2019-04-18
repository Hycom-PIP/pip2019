Feature: Demo karate script
  Scenario: verify that hello service is up and running
    Given url http://localhost:8080/hello-service/hello
    When method get
    Then status 200
    And match response contains "Hello World"