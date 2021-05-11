

sap.ui.define([
    "app/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/core/HTML"
], function (BaseController, Fragment, HTML) {
    'use strict'

    return BaseController.extend("app.controller.Home", {
        onInit: function () {
        },

        onVideoPlay : function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
					name: "app.view.fragment.VideoPlay",
                    controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},

        onVideoClose() {
            this.byId("videoPlay").close(); 
        }


    })
})