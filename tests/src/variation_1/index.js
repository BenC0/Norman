import { Variant, TestElement, TestElements } from "../../../dist/index"

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
    this.track_event("example action")

    let categories = new TestElements(".best-sellers__list > article")
    categories._loop(category => category._mask())
    categories._loop((category, index) => {
        category._find("h2")._loop(a => a._text(`Category ${index}`))
        window.setTimeout(_ => {
            category._mask(false)
        }, (index * 1000) + 1000)
    })
}

function fallback() {
    this.track_event("Test can't run, fallback loaded")
}

const variation = new Variant(test_config, "Variation 1", conditions, action, fallback)
variation.run()