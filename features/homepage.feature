
Feature: OrangeHRM homepage

  @smoke @TC001_Login
  Scenario: TC001_Login
    Given I navigate to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    Then the page title should contain "OrangeHRM"

  @regression @TC002_Validation_fields
  Scenario: TC002_Validation_fields
    Given I navigate to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    When I enter username "Admin" and password "admin123"
    And I click the login button
    Then the page should contain text "Dashboard"

  @regression @TC003_InvalidSearch_And_ValidSearch
  Scenario: TC003_InvalidSearch_And_ValidSearch
    Given I navigate to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    When I enter username "Admin" and password "admin123"
    And I click the login button
    When I navigate to Admin page
  When I search for "InvalidUser"