export default class Test {
    constructor(
        id = "",
        google_analytics = false,
        hotjar = false
    ) {
        // Test ID
        this.id = id
        // Tracking properties
        this.hotjar = hotjar
        this.google_analytics = google_analytics
        this.body_class = `${this.id}_loaded`
        this.register_test()
    }

    register_test() {
        window.norman = window.norman || []
        window.norman[this.id] = window.norman[this.id] || {
            logs: []
        }
    }
}