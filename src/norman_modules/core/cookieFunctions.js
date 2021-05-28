/* Function to set a cookie. Default expiration date is 30 days. */
export function set(cname, cvalue, exdays = 30) {
	let d = new Date();
	/* Change this value to change the expiration date. The value is an integer of days */
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* function to retrieve a cookie value */
export function get(cname = false) {
	if (cname != false) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return "";
}

/* Function to check a cookie exists */
export function exists(cookieName = false) {
	/* If cookieName is not false and exists */
	if (!!cookieName) {
		/* Return result of getCookie not equal to an empty string */
		return getCookie(cookieName) !== "";
	}
	return false
}

export default {
	set,
	get,
	exists,
}
