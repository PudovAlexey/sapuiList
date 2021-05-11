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
        

        let reviewsCount = sStatus ? sStatus.length : 0
        console.log(reviewsCount)
        

        return `(Reviews ${reviewsCount})`
    },

    formatStock: function (sStatus) {
        switch(sStatus) {
            case 0: 
                return 'Out of Stock'
                break
            default:
                return `available for purchase ${sStatus} goods`
                break
        }
        
    }
}
})