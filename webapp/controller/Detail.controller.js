sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/core/Fragment"
], function (BaseController, Fragment) {
	"use strict";
	return BaseController.extend("app.controller.Detail", {

		onInit: function () {
			let oRouter = this.getRouter()

			oRouter.getRoute('invoice').attachMatched(this._onRouteMatched, this)
		},

		onCloseDetail: function (oEvent) {
			this.getRouter().navTo("SplitApp")
		},

		onFullScreen: function () {
			this.getRouter().navTo("invoiceFullScreen")
		},

		_onRouteMatched: function (oEvent) {
			let oArgs, oView;

			oArgs = oEvent.getParameter('arguments').invoiceId - 1
			oView = this.getView()

			oView.bindElement({
				path: "invoice>/Invoices/" + oArgs + "/",
			})

			},

		onInvoiceInformation: function (oEvent) {
			// let oView = this.getView()
			var oCtx = this.getView().getElementBinding('invoice').getBoundContext();
			let path = oEvent.getSource("productName").getBindingContextPath()
			let getProductArr = path.match(/\/\d/g)
			let getProductParameter = getProductArr[getProductArr.length - 1].substr(1)
			
			this.getRouter().navTo("invoiceInformaton", {
				invoiceId :  oCtx.getProperty("id"),
				productName: getProductParameter
			});
			
		
			
		},

		handlePopoverPress: function(oEvent) {

		var oButton = oEvent.getSource(),
		oView = this.getView();
		let getBindingPath = oEvent.getSource("productName").getBindingContext('invoice').sPath
		oView.bindElement(getBindingPath)

	// create popover
	if (!this._pPopover) {
		this._pPopover = Fragment.load({
			id: oView.getId(),
			name: "app.view.productList.fragment.ProductPopup",
			controller: this
		}).then(function(oPopover) {
			oView.addDependent(oPopover);
			oPopover.bindElement(getBindingPath)
			return oPopover;
		});
	}
	this._pPopover.then(function(oPopover) {
		oPopover.openBy(oButton);
	});


		}


	});
});