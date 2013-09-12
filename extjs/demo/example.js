Ext.Loader.setConfig ({
	paths: {
		'Ext': '..'
	} ,
	enabled: true
});

Ext.require (['Ext.ux.Usersnap']);

Ext.onReady (function () {
	// Shortcut for WebWorkerManager
    
    var win = Ext.create('Ext.window.Window', {
        title: 'This is a Usersnap window',
        layout: 'fit',
        items: [{
            xtype: 'panel',
            html: 'This is a empty window'
        }],
        width: 500,
        height: 300,
        buttons: [{
            text: 'close',
            handler: function() {
                win.close();
            }
        }, {
            text: 'open Usersnap',
            handler: function() {
                us.openUsersnap();
            }
        }]
    });
    
    win.show();
    
    var txt = 'This is a empty window';
    
    var us = Ext.create('Ext.ux.Usersnap', {
        //TODO: replace that with a valid api key
        apiKey: ''
    });
    
    us.on('jsloaded', function() {
        txt += '<br/>Js Loaded!';
        win.down('panel').update(txt);
    }, this);
    
    us.on('beforesend', function() {
        txt += '<br/>before Report will be sent!';
        win.down('panel').update(txt);
    }, this);
    
    
});
