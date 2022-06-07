export function get(selector, all = true)  {
	// Get element
	let els = []
	if (all && typeof selector === "string" && selector.replace(/ /g, '') !== "") {
		els = [...document.querySelectorAll(selector)]
	} else {
		els = [document.querySelector(selector)]
	}
	return els.length !== 0 ? els : false
}

export function exists(input) {
	// Check element exists
	if (typeof input === "string") {
		return !!document.querySelector(input)
	}
	return !!input
}

export function add(html, target, method) {
	// add element to page
    let template = document.createElement('template');
    html = html.trim()
    template.innerHTML = html;
    let tempEl = template.content.firstChild;
	let targetEl = document.querySelector(target)
	return targetEl.insertAdjacentElement(method, tempEl)
}

export function remove(input) {
	// Remove element
	if (typeof input === "string") {
		input = document.querySelector(input)
	}
	input.remove()
}

export const elementManagement = {
	get,
	exists,
	add,
	remove,
}

export default elementManagement