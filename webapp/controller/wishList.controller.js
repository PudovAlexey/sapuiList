sap.ui.define([
    "app/controller/BaseController", 
], function(BaseController) {
'use strict'

   return BaseController.extend("app.controller.ShoppongCart", {


    onBeforeRendering() {
        let oModel =  this.getOwnerComponent().getModel("wishList")
            
        this.getView().setModel(oModel, "wishList")
        this._oWistListModel = this.getView().getModel("wishList")
         this._convertLocalStorage()
        },

        _convertLocalStorage() {
            this._oWistListModel.setProperty("/wishList", this._addedItems().wishList)
        }
    })
})