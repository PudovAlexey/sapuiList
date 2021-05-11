sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Fragment, Filter, FilterOperator) {
	"use strict";
	return BaseController.extend("app.controller.Detail", {

		onInit: function () {
			//Switching grid wiew
			this._tableView = this.byId('SwitchTableView')
			this._ListView = this.byId('SwitchListView')

			// Get all filterFields
			this._searchField = ''
			this._rangeSlider = this.byId('priceFilter')
			this._colorFilter = this.byId('colorItems')
			this._sizeFilter = this.byId('sizeItems')
			this._tagsFilter = this.byId('tagsItems')
			

			// routes
			let oRouter = this.getRouter()
			oRouter.getRoute('invoice').attachMatched(this._onRouteMatched, this)

			//Show rangeSliderDetail
			this._topValue = this.byId("priceFilter").getValue2()
			this._bottomValue = this.byId("priceFilter").getValue()
			this._onDefaultRangeSlider()

			//filtration

			this._oGridListToFilter = this._tableView.getVisible() === true ? this._tableView : this._ListView

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
				path: "productListItems>/" + oArgs + "/",
			})

			},

		onInvoiceInformation: function (oEvent) {
			// let oView = this.getView()
			oEvent.getSource().getBindingContext("productListItems")
			var oCtx = this.getView().getElementBinding('productListItems').getBoundContext();
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

		},

		onTableView() {
			this._tableView.setVisible(true)
			this._ListView.setVisible(false)
		},

		onListView() {
			this._tableView.setVisible(false)
			this._ListView.setVisible(true)
		},

		_onDefaultRangeSlider() {
			this.byId('priceCounter').setText(`Price: ${this._bottomValue} RUB - ${this._topValue} RUB`)
		},

		onSearchProductName(oEvent) {
			this._searchField = oEvent.getSource().getValue()
			this._onFilteredCart()
		},

		onRangeChange(oEvent) {
			this._bottomValue = oEvent.getSource().getValue()
			this._topValue = oEvent.getSource().getValue2()
			this.byId('priceCounter').setText(`Price: ${this._bottomValue} RUB - ${this._topValue} RUB`)
			this._onFilteredCart()
		},

		onColorFilter() {
			this._onFilteredCart()
		},

		onSizeFilter() {
			this._onFilteredCart()
		},

		onTagsFilter() {
			this._onFilteredCart()
		},

		onTagsFilter() {
			this._onFilteredCart()
		},

		_onFilteredCart() {
			let oFilter, oBinding
			// function filterConverter (filterField) {
			// 	// get array of Choosed items
			// 	let ConvertedFields = filterField.getSelectedItems().map(el => {
			// 		return {
			// 			color: el.mProperties.title,
			// 			checked: false
			// 		}
			// 	})
			// 	return ConvertedFields
			// }

			function filterConverter (filterField) {
				// get array of Choosed items
				let ConvertedFields = filterField.getSelectedItems().map(el => {
					return el.mProperties.title
				})
				return ConvertedFields
			}
			let aFilters = []

			if (this._searchField !== '' || this._bottomValue > 0 || this._colorFilter.length !== 0 || this._sizeFilter.length !== 0 || this._tagsFilter.length !== 0) {
			
				aFilters.push(new Filter("name", FilterOperator.Contains, this._searchField));
				aFilters.push(new Filter("currentPrice", FilterOperator.BT, this._bottomValue, this._topValue));
				// aFilters.push(new Filter("avalibleColor", FilterOperator.LE, filterConverter(this._colorFilter), ));
				// aFilters.push(new Filter("avalibleColor", FilterOperator.Contains, filterConverter (this._sizeFilter)));
				// aFilters.push(new Filter("LastName", FilterOperator.Contains, filterConverter (this._tagsFilter)));

				oFilter = new Filter({ filters: aFilters, and: true }); 
			} else {
				aFilters = null
			}

			oBinding = this._oGridListToFilter.getBinding("items");
			oBinding.filter(oFilter, "Application");
			
		},

	});
});