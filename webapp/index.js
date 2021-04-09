sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    new ComponentContainer({
        name: "sap.ui.listItem",
        settings: {
            id: "listItem"
        },
        async: true
    }).placeAt("content")
})