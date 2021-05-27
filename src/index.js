const testConfig = {
	id: "XYZ",
	code_version: "1.0.0",
}

function isPDP() {
	return !!window.pageType && window.pageType === "PDP"
}

function isPLP() {
	return !!window.pageType && window.pageType === "PLP"
}

function isHome() {
	return !!window.pageType && window.pageType === "Homepage"
}

function pageType() {
	return !!window.pageType ? window.pageType : false
}

function log(msg) {
	let date = new Date
	window.peabody[testConfig.id].logs.push({
		"msg": msg,
		"id": `${testConfig.id}:${window.peabody[testConfig.id].logs.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString(),
		"code_version": testConfig.code_version
	})
}

function registerTest(variant, extraDetails) {
	window.peabody = window.peabody || {
		isPDP: isPDP(),
		isPLP: isPLP(),
		isHome: isHome(),
		pageType: pageType(),
	}
	window.peabody[testConfig.id] =  {
		logs: [],
		variant,
		testConfig,
	}
	for (const property in extraDetails) {
		window.peabody[testConfig.id][property] = extraDetails[property]
	}
}

const peabody = {
	log: log,
	registerTest: registerTest,
}

