sap.ui.define([
    "app/controller/BaseController",
], function(BaseController) {
'use strict'

    return BaseController.extend("app.controller.App" , {
        onInit: function() {

            this.getView().byId("app").setMode("HideMode")
        },

        onShopClick: function(oEvent) {
            this.getView().byId("app").setMode("ShowHideMode") 
            
            this.getRouter().navTo("SplitApp")
        },

        onHomeClick: function() {
            this.getRouter().navTo("HomePage")
        },

        onShoppingCartClick: function() {
            this.getRouter().navTo("shoppingCart")
        },

        onWishListClick: function() {
            this.getRouter().navTo("wishList")
        }
    })
})