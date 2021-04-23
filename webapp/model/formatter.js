sap.ui.define([

], function () {
    'use strict'

return {
    listLength: function(sStatus) {
        let resourcrBundle = this.getView().getModel("invoice").oData.Invoices.length 

        return resourcrBundle
    }, 

    formatPrice: function(sStatus) {
        return `${sStatus} RUB`
    },

    getRating: function(sStatus) {

        let reviewsCount = sStatus ? sStatus.length : null

        return `(Reviews ${reviewsCount})`
    }
}
})