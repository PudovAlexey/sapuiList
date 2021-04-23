sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/RatingIndicator",
    "sap/m/Image",
    "sap/m/Title",
    "sap/m/ObjectNumber",
    "sap/m/MessageStrip",
    "sap/m/Link"


], function (Control, RatingIndicator, Image, Title, ObjectNumber, MessageStrip, Link) {
    "use strict";
    return Control.extend("app.control.ProductCard", {
        metadata: {
            properties: {
                src: { type: "string", defaultValue: ''},
                title: { type: "string", defaultValue: ""},
                rating: { type: "float", defaultValue: 0},
                currentPrice: { type: "float", defaultValue: 0},
                oldPrice: { type: "float", defaultValue: 0},
                indicatorState: { type: "boolean", defaultValue: true},
                indicatorValue: { type: "string", defaultValue: ""},
                link: { type: "string", defaultValue: ""},
                textLink: { type: "string", defaultValue: ""},
            },
            aggregations: {
                _rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },
                _image: { type: "sap.m.Image", multiple: false, visibility: "hidden" },
                _title: { type: "sap.m.Title", multiple: false, visibility: "hidden" },
                _currentPrice: { type: "sap.m.ObjectNumber", multiple: false, visibility: "hidden" },
                _oldPrice: { type: "sap.m.ObjectNumber", multiple: false, visibility: "hidden" },
                _messageStrip: { type: "sap.m.MessageStrip", multiple: false, visibility: "hidden" },
                _link: { type: "sap.m.Link", multiple: false, visibility: "hidden" }
            },
            events: {
                change: {
                    parameters: {
                        value: {type: "int" }
                    }
                }
            }
        },
        init: function (value) {
            
        },

        setValue: function (fValue) {
            let image = this.getProperty("src")
            let title = this.getProperty("title")
            let rating = this.getProperty("rating")
            let currentPrice = this.getProperty("currentPrice")
            let oldPrice = this.getProperty("oldPrice")
            let indicatorValue = this.getProperty("indicatorValue")
            let indicatorState = this.getProperty("indicatorState")
            let link = this.getProperty("link")
            let textLink = this.getProperty("textLink")

            this.setAggregation("_rating" , new RatingIndicator({
                value: rating,
                iconSise: "2rem",
                visualMode: "Half",
            }))

            this.setAggregation("_image" , new Image({
                src: image,
                width: "10rem",
                height: "10rem"
            }))

            this.setAggregation("_title" , new Title({
                text: title,
                titleStyle: "H5"
            }))

            this.setAggregation("_currentPrice" , new ObjectNumber({
                number: currentPrice,
                class: "relatedProduct__current"
            }))
            this.setAggregation("_oldPrice" , new ObjectNumber({
                number: oldPrice,
                class: "relatedProduct__old sapUiSmallMarginBegin"
            }))

            this.setAggregation("_messageStrip" , new MessageStrip({
                text: indicatorValue,
                visible: indicatorState,
                width: "5%"
            }))

            this.setAggregation("_link" , new Link({
                href: link,
                text: textLink
            }))
        },

        reset: function () {

            this.setValue("");
        },
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("relatedProductCard");
            oRm.openEnd();
            oRm.renderControl(oControl.getAggregation("_image"));
            oRm.renderControl(oControl.getAggregation("_messageStrip"));
            oRm.renderControl(oControl.getAggregation("_title"));
            oRm.renderControl(oControl.getAggregation("_rating"));
            oRm.renderControl(oControl.getAggregation("_currentPrice"));
            oRm.renderControl(oControl.getAggregation("_oldPrice"));
            oRm.renderControl(oControl.getAggregation("_link"));
            oRm.close("div");
        }
    });
});