const norman = require('../dist/index')

console.log('Running Tests')
console.log('Logging Require Output:', norman)

console.log('Registering Test')
let test = norman.registerTest("EX001", "Variation 1", {
	targetElement: norman.elementManagement.get('body')
})
console.log({test})