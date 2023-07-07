const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const readline = require("readline");
const path = require("path"); // Import the 'path' module

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
        await driver.get("https://interactiveprocesstechnologydemo2.service-now.com/now/nav/ui/classic/params/target/sn_slm_case.do%3Fsys_id%3D-1%26sysparm_stack%3Dsn_slm_case_list.do");

        //SSO signon
        await driver.wait(
            until.elementLocated(By.xpath('/html/body/div[2]/div[5]/div[3]/div[2]/a[1]')),
            5000
        );
        await driver.findElement(By.xpath('/html/body/div[2]/div[5]/div[3]/div[2]/a[1]')).click();

        //Enter login
        await driver.findElement(By.name("sso_selector_id")).sendKeys("josh.urbano@ipta.com", Key.RETURN);

        await driver.wait(
            until.elementLocated(By.id('i0116')),
            5000
        );
        await driver.findElement(By.id("i0116")).sendKeys("josh.urbano@ipta.com", Key.RETURN);

        // Pause for manual password input
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        await new Promise((resolve) => {
            rl.question(
                "Please enter password and complete Authentication manually. Once complete, press Enter to continue.",
                () => {
                    rl.close();
                    resolve();
                }
            );
        });

        //await driver.wait(
        //    until.elementLocated(By.name('lookup.sn_slm_case.supplier')),
         //   5000
        //);
        //await driver.findElement(By.name('lookup.sn_slm_case.supplier')).click();

        Supplier = driver.findElement(By.partialLinkText('body > div:nth-child(11) > form:nth-child(1) > span:nth-child(40) > span:nth-child(1) > div:nth-child(8) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(2) > div:nth-child(4) > input:nth-child(1)'));

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