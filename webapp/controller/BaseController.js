sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "app/model/formatter",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function(Controller, formatter, routing, UIComponent) {
    "use strict"

    return Controller.extend("app.controller.BaseController", {
        formatter: formatter,

        onInit() {

            this._addedItems = () => {
                let shoppingCartKeys =  Object.keys(localStorage).filter(el => el.lastIndexOf("shoppingCart") > -1 ? el : null)
                let wishListKeys =  Object.keys(localStorage).filter(el => el.lastIndexOf("wishList") > -1 ? el : null)
                let shoppingCartValues = []
                let vishListValues = []
                
                for (let i = 0; i <= localStorage.length; i++) {
                 let key = localStorage.key(i)
                     for (let j = 0; j <= shoppingCartKeys.length; j++) {
                         if (key === shoppingCartKeys[j])   shoppingCartValues.push(JSON.parse(localStorage.getItem(key))) 
                     }
                     
                     for (let j = 0; j <= wishListKeys.length; j++) {
                        if (key === wishListKeys[j])   vishListValues.push(JSON.parse(localStorage.getItem(key))) 
                    }
                }
                return {shoppingCart: shoppingCartValues, wishList: vishListValues}
               }
        },

        onShopClick: function(oEvent) {
            this.getOwnerComponent()._oSplitApp.setMode("ShowHideMode")
            
            
            this.getRouter().navTo("SplitApp")
        },

        getRouter: function() {
            return UIComponent.getRouterFor(this)
        }

    })

})