import {Google} from './googleWBP'
const fs = require('fs')
const google = new Google()

test("do a search",async() => {
    await google.navigate()
    await google.search('Twix')
    let text = await google.getResults()
    expect(text).toContain("Twix")
    await fs.writeFile(`${__dirname}/test.txt`, text, (e) => {
        if (e) console.error(e)
        else console.log('Save Successful')
    })


    await fs.writeFile(`S{__dirname}/googleScreenshot.png`,
    await google.driver.takeScreenshot(), "base64",
    (e) => {
        if (e) console.error(e)
        else console.log("Save Successful")
    })
    
    await google.driver.quit()    
})