Feature: Booking tickets on ИдёмВКино
  Scenario: Happy path 1 - Successful booking standard seat
    Given user is on "http://qamid.tmweb.ru/client/index.php" page
    When user selects day 2 and time
    And user selects standard seat
    And user clicks booking button
    Then user sees text "Вы выбрали билеты:"

  Scenario: Happy path 2 - Successful booking VIP seat
    Given user is on "http://qamid.tmweb.ru/client/index.php" page
    When user selects day 2 and time
    And user selects VIP seat
    And user clicks booking button
    Then user sees text "Вы выбрали билеты:"

  Scenario: Sad path - Booking button disabled without selecting seat
    Given user is on "http://qamid.tmweb.ru/client/index.php" page
    When user selects day 2 and time
    Then booking button is disabled