sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/HTML"
], function(Control) {
'use strict'

return Control.extend("app.control.VideoPlayer", {

    metadata: {
        properties: {
            "src": {type: "string"},
            type: {type: "string", defaultValue: "audio/mpeg"}
        },
    
        aggregations: {},
        events: {}
    },
    
    init: function () {
        },
    
        render: function (oRm, oControl) {
            oRm.write("<center><video controls autoplay")
            oRm.write("<source src = '"+ oControl.getSrc()+ "'>")
            oRm.write("</video></center>")
        
    }
})
})