// Import required modules
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const XLSX = require("xlsx");
const readline = require("readline");
const moment = require("moment");

// Set up the Selenium WebDriver
async function setUp() {
  const driver = await new Builder().forBrowser("chrome").build();
  return driver;
}

// Define the test function
async function MOAHolderSearch() {
  const driver = await setUp();

  try {
    // Navigate to the URL
    await driver.get(
      "https://ksn2.faa.gov/contracts/efast/eFASTWorkspace/Pages/Team/MOAComprehensiveSearch.aspx"
    );

    // Pause for manual user input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question(
        "Please enter username and password. Press Enter to continue.",
        () => {
          rl.close();
          resolve();
        }
      );
    });

    // Wait for a specific element to be visible
    await driver.wait(
      until.elementLocated(By.xpath('//*[@id="WebPartWPQ2"]/div[1]/input[1]')),
      5000
    );
    await driver
      .findElement(By.xpath('//*[@id="WebPartWPQ2"]/div[1]/input[1]'))
      .click();
    console.log("View MOA Holder Radio Button clicked");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    await driver.wait(
      until.elementLocated(By.xpath('//*[@id="moaSearch"]/input[4]')),
      5000
    );
    await driver.findElement(By.xpath('//*[@id="moaSearch"]/input[4]')).click();
    console.log(
      "Filter by Business Types and Functional Areas radio button clicked"
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/form/div[12]/div/div[1]/div[2]/div[2]/div[1]/table/tbody/tr/td[1]/table/tbody/tr[1]/td/div/div/div/div/div[1]/div[1]/div[5]/input[2]"
        )
      ),
      5000
    );
    await driver
      .findElement(
        By.xpath(
          "/html/body/form/div[12]/div/div[1]/div[2]/div[2]/div[1]/table/tbody/tr/td[1]/table/tbody/tr[1]/td/div/div/div/div/div[1]/div[1]/div[5]/input[2]"
        )
      )
      .click();
    console.log("8(a) Business Types Clicked");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[@id="moaHolderBusinessAndFunctionalAreaDiv"]/input[6]')
      ),
      5000
    );
    await driver
      .findElement(
        By.xpath('//*[@id="moaHolderBusinessAndFunctionalAreaDiv"]/input[6]')
      )
      .click();
    console.log("Research and Development Functional Area Clicked");

    //Look for Cypher LLC
    await driver
      .findElement(By.xpath('//*[@id="moaDetailsData_filter"]/label/input'))
      .sendKeys("Cypher LLC");

    // Find the element containing the text
    const CypherLLC = await driver.findElement(
      By.xpath('//*[@id="moaDetailsData"]/tbody/tr/td[3]')
    );

    // Get the text of the element
    const elementText = await CypherLLC.getText();
    // Define the expected text
    const expectedText = "693KA9-19-A-00002";

    // Verify if the expected text exists
    if (elementText.includes(expectedText)) {
      console.log(
        `Success: "${expectedText}" Cypher LLC number exists on the page.`
      );
    } else {
      console.log(
        `Error: "${expectedText}" Cypher LLC number does not exist on the page.`
      );
    }

    await driver
      .findElement(By.xpath('//*[@id="moaDetailsData_filter"]/label/input'))
      .clear();

    //Look for NIRA INC.
    await driver
      .findElement(By.xpath('//*[@id="moaDetailsData_filter"]/label/input'))
      .sendKeys("NIRA");

    // Find the element containing the text
    const NIRAINC = await driver.findElement(
      By.xpath('//*[@id="moaDetailsData"]/tbody/tr/td[3]')
    );

    // Get the text of the element
    const NIRAText = await NIRAINC.getText();
    // Define the expected text
    const expectedNIRAText = "693KA9-22-A-00136";

    // Verify if the expected text exists
    if (NIRAText.includes(expectedNIRAText)) {
      console.log(
        `Success: "${expectedNIRAText}" NIRA INC number exists on the page.`
      );
    } else {
      console.log(
        `Error: "${expectedNIRAText}" NIRA INC number does not exist on the page.`
      );
    }

    await driver
      .findElement(By.xpath('//*[@id="moaDetailsData_filter"]/label/input'))
      .clear();

    //Look for Timitron Corportation
    await driver
      .findElement(By.xpath('//*[@id="moaDetailsData_filter"]/label/input'))
      .sendKeys("Timitron");

    // Find the element containing the text
    const Timitron = await driver.findElement(
      By.xpath('//*[@id="moaDetailsData"]/tbody/tr/td[3]')
    );

    // Get the text of the element
    const TimitronText = await Timitron.getText();
    // Define the expected text
    const expectedTimitronText = "693KA9-22-A-00093";

    // Verify if the expected text exists
    if (TimitronText.includes(expectedTimitronText)) {
      console.log(
        `Success: "${expectedTimitronText}" Timitron Corportation number exists on the page.`
      );
    } else {
      console.log(
        `Error: "${expectedTimitronText}" Timitron Corporation number does not exist on the page.`
      );
    }

    // Retrieve the browser's console logs
    const logs = await driver.manage().logs().get("browser");
    const consoleLogs = logs.map((entry) => entry.message);

    // Create a workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(consoleLogs);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

    // Save the workbook to a file with today's date as the filename
    const filename = `logs_${moment().format("YYYY-MM-DD")}.xlsx`;
    XLSX.writeFile(workbook, filename);

    // Test passed
    console.log("Test Successful!");
  } catch (error) {
    // Test failed
    console.error("Error occurred:", error);
  } finally {
    // Quit the browser
    await driver.quit();
  }
}

// Set the path to ChromeDriver executable
process.env.PATH += ";C:\\Selenium Webdrivers";

// Run the test
MOAHolderSearch();
