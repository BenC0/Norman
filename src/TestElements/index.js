import TestElement from "../TestElement/index"

export default class TestElements {
    constructor(selector) {
		if ( typeof selector === "string" ) {
            this.selector = selector
            // Handle HTML strings
            this._get()
        }
    }

    /*===================================
        Helper functions
    ===================================*/
    _get(n = -1) {
        this.nodes = [...document.querySelectorAll(this.selector)].map(a => new TestElement(a))
        if (n == -1) {
            return this.nodes
        } else {
            return this.nodes[n]
        }
    }

    _loop(func) {
        this.nodes.forEach((node, index) => func(node, index))
    }
}