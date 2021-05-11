sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {

    return UIComponent.extend("app.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments)

            fetch('http://localhost:3000/product')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                var oModel = new JSONModel(data);
                this.setModel(oModel, "productListItems");
            });

        this.getRouter().initialize();
        }
    })

})