sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
], function (UIComponent, JSONModel, ODataModel) {

    return UIComponent.extend("app.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {

            var oModel = new ODataModel("http://services.odata.org/Northwind/Northwind.svc/$metadata", true);
            

            debugger
            UIComponent.prototype.init.apply(this, arguments)

            this.getRouter().initialize();
        }
    })

})