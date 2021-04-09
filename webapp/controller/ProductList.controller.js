// sap.ui.define([
//     "sap/ui/demo/nav/controller/BaseController"
// ], function(BaseController) {
// 'use strict'

//     return BaseController.extend("sap.ui.listItem.controller.ProductList", {
//         onListItemPressed : function(oEvent){
// 			var oItem, oCtx;
// 			oItem = oEvent.getSource();
// 			oCtx = oItem.getBindingContext();
// 			this.getRouter().navTo("employee",{
// 				employeeId : oCtx.getProperty("EmployeeID")
// 			});
// 		}
//     })
// })