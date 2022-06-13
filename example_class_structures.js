class Test {
    constructor(id) {
        this.id = id
    }
}

class Variant extends Test {
    constructor(id, name, html) {
        super(id)
        this.name = name,
        this.html = html
    }
    logClass() {
        console.log(this.id)
    }
    insert(target, method="beforeBegin") {
        console.log(`target.insertAdjacentElement("${method}", '${this.html}')`)
    }
}

class Element {
    constructor() {

    }
}