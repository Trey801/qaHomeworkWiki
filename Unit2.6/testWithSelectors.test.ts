import {Builder, By, Capabilities, Locator, until, WebDriver} from "selenium-webdriver"

const chromedriver = require("chromedriver")

const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

const hdrInput: By = By.css('[name="hdrInput"]')
const mkeInput: By = By.css('[name="mkeInput"]')
const oaiInput: By = By.css('[name="oaiInput"]')
const nameInput: By = By.css('[name="nameInput"]')
const clrBtn: By = By.css('#clearBtn') 
const submitBtn: By = By.css('#submitBtn')
const errorMsg: By = By.css('#errorMsg')


 class Wanted {
    driver: WebDriver;
    url: string = `https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html`
     hdrInput: Locator;
    constructor(driver: WebDriver, url: string){
        this.driver = driver
        this.url = url
    }
    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.hdrInput))
    }
    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy))
        return (await this.driver.findElement(elementBy)).click()
    }
    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy))
        return this.driver.findElement(elementBy).sendKeys(keys)
    }
    async getText(elementBy) {
        await this.driver.wait(until.elementLocated(elementBy))
        return this.driver.findElement(elementBy).getText()
    }
 }

    describe("Wanted Test", () => {
        beforeEach(async () => {
            await driver.get('https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html')
        })
        afterAll(async () => {
            await driver.quit()
        })
 
    test("filling in the blanks for real", async () => {
        await driver.findElement(hdrInput).sendKeys("Dallas Robbery")
        await driver.findElement(mkeInput).sendKeys("Forgot MKE meaning")
        await driver.findElement(oaiInput).sendKeys("WV002015J")
        await driver.findElement(nameInput).sendKeys("That Guy")
        await driver.findElement(submitBtn).click()
        expect(errorMsg).toContain("Errors Received:")
        await driver.findElement(clrBtn).click()
        
    })})
    