sap.ui.define([
    "app/controller/BaseController",
    "sap/ui/table/RowAction",
    "sap/ui/core/Fragment",
], function (BaseController, RowAction, Fragment) {
    'use strict'

    return BaseController.extend("app.controller.ShoppongCart", {

        onBeforeRendering() {
            let oModel = this.getOwnerComponent().getModel("shoppingCart")

            this.getView().setModel(oModel, "shoppingCart")
            this._oShoppingCartModel = this.getView().getModel("shoppingCart")
            this._convertLocalStorage()

            let oProductInCart = this._oShoppingCartModel.getProperty(`/shoppingCart`)
            this._reduceQuontity(oProductInCart)
            this._reduceTotalPrice(oProductInCart)

            this._reduceTotalDiscount(oProductInCart)
            this._DiscountPercentage(oProductInCart)
        },

        _convertLocalStorage() {
            this._oShoppingCartModel.setProperty("/shoppingCart", this._addedItems().shoppingCart)



        },

        onItemPressed(oEvent) {
            let onElementPressed = +oEvent.getSource().getBindingContext("shoppingCart").sPath.match(/\d/g)[0]
            let oCategory = this.getView().getModel('shoppingCart').getProperty(`/shoppingCart/${onElementPressed}/name`)
            let oSize = this.getView().getModel('shoppingCart').getProperty(`/shoppingCart/${onElementPressed}/choosedSize`)
            let oColor = this.getView().getModel('shoppingCart').getProperty(`/shoppingCart/${onElementPressed}/choosedColor`)
            localStorage.removeItem(`${oCategory}/${oColor}/${oSize}/shoppingCart`)
            let oDelete = [...this.getView().getModel('shoppingCart').getProperty('/shoppingCart').splice(onElementPressed, 1)];
            let oModel = this.getView().getModel('shoppingCart').getProperty('/shoppingCart')
            this._oShoppingCartModel.setProperty("/shoppingCart", oModel)
        },

        onValueChanged(oEvent) {
            let onElementPressed = +oEvent.getSource().getBindingContext("shoppingCart").sPath.match(/\d/g)[0]
            let oCounter = oEvent.getSource().getValue()
            let oProductInCart = this.getView().getModel('shoppingCart').getProperty(`/shoppingCart`)
            let oProductCurrentPrice = this.getView().getModel('shoppingCart').getProperty(`/shoppingCart/${onElementPressed}/currentPrice`)
            this.getView().getModel('shoppingCart').setProperty(`/shoppingCart/${onElementPressed}/TotalAmount`, oProductCurrentPrice * oCounter)
            this._reduceQuontity(oProductInCart)
            this._reduceTotalPrice(oProductInCart)

            this._reduceTotalDiscount(oProductInCart)
            this._DiscountPercentage(oProductInCart)
        },

        _reduceTotalPrice(oProductInCart) {
            let reducePrice = 0
            if (oProductInCart.length <= 0) {
                return reducePrice
            } else {
                reducePrice = oProductInCart.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue.TotalAmount;
                }, 0)
            }


            this.getView().getModel('shoppingCart').setProperty('/totalPrice', `${reducePrice} RUB`)

            this._reducePrice = reducePrice
        },

        _reduceQuontity(oProductInCart) {
            let reduceContItems = 0
        if (oProductInCart.length <= 0) {
            return reduceContItems
        } else {
            reduceContItems = oProductInCart.length
        }

        this.getView().getModel('shoppingCart').setProperty('/itemsInCart', `${reduceContItems} pc`)
        },

        _reduceTotalDiscount(oProductInCart) {
            let reduceDiscount = 0
            if (oProductInCart.length <= 0) {
                return 0
            } else {
                reduceDiscount = oProductInCart.reduce(function (accumulator, currentValue) {
                    if ( currentValue.priceBeforeDiscount === 0) {
                        return 0
                    } else {
                        return accumulator + ((currentValue.priceBeforeDiscount * currentValue.choosedItems));   
                    }
                }, 0)
            }
    
            this.getView().getModel('shoppingCart').setProperty('/totalDiscount', `${reduceDiscount - this._reducePrice} RUB`)
    
            this._reduceDiscount = reduceDiscount - this._reducePrice
        },

        _DiscountPercentage(oProductInCart) {
            let reduceDiscountPercentage = 0
            if (this._reduceDiscount === 0) {
                return reduceDiscountPercentage
            } else {
                reduceDiscountPercentage = (this._reduceDiscount / this._reducePrice) * 100
            }
            this.getView().getModel('shoppingCart').setProperty('/totalDiscountPercentage', `${reduceDiscountPercentage.toFixed(2)}%`)
        },

        onClearCart() {
            this._oShoppingCartModel.setProperty("/shoppingCart", [])
            localStorage.clear()
        },

        handlePopoverPressDelivery: function(oEvent) {

            var oButton = oEvent.getSource(),
            oView = this.getView();
            // let getBindingPath = oEvent.getSource("Category").getBindingContext('invoice').sPath
            // oView.bindElement(getBindingPath)
    
        // create popover
        if (!this._pPopover) {
            this._pPopover = Fragment.load({
                id: oView.getId(""),
                name: "app.view.fragment.ProductPopupDelivery",
                controller: this
            }).then(function(oPopover) {
                oView.addDependent(oPopover);
                // oPopover.bindElement(getBindingPath)
                return oPopover;
            });
        }
        this._pPopover.then(function(oPopover) {
            oPopover.openBy(oButton);
        });
    
            },

            handleDialogPressPay(oEvent) {
                var oView = this.getView();
                let that = this
                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId("showDeliverySettings"),
                        name: "app.view.fragment.DialogPay",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                })
            },

            onFreeDeliveryPress: function(oEvent) {

                var oButton = oEvent.getSource(),
                oView = this.getView();
        
            // create popover
            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId("ShowDeliveryInformation"),
                    name: "app.view.fragment.DialogDeliveryInformation",
                    controller: this
                }).then(function(oPopover) {
                    debugger
                    // oView.addDependent(oPopover);
                    return oPopover;
                });
            }
            this._pPopover.then(function(oPopover) {
                oPopover.openBy(oButton);
            });
        
                },
    })
})