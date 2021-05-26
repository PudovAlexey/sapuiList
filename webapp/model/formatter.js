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
        
    },

    dateCoverter(sStatus) {
       let date = new Date(sStatus)
        let month = ''
        switch (date.getMonth()) {
            case 0: month = "January"
            break
            case 1: month = "February"
            break
            case 2: month = "March"
            break
            case 3: month = "April"
            break
            case 4: month = "May"
            break
            case 5: month = "June"
            break
            case 6: month = "July"
            break
            case 7: month = "August" 
            break
            case 8: month = "September" 
            break
            case 9: month = "October" 
            break
            case 10: month = "November"
            break
            case 11: month = "December" 
            break
        }

        return `${date.getDate()} ${month} ${date.getFullYear()}`
    },
}
})