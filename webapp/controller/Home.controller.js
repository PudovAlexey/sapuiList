

sap.ui.define([
	"app/controller/BaseController",
	"sap/ui/core/Fragment",
	"sap/ui/core/HTML",
	"sap/ui/core/IntervalTrigger"
], function (BaseController, Fragment, HTML, IntervalTrigger) {

	return BaseController.extend("app.controller.Home", {
		onInit: function () {
			this._second = 1000,
				this._minute = this._second * 60,
				this._hour = this._minute * 60,
				this._day = this._hour * 24;


			this._DiscountEnd = this.getOwnerComponent().getModel('homePageModel').getProperty('/TimerBlock/discountEnd')
			self = this;
			self.heartbeatTrigger = new sap.ui.core.IntervalTrigger(1000);
			self.heartbeatTrigger.addListener(function () {
				self.beat();
			});
		},

		beat() {
			let discountEnd = this.getOwnerComponent().getModel('homePageModel').getProperty('/TimerBlock/discountEnd')
			let now = new Date().getTime()
			let countDown = new Date(discountEnd).getTime()
			let distance = countDown - now

			let timeToDiscountEnd = {
				days: Math.floor(distance / (this._day)),
				hours: Math.floor((distance % (this._day)) / (this._hour)),
				minutes: Math.floor((distance % (this._hour)) / (this._minute)),
				seconds: Math.floor((distance % (this._minute)) / this._second)
			}

			this.getOwnerComponent().getModel('homePageModel').setProperty('/TimerBlock/timeToDiscountEnd', timeToDiscountEnd)
		},

		// routes

		onShopShoes() {
			this.getRouter().navTo("shoes")
		},

		onShopAccessories() {
			this.getRouter().navTo("accessories")
		},

		onShopOuterwear() {
			this.getRouter().navTo("outerwear")
		},

		onShopDress() {
			this.getRouter().navTo("dress")
		},

		onVideoPlay: function () {
			var oView = this.getView();
			let that = this
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
			this.pDialog.then(function (oDialog) {
				oDialog.open();
			})
			.then(setTimeout(() => {
				that._onPlayVideo()
			}, 500))
		},

		_onPlayVideo() {

			var sId = this.createId("htmlControl");

			let oHtml = new HTML(sId, {
				content:
					"<div style='position:relative;background-color:black;width:100%;height:100%'>" +
					"<iframe width='857' height='482' src='https://www.youtube.com/embed/9siDCXnuRFI' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"+
				"</div>",

				preferDOM : false,

				afterRendering: function (oEvent) {
					if (!oEvent.getParameters()["isPreservedDOM"]) {
						var $DomRef = oEvent.getSource().$();
						$DomRef.on("click", function (oEvent) {
							this.addColorBlockAtCursor($DomRef, oEvent, 64, 8);
						}.bind(this));
					}
				}.bind(this)
			});
			var oLayout = this.getView().byId("preserveContentLayout");
			oLayout.addContent(oHtml);
		},

		onVideoClose() {
			this.byId("videoPlay").close();
		}


	})
})