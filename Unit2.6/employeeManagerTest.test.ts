import {Builder,By, Capabilities, until, WebDriver, } from 'selenium-webdriver'
  const chromedriver = require("chromedriver");

  const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  class employeePage {
    driver: WebDriver;
    url: string = 'https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html'

    headers: By = By.css('.titleText')
    addEmployee: By = By.name('addEmployee')
    newEmployee: By = By.xpath('//li[text()="New Employee"]')
    nameInput: By = By.css('[name= "nameEntry"]')
    phoneInput: By = By.name('phoneEntry')
    titleInput: By = By.name('titleEntry')
    saveBtn: By = By.xpath('//button[@id="saveBtn"]')
    constructor(driver: WebDriver) {
        this.driver = driver
    }
    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.headers))
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

const emPage = new employeePage(driver)

  describe("Employee Manger Test", () => {
      beforeEach(async () => {
          await emPage.navigate()
      })
      afterAll(async () => {
          await driver.quit()
      })
      test("adding an employee", async () => {
          await driver.wait(until.elementLocated(emPage.headers))
          await driver.findElement(emPage.addEmployee).click()
          await driver.findElement(emPage.newEmployee).click()
          await driver.findElement(emPage.nameInput).click()
          await driver.findElement(emPage.nameInput).clear()
          await driver.findElement(emPage.nameInput).sendKeys("Change this")
          await driver.findElement(emPage.phoneInput).click()
          await driver.findElement(emPage.phoneInput).clear()
          await driver.findElement(emPage.phoneInput).sendKeys("Change this")
          await driver.findElement(emPage.titleInput).click()
          await driver.findElement(emPage.titleInput).clear()
          await driver.findElement(emPage.titleInput).sendKeys("Change this")
      })})