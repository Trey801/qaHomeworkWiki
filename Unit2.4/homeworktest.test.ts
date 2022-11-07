import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
    Key,
} from "selenium-webdriver";
import { elementLocated } from "selenium-webdriver/lib/until";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

describe("Employee Manager 1.2", () => {

    beforeEach(async () => {
        await driver.get(
        "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
        );
    });
    // Getting 404 error
    afterAll(async () => {
        await driver.quit();
    });
    describe("handles unsaved, canceled, and saved changes correctly", () => {
        test("An unsaved change doesn't persist", async () => {
        /*
        This test follows these steps:
        1. Open Bernice Ortiz
        2. Edit the name input
        3. Open Phillip Weaver
        4. Open Bernice Ortiz
        5. Verify the name field is the original name
        */
        await driver.findElement(By.name("employee1")).click();
        await driver.wait
            until.elementIsVisible(await driver.findElement(By.name("employee1")));
        //had elementLocated here first because of code along,
         //I definetly over deleted things as well throughout this homework
        await driver.findElement(By.name("nameEntry")).clear();
        await driver.findElement(By.name("nameEntry")).sendKeys("That Guy");
        await driver.findElement(By.name("employee3")).click();
        await driver.findElement(By.name("employee1"));
        expect(await (await driver.findElement(By.name("nameEntry"))))
        // Had - expect("Bernice Ortiz")
        });
        //I used elmentLocated way to much
        //I did the By.name instead of const doesnt that change anything?

        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            await driver.findElement(phillip).click();
            await driver.wait
                until.elementIsVisible(await driver.findElement(By.name("employee3")));
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys("Another Guy");
            await driver.findElement(By.name("cancel")).click();
            expect(await (await driver.findElement(By.name("nameEntry"))))
        });

        //

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
            await driver.findElement(By.name("employee1")).click();
            await driver.wait
                until.elementIsVisible(await driver.findElement(By.name("employee1")));
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys("Third Guy");
            await driver.findElement(By.name("saveBtn")).click();
            await driver.findElement(bernice).click();
            expect(
                await (await driver.findElement(By.name('employee1'))))
            //Had this first await driver.wait(until.elementLocated(By.name("employee3")));
            //await driver.wait(until.elementLocated(By.name("employee1")))
    });
});
    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(By.name("saveBtn")).click();
            // Had this first await driver.wait(until.elementLocated(By.name("employee1")));
            await driver.wait(until.elementLocated(By.name(".errorCard")));
            expect(await (await driver.findElement(By.name(".errorCard"))).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
        });
        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
            
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(By.name("nameEntry")).clear();
            await driver.findElement(By.name("nameEntry")).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(By.name("saveBtn")).click();
            expect(await (await driver.findElement(By.name(".errorCard"))).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            await driver.findElement(By.name("nameEntry")).sendKeys(Key.SPACE);
            await driver.findElement(By.name("cancel")).click();
            driver.wait(() => true, 500);
            expect(await driver.findElements(By.name(".errorCard"))).toHaveLength(0);
        });
    });
});