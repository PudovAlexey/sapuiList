sap.ui.define([
    "app/controller/BaseController", 
], function(BaseController) {
'use strict'

    return BaseController.extend("app.controller.ShoppongCart", {
        onBeforeRendering() {
            let oModel =  this.getOwnerComponent().getModel("shoppingCart")

            //filtered picked items from lockalStorage and returns items for shopping Cart 
           this._shoppingCart = () => {
            let choppingCartKeys =  Object.keys(localStorage).filter(el => el.lastIndexOf("shoppingCart") > -1 ? el : null)
            let choppingCartValues = []
            for (let i = 0; i <= localStorage.length; i++) {
             let key = localStorage.key(i)
                 for (let j = 0; j <= choppingCartKeys.length; j++) {
                     if (key === choppingCartKeys[j])   choppingCartValues.push(JSON.parse(localStorage.getItem(key))) 
                 }    
            }
            return choppingCartValues
           }


           this.getView().setModel(oModel, "shoppingCart")
           this._oShoppingCartModel = this.getView().getModel("shoppingCart")
            this._convertLocalStorage()
            
        },

        _convertLocalStorage() {
            this._oShoppingCartModel.setProperty("/shoppingCart", this._shoppingCart())


        },
        onClearCart() {
            this._oShoppingCartModel.setProperty("/shoppingCart", [])
            localStorage.clear()
        }
    })
})