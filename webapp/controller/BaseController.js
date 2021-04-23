sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "app/model/formatter",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, formatter, routing, UIComponent) {
    "use strict"

    return Controller.extend("app.controller.BaseController", {
        formatter: formatter,

        getRouter: function() {
            return UIComponent.getRouterFor(this)
        }

    })

})