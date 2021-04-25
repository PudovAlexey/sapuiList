sap.ui.define([
    "app/controller/BaseController",
    "sap/ui/table/RowAction"
], function(BaseController, RowAction) {
'use strict'

    return BaseController.extend("app.controller.ShoppongCart", {

        onBeforeRendering() {
            let oTable = this.byId("idProductsTable");
            this.mode = [
                {
					key: "NavigationDelete",
					text: "Navigation & Delete",
					handler: function(){
						var oTemplate = new RowAction({items: [
							new RowActionItem({
								type: "Navigation",
								press: fnPress,
								visible: "{Available}"
							}),
							new RowActionItem({type: "Delete", press: fnPress})
						]});
						return [2, oTemplate];
					}
				}
            ]

            debugger
        },
        onBeforeRendering() {
            let oModel =  this.getOwnerComponent().getModel("shoppingCart")

           this.getView().setModel(oModel, "shoppingCart")
           this._oShoppingCartModel = this.getView().getModel("shoppingCart")
            this._convertLocalStorage()
        },

        _convertLocalStorage() {
            this._oShoppingCartModel.setProperty("/shoppingCart", this._addedItems().shoppingCart)
            debugger


        },
        onClearCart() {
            this._oShoppingCartModel.setProperty("/shoppingCart", [])
            localStorage.clear()
        }
    })
})