sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    new ComponentContainer({
        name: "app",
        settings: {
            id: "listItem"
        },
        async: true
    }).placeAt("content")
})