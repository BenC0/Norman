import { Variant, TestElement } from "../../../dist/index"

const test_config = {
    id: "ex002",
    google_analytics: 29,
    hotjar: false
}
const conditions = _ => {
    return !!document.querySelector("body")
}

function action() {
    this.log("Action loaded")
    let test_html = `<h1 class="bah">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, est. Architecto laborum doloribus quas quam porro incidunt quos at saepe earum, itaque ut sequi ullam dolores voluptas ratione sapiente suscipit?</h1>`
    let test_el = new TestElement(test_html)
    test_el._insert("body", "beforeBegin")
    window.setTimeout(_ => {
        this.log({msg:`test_el text updated`, from: test_el._text(), to: "Updated text from Lorem Ipsum"})
        test_el._text("Updated text from Lorem Ipsum")
    }, 1000)
    window.setTimeout(_ => {
        this.log({msg:`test_el html updated`, from: test_el._html(), to: "<h2>Now it's an h2<h2>"})
        test_el._html("<h2>Now it's an h2<h2>")
    }, 2000)
}

function fallback() {
    this.track_event("Test can't run, fallback loaded")
}

const variation = new Variant(test_config, "Variation 1", conditions, action, fallback)
variation.run()