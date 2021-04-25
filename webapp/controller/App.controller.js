sap.ui.define([
    "app/controller/BaseController",
], function(BaseController) {
'use strict'

    return BaseController.extend("app.controller.App" , {
        onInit: function() {
            this.getView().byId("app").setMode("HideMode")
            let bagdeWishList = this.byId("bagdeWishList")
            let bagdeCart = this.byId("bagdeCart")
            // let wishListModelLength =  this.getView().getModel("wishList").getProperty("/wishList").length
            // let productCartModelLength =  this.getView().getModel("shoppingCart").getProperty("/shoppingCart").length
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