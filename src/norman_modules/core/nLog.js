export default function nLog(testID, event, warn = false) {
	let date = new Date
	let eventObject = {
		"event": event,
		"id": `${testID}:${window.norman[testID].logs.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString()
	}
	window.norman[testID].logs.push(eventObject)
	if (warn) {
		console.warn(eventObject)
	}
}