export default function registerTest(testID, variant, extraDetails) {
	let testConfig = {
		variant,
		id: testID,
	}
	for (const property in extraDetails) {
		testConfig[property] = extraDetails[property]
	}
	window.norman = window.norman || []
	window.norman[testID] = {
		logs: [],
		testConfig,
	}

	return window.norman[testID]
}