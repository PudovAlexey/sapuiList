sap.ui.define([
	"app/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";
	return BaseController.extend("app.controller.InvoiceInformation", {

		onInit: function () {
			this.byId("rating").reset();
			this.byId("ShoppingCard").reset();
			this.byId("ShoppingCard2").reset();
			this.byId("ShoppingCard3").reset();
			this.byId("ShoppingCard4").reset();
			let oRouter = this.getRouter()

			oRouter.getRoute('invoiceInformaton').attachMatched(this._onRouteMatched, this)
		},

        _onRouteMatched: function(oEvent) {
            let oArgs, oView

            oView = this.getView()

            oArgs = oEvent.getParameter('arguments')

            oView.bindElement({
				path: `invoice>/Invoices/${oArgs.invoiceId - 1}/product/${oArgs.productName}/`
			})
			
        },
		onRatingChange: function(oEvent) {
			let fValue = oEvent.getParameter("value");
			let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]))
		},

		onAddItem: function(oEvent) { 
			let chooserQuantity = this.byId("counter").getValue()
			let choosedColor = this.byId("choosedColor").getSelectedKey()
			let choosedSize = this.byId("choosedSize").getSelectedKey()
			let getCurrentContext = this.getView().getBindingContext('invoice').sPath 
			let invoiceModel = this.getView().getModel('invoice').getProperty(getCurrentContext)
			let getCurrentItemName = this.getView().getModel('invoice').getProperty(`${getCurrentContext}/name`)
			let getCurrentItemArticle = this.getView().getModel('invoice').getProperty(`${getCurrentContext}/goodArticle`)
			// add choosed parameters in cart
			this.getView().getModel('invoice').setProperty(`${getCurrentContext}/choosedItems`, chooserQuantity)
			this.getView().getModel('invoice').setProperty(`${getCurrentContext}/choosedSize`, choosedSize)
			this.getView().getModel('invoice').setProperty(`${getCurrentContext}/choosedColor`, choosedColor) 

			oEvent.getSource().getText() === "Add to cart" ? this._onAddItemInCart(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) : this._onAddItemInWishList(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle)
		},

		_onAddItemInCart(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) {
			window.localStorage.setItem(`${getCurrentContext}/${choosedColor}/${choosedSize}/shoppingCart`, JSON.stringify(invoiceModel))
			MessageToast.show(`${chooserQuantity >=1 ? "Items" : "Item"} ${chooserQuantity} ${getCurrentItemName} with article ${getCurrentItemArticle} was added in your shopping cart. please check your shopping cart`)
		},

		_onAddItemInWishList(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) {
			window.localStorage.setItem(`${getCurrentContext}/${choosedColor}/${choosedSize}/wishList`, JSON.stringify(invoiceModel))
			MessageToast.show(`${chooserQuantity >=1 ? "Items" : "Item"} ${chooserQuantity} ${getCurrentItemName} with article ${getCurrentItemArticle} was added in your wish list. please check your wish list`)
		}

	});
});