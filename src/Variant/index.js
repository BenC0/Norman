import Test from "../Test/index"
import nLog from "../norman_modules/core/nLog" 
import poll from "../norman_modules/core/pollFunction"

export default class Variant extends Test {
    constructor(
        test_config = {
            id: "",
            google_analytics: false,
            hotjar: false,
        },
        name = "Variant",
        conditions = false,
        actions = null,
        fallback = null,
    ) {
        super(test_config.id, test_config.google_analytics, test_config.hotjar)
        this.name = name, 
        this.conditions = conditions
        this.actions = actions || this.default_action
        this.fallback = fallback || this.default_fallback
    }

    default_action () {
        this.log("No action specified", true)
    }

    default_fallback () {
        this.log("No fallback specified", true)
    }

    log(msg, warn = false) {
        nLog(this.id, msg, warn)
    }

    run() {
		poll(_ => {
            return this.conditions() && !document.body.classList.contains(this.body_class)
        }, _ => {
			document.body.classList.add(this.body_class)
            this.track_impression()
			this.actions()
		}, 5, 10, _ => {
            this.fallback()
        })
	}

    track_event_ga4(action) {
        let eventObject = {
            'event': 'optimisation_test',
            'optimisation_id': this.id,
            'optimisation_variant': this.name,
			'optimisation_event': action
        }
        this.track_event_object(eventObject)
    }

    track_impression() {
        if (typeof this.google_analytics === "number") {
            let eventObject = {
                'event': 'CRO_Test_Impression',
                'dimension': this.google_analytics,

                'testID': this.id,
                'variation': this.name,

            }
            this.track_event_object(eventObject)
            this.track_event_ga4("Impression")
        }
        this.track_content_square()
    }

    track_content_square() {
        var csTypeVendorPrefix = "AB_ABT_";
        var csKey = csTypeVendorPrefix + this.id;
        window._uxa = window._uxa || []
        _uxa.push([
            "trackDynamicVariable",
            {
                key: csKey,
                value: this.name,
            },
        ]);
    }
    
    track_event(action) {
        let eventObject = {
			'event': 'CRO_Test_Event',
			'eventAction': `${action}`,
			'eventLabel': `${this.id}-${this.name}`,
		}
        this.track_event_object(eventObject)
        this.track_event_ga4(action)
    }

    track_event_object(eventObject) {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push(eventObject)
        this.log({msg: "Tracked Event Object", eventObject})
    }
}