sap.ui.define([
    "app/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function(BaseController , Filter, FilterOperator, Sorter) {
'use strict'
    return BaseController.extend("app.controller.Master", {

        onInit: function() {
            this._sortField = 'ProductName'
            this._oItems = this.byId("items");
            this._bSortDescending = false
            this._sSearchQuery = null

        },

        onSort: function(oEvent) {
            let sortField = this._sortField
            let Items = this._oItems
            let bSortDescending = this._bSortDescending === false ? this._bSortDescending = true : this._bSortDescending = false
            let oSorter = new Sorter(sortField, bSortDescending)

            let oBinding = Items.getBinding("items");
				oBinding.sort(oSorter);
        },

        onSearchElement: function(oEvent) {
            let aFilter = []
            let Items = this._oItems
            let searchedValue = oEvent.getSource().getValue()

            if (searchedValue.length > 0) aFilter.push(new Filter("ProductName", FilterOperator.Contains, searchedValue))

            let oBinding = Items.getBinding("items");
            oBinding.filter(aFilter, "Application")
        },

        onListItemPressed : function(oEvent){
			var oItem, oCtx
            oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext('productListItems');
            this.getRouter().navTo("invoice", {
                invoiceId: oCtx.getProperty("id") 
            })
		},
    })
})