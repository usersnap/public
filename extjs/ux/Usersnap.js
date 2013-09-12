/**
 * @class Ext.ux.Usersnap
 * @extends Object
 * @version 1.0
 * @author Usersnap (http://usersnap.com)
 * Adds Usersnap to your ExtJS Application
 */
Ext.define('Ext.ux.Usersnap', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    constructor: function(cfg) {
        this.addEvents(
            /**
             * @event jsloaded
             * Fires when the usersnap code is loaded
             * @param {Ext.ux.Usersnap} this
             */
             'jsloaded',
            /**
             * @event beforeshow
             * Fires before the Report Window will be shown.
             * @param {Ext.ux.Usersnap} this
             */
             'beforeshow',
            /**
             * @event beforesend
             * Fires before a report will be send. Here you can attach custom information
             * @param {Ext.ux.Usersnap} this
             * @param {Object} obj The transport object
             */
             'beforesend',
             /**
             * @event aftersend
             * Fires after a screenshot is send!
             * @param {Ext.ux.Usersnap} this
             * @param {String} reportId A 32 Byte hash Id for the generated usersnap report
             */
             'aftersend',
             /**
             * @event cancel
             * Fires if usersnap is canceled!
             * @param {Ext.ux.Usersnap} this
             * @param {String} type could be "cancel" or "resize"
             */
             'cancel'
        );
        this.mixins.observable.constructor.apply(this, arguments);
        //init usersnap
        var me = this;
        this.usersnapConfig = {
            apiKey: cfg.apiKey,
            lang: cfg.lang||'en',
            commentBox: cfg.commentBox||false,
            commentRequired: cfg.commentRequired||false,
            emailBox: cfg.emailBox||false,
            emailRequired: cfg.emailRequired||false,
            shortcut: cfg.shortcut||false,
            mode: 'report',
            loadHandler: function() {
                me.usersnapLoaded = true;
                me.fireEvent('jsloaded', me);
            },
            beforeOpen: function() {
                me.fireEvent('beforeshow', me);
            },
            beforeSend: function(obj) {
                me.fireEvent('beforesend', me, obj);
            },
            afterSend: function(reportId) {
                me.fireEvent('aftersend', me, reportId);
            },
            cancelHandler: function(type) {
                me.fireEvent('cancel', me, type);
            },
            errorHandler: function(msg) {
                //strange behaviour with google chrome and error handling
                window.setTimeout(function() {
                    Ext.Error.raise(msg);    
                }, 1);
            }
        };
        
        if (cfg.btnText !== undefined) {
            this.usersnapConfig.btnText = cfg.btnText;
        }
        
        if (cfg.commentBoxPlaceholder !== undefined) {
            this.usersnapConfig.commentBoxPlaceholder = cfg.commentBoxPlaceholder;
        }
        
        if (cfg.emailBoxPlaceholder !== undefined) {
            this.usersnapConfig.emailBoxPlaceholder = cfg.emailBoxPlaceholder;
        }
        
        if (cfg.emailBoxValue !== undefined) {
            this.usersnapConfig.emailBoxValue = cfg.emailBoxValue;
        }
        if (cfg.tools !== undefined) {
            this.usersnapConfig.tools = cfg.tools;
        } else {
            this.usersnapConfig.tools = ["pen", "highlight", "note"];    
        }
        
        _usersnapconfig = this.usersnapConfig;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//api.usersnap.com/usersnap.js';
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    },
    
    /**
     * Sets the language of the widget
     * @param {String} lang
     */
    setLanguage: function(lang) {
        if (this.usersnapLoaded) {
            UserSnap.setLanguage(lang);
        } else {
            this.on('jsloaded', function() {
                UserSnap.setLanguage(lang);
            }, this);
        }
    },
    
    /**
     * Sets the predefined value of the emailbox
     * @param {String} val
     */
    setEmailBoxValue: function(val) {
        if (this.usersnapLoaded) {
            UserSnap.setEmailBox(val);
        } else {
            this.on('jsloaded', function() {
                UserSnap.setEmailBox(val);
            }, this);
        }
    },
    
    /**
     * Opens usersnap.
     */
    openUsersnap: function() {
        if (this.usersnapLoaded) {
            UserSnap.openReportWindow();
        } else {
            this.on('jsloaded', function() {
                UserSnap.openReportWindow();
            }, this);
        }
    },
    
    usersnapConfig: null,
    usersnapLoaded: false
});
