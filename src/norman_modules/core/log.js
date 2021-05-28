export default function log(testID, msg) {
	let date = new Date
	window.norman[testID].logs.push({
		"msg": msg,
		"id": `${testID}:${window.norman[testID].logs.length}`,
		"time": date.toTimeString(),
		"date": date.toDateString()
	})
}