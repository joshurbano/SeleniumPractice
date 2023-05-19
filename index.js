const { Builder, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function example() {
  // Set the path to the Chromedriver executable
  const chromeDriverPath = "C:\\Selenium Webdrivers\\chromedriver.exe";

  // Configure Chrome options
  const chromeOptions = new chrome.Options();

  // Set up Chromedriver
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .setChromeService(new chrome.ServiceBuilder(chromeDriverPath))
    .build();

  try {
    
    //navigate to Site
    await driver.get("https://www.tutorialspoint.com/selenium/selenium_automation_practice.htm");

    //Get the current page title and verify that it is correct
    const pageTitle = await driver.getTitle();
    console.log(pageTitle);
    if (pageTitle === 'Selenium - Automation Practice Form') {
      console.log('Page title is correct!');
    } else {
      console.log('Page title is incorrect.');
    }

    //fill out form
    await driver.findElement(By.name("firstname")).sendKeys("Joshua");
    await driver.findElement(By.name("lastname")).sendKeys("Urbano");

    // Find the male radio button element by its XPath
    const maleRadioButton = await driver.findElement(By.xpath("//input[@value='Male']"));

    // Click the male radio button
    await maleRadioButton.click();

    // Verify Male radio button is selected
    const isSelected = await maleRadioButton.isSelected();
    if (isSelected) {
      console.log('Male Radio button is selected.');
    } else {
      console.log('Radio button is not selected.');
    }

    //Find 7 years of experience
    const yearsRadioButton = await driver.findElement(By.xpath("/html/body/main/div/div/div[2]/div[4]/div/form/table/tbody/tr[4]/td[2]/span[7]/input"));

    //Click 7 years of experience button
    await yearsRadioButton.click();

    // Verify Years of Experience radio button is selected
    const isSelected1 = await yearsRadioButton.isSelected();
    if (isSelected1) {
      console.log('Years of Experience Radio button is selected.');
    } else {
      console.log('Years of Experience Radio button is not selected.');
    }

    //Enter Date
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    await driver.findElement(By.xpath("/html/body/main/div/div/div[2]/div[4]/div/form/table/tbody/tr[5]/td[2]/input")).sendKeys(formattedDate);

    // Wait for 5 seconds (5000 milliseconds) before closing the browser
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the browser
    await driver.quit();
  }
}

example();
