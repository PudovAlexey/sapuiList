sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {

    return UIComponent.extend("app.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments)

            fetch('http://localhost:3000/api/product')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)

                let reduceDicount = data.map(el => {
                    let reduceProduct = el.product.map(el => {
                      let percentage = ((el.currentPrice / el.priceBeforeDiscount) * 100).toFixed(2)

                        return {...el, discountPercentage: percentage}
                    })

                    return {...el, product: reduceProduct}
                })

                console.log(reduceDicount)


                var oModel = new JSONModel(reduceDicount);
                this.setModel(oModel, "productListItems");
            })

        this.getRouter().initialize();
        }
    })

})