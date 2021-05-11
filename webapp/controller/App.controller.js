sap.ui.define([
    "app/controller/BaseController",
], function(BaseController) {
'use strict'

    return BaseController.extend("app.controller.App" , {
        onInit: function() {
            this.getOwnerComponent()._oSplitApp = this.byId("app");
                this._onHideMaster()
            //  this.getView().byId("app").setMode("HideMode")
            let bagdeWishList = this.byId("bagdeWishList")
            let bagdeCart = this.byId("bagdeCart")
            let shoppingCartKeys =  Object.keys(localStorage).filter(el => el.lastIndexOf("shoppingCart") > -1 ? el : null).length
            let wishListKeys =  Object.keys(localStorage).filter(el => el.lastIndexOf("wishList") > -1 ? el : null).length

             this._setCounterProductValues( bagdeWishList, bagdeCart,shoppingCartKeys, wishListKeys)

        },

        _setCounterProductValues( bagdeWishList, bagdeCart,shoppingCartKeys, wishListKeys) {
            bagdeWishList.setValue(wishListKeys)
            bagdeCart.setValue(shoppingCartKeys)
        },

        onShopClick: function(oEvent) {
            this.getView().byId("app").setMode("ShowHideMode") 
            var oSplitApp=this.getOwnerComponent()._oSplitApp;
            
            
            this.getRouter().navTo("SplitApp")
        },

        onHomeClick: function() {
            this.getRouter().navTo("HomePage")
            this._onHideMaster()
        },

        onShoppingCartClick: function() {
            this.getRouter().navTo("shoppingCart")
            this._onHideMaster()
        },

        onWishListClick: function() {
            this.getRouter().navTo("wishList")
            this._onHideMaster()
        },

        _onHideMaster() {
            var oSplitApp=this.getOwnerComponent()._oSplitApp;
			oSplitApp.setMode("HideMode")
        }
    })
})