import { Variant } from "../../../dist/index"

const test_config = {
    id: "ex002",
    google_analytics: 29,
    hotjar: false
}
const conditions = _ => {
    return !!document.querySelector("body")
}

function action() {
    this.log("Specified action loaded", true)
}

function fallback() {
    this.track_event("Test can't run, fallback loaded")
}

const variation = new Variant(test_config, "Variation 1", conditions, action, fallback)
variation.run()