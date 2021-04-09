sap.ui.define([
    "sap/ui/listItem/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
    "use strict"

    return BaseController.extend("sap.ui.listItem.controller.Home", {
        onInit: function() {
            let oInvoice = this.getView().getModel("invoice");

            console.log(oInvoice)
        }

    })

})