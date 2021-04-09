sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {

    return UIComponent.extend("sap.ui.listItem.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments)

            this.getRouter().initialize();

            var oData = {
				recipient : {
					name : "World"
				}
			};

            var oModel = new JSONModel(oData);
			this.setModel(oModel);
        }
    })

})