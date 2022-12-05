import TestElements from "../TestElements/index"
import "./mask.css"

export default class TestElement {
    constructor(selector) {
        this.selector = selector
        // Handle HTML strings
		if ( typeof selector === "string" ) {
			if (
                selector[ 0 ] === "<" &&
				selector[selector.length - 1] === ">" &&
				selector.length >= 3
            ) {
                // selector is a HTML string
                this.html = selector
                this.selector = null
            } else {
                this.selector = selector
                this._get()
                this.html = this._html()
            }
        } else if (selector instanceof HTMLElement) {
            this.node = selector
            this.html = this._html()
        } else {
            console.warn({msg: "Unknown selector variable type detected", selector, type: typeof selector})
        }
    }

    get_node_path() {
        if (!(this.node instanceof Element)) {
            return;
        }
        var el = this.node
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
            var selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                var sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    if (sib.nodeName.toLowerCase() == selector)
                        nth++;
                }
                if (nth != 1)
                    selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(" > ");
    }

    /*===================================
        Helper functions
    ===================================*/
    _get() {
        this.node = document.querySelector(this.selector)
        return this.node
    }

    _find(selector) {
        return [...document.querySelectorAll(selector)].map(a => new TestElement(a))
    }

    /**
     * insert
     * @param {string} target - A CSS selector for the target element 
     * @param {("beforeBegin"|"beforeEnd"|"afterBegin"|"afterEnd")} [method="beforeEnd"] - the method for inserting an element via `insertAdjacentElement`
     */
    _insert(target, method="beforeEnd") {
        let template = document.createElement('template');
        template.innerHTML = this.html;
        let tempEl = template.content.firstChild;
        let targetEl = document.querySelector(target)

        this.node = targetEl.insertAdjacentElement(method, tempEl)
        this.selector = this.get_node_path()
        return this.node
    }

    _append(element) {
        let template = document.createElement('template');
        template.innerHTML = element;
        let tempEl = template.content.firstChild;
        let targetEl = this.node
        return targetEl.insertAdjacentElement("beforeEnd", tempEl)
    }

    /**
     * _text
     * If str param specified, textContent will be updated, if it is ommited, textContent is not changed.
     * @param {string} [str=""] - The text string to change textContent to, if specified.  
     * @returns node textContent
     */
    _text(str = "") {
        if(str.length != 0) {
            this.node.textContent = str
        }
        return this.node.textContent
    }

    /**
     * _html
     * If str param specified, htmlContent will be updated, if it is ommited, htmlContent is not changed.
     * @param {string} [str=""] - The html string to change htmlContent to, if specified.  
     * @param {boolean} [innerHTML=false] - if `true`, innerHTML is user, else, outerHTML.  
     * @returns node innerHTML or outerHTML
     */
    _html(str = "", innerHTML = false) {
        if(str.length != 0) {
            if (innerHTML) {
                this.node.innerHTML = str
            } else {
                this.node.outerHTML = str
            }
        }
        if (innerHTML) {
            return this.node.innerHTML
        } else {
            return this.node.outerHTML
        }
    }

    _class(cls = "", add = true) {
        if(cls.length != 0) {
            if(add) {
                this.node.classList.add(cls)
            } else {
                this.node.classList.remove(cls)
            }
        } else {
            return this.node.classList
        }
    }

    _mask(apply = true) {
        if (apply) {
            this._class("nMask_container")
            this._append(`<div class="nMask"></div>`)
        } else {
            this._class("nMask_container", false)
            this._find(".nMask").forEach(el => el.node.remove())
        }
    }
}