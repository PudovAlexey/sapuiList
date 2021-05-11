sap.ui.define([
	"app/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
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
				path: `productListItems>/${oArgs.invoiceId - 1}/product/${oArgs.productName}/`
			})


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
			// add choosed parameters in cart
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/choosedItems`, chooserQuantity)
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/choosedSize`, choosedSize)
			this.getView().getModel('productListItems').setProperty(`${getCurrentContext}/choosedColor`, choosedColor)

			oEvent.getSource().getText() === "Add to cart" ? this._onAddItemInCart(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) : this._onAddItemInWishList(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle)
		},

		_onAddItemInCart(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) {
			window.localStorage.setItem(`${getCurrentContext}/${choosedColor}/${choosedSize}/shoppingCart`, JSON.stringify(invoiceModel))
			MessageToast.show(`${chooserQuantity >= 1 ? "Items" : "Item"} ${chooserQuantity} ${getCurrentItemName} with article ${getCurrentItemArticle} was added in your shopping cart. please check your shopping cart`)
		},

		_onAddItemInWishList(getCurrentContext, choosedColor, choosedSize, invoiceModel, chooserQuantity, getCurrentItemName, getCurrentItemArticle) {
			window.localStorage.setItem(`${getCurrentContext}/${choosedColor}/${choosedSize}/wishList`, JSON.stringify(invoiceModel))
			MessageToast.show(`${chooserQuantity >= 1 ? "Items" : "Item"} ${chooserQuantity} ${getCurrentItemName} with article ${getCurrentItemArticle} was added in your wish list. please check your wish list`)
		},

		onReviewSend() {
			let oPath = this.getView().getBindingContext("productListItems").sPath

			// if (!Object.keys(localStorage).includes(`${oPath}/review`)) {
			let date = new Date()
			let oRating = this.byId("RatingValue").getValue()
			let oName = this.byId("NameValue").getValue()
			let oLastName = this.byId("LastName").getValue()
			let oEmail = this.byId("EmailValue").getValue()
			let oMessage = this.byId("MessageValue").getValue()

			//converting formats
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
			let onReview = this.getView().getModel("productListItems").getProperty(oPath + "/reviews")
			onReview.push(reviewInformation)

			function currentRatingCounter(onReview) {
				let reduceRating = onReview.map((a) => +a.rating).reduce((a, b) => a + b)

				return Math.ceil(reduceRating / onReview.length)


			}


			this.getView().getModel("productListItems").setProperty(oPath + "/productRating", currentRatingCounter(onReview))

			localStorage.setItem(`${oPath}/review`, "")

			fetch(`/product${oPath}`, {
				method: "POST",
				body: JSON.stringify(onReview),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(data => console.log(data))
			//clear Form
			this.byId("RatingValue").setValue(0)
			this.byId("NameValue").setValue("")
			this.byId("LastName").setValue("")
			this.byId("EmailValue").setValue("")
			this.byId("MessageValue").setValue("")
			// } else {
			// 	MessageToast.show("you have already voted. Thanks for your feedback")
			// }
		}



	});
});