sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (BaseController, JSONModel , MessageToast) {
	"use strict";
	return BaseController.extend("app.controller.InvoiceInformation", {

		onInit: function () {
			let oRouter = this.getRouter()

			oRouter.getRoute('invoiceInformaton').attachMatched(this._onRouteMatched, this)
		},

		_onRouteMatched: function (oEvent) {
			let oArgs, oView

			oView = this.getView()

			oArgs = oEvent.getParameter('arguments')

			oView.bindElement({
				path: `productListItems>/${oArgs.invoiceId - 1}/product/${oArgs.Category}/`
			})

			this._elementBinding = this.getView().getBindingContext("productListItems").sPath

			this._GetGoodReviews(this._elementBinding)
		},

		_GetGoodReviews(oCurrentPath) {

			this._oItemId = this.getView().getModel("productListItems").getProperty(`${oCurrentPath}/_id`)
			fetch(`/api/reviews/${this._oItemId}`)
			.then((response) => {
                return response.json()
            })
			.then(
				(data) => {
					var oModel = new JSONModel(data);
         			this.getView().setModel(oModel, "reviewsModel");
				}
			)
			
		},

		onRatingChange: function (oEvent) {
			let fValue = oEvent.getParameter("value");
			let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]))
		},

		onAddItem: function (oEvent) {
			let chooserQuantity = this.byId("counter").getValue()
			let choosedColor = this.byId("choosedColor").getSelectedKey()
			let choosedSize = this.byId("choosedSize").getSelectedKey()
			let getCurrentContext = this.getView().getBindingContext('productListItems').sPath
			let invoiceModel = this.getView().getModel('productListItems').getProperty(getCurrentContext)
			let getCurrentItemName = this.getView().getModel('productListItems').getProperty(`${getCurrentContext}/name`)
			let getCurrentItemArticle = this.getView().getModel('productListItems').getProperty(`${getCurrentContext}/goodArticle`)
			let getCurrentPrice = this.getView().getModel('productListItems').getProperty(`${getCurrentContext}/currentPrice`)
			// add choosed parameters in cart
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/choosedItems`, chooserQuantity)
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/choosedSize`, choosedSize)
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/choosedColor`, choosedColor)
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/TotalAmount`, chooserQuantity * getCurrentPrice)

			oEvent.getSource().getText() === "Add to cart" ? this._onAddItemInCart(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) : this._onAddItemInWishList(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle)
		},

		_onAddItemInCart(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) {
			// window.localStorage.setItem(`${getCurrentContext}/${choosedColor}/${choosedSize}/shoppingCart`, JSON.stringify(invoiceModel))
			window.localStorage.setItem(`${getCurrentItemName}/${choosedColor}/${choosedSize}/shoppingCart`, JSON.stringify(invoiceModel))
			MessageToast.show(`${chooserQuantity >= 1 ? "Items" : "Item"} ${chooserQuantity} ${getCurrentItemName} with article ${getCurrentItemArticle} was added in your shopping cart. please check your shopping cart`)
		},

		_onAddItemInWishList(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) {
			// window.localStorage.setItem(`${getCurrentContext}/${choosedColor}/${choosedSize}/wishList`, JSON.stringify(invoiceModel))
			window.localStorage.setItem(`${getCurrentItemName}/${choosedColor}/${choosedSize}/wishList`, JSON.stringify(invoiceModel))
			MessageToast.show(`${chooserQuantity >= 1 ? "Items" : "Item"} ${chooserQuantity} ${getCurrentItemName} with article ${getCurrentItemArticle} was added in your wish list. please check your wish list`)
		},

		onReviewSend() {

			if (!Object.keys(localStorage).includes(`${this._elementBinding}/review`)) {
			let date = new Date()
			let oRating = this.byId("RatingValue").getValue()
			let oName = this.byId("NameValue").getValue()
			let oLastName = this.byId("LastName").getValue()
			let oEmail = this.byId("EmailValue").getValue()
			let oMessage = this.byId("MessageValue").getValue()

			let dateConverter = `${date.getDate().toString().length == 1 ? "0" + date.getDate() : date.getDate()}.${(date.getMonth() + 1).toString().length == 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()}`

			let reviewInformation = {
				FirstName: oName,
				LastName: oLastName,
				mail: oEmail,
				avatar: "",
				publicDate: dateConverter,
				rating: oRating,
				message: oMessage
			}

			fetch(`/api/reviews/post/${this._oItemId}`, {
				method: "PUT",
				body: JSON.stringify(reviewInformation),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(
					(response) => {
						return response.json()
					}
				)
				.then(
					data => {
						 this.getView().getModel('reviewsModel').getProperty('/').push(data)

					}
				)

				debugger
			//clear Form
			this.byId("RatingValue").setValue(0)
			this.byId("NameValue").setValue("")
			this.byId("LastName").setValue("")
			this.byId("EmailValue").setValue("")
			this.byId("MessageValue").setValue("")

			} else {
				MessageToast.show("you have already voted. Thanks for your feedback")
			}
		}



	});
});