(function($){
    //global
    _usersnapconfig = null;
    
    var _init = false;
    var _loaded = false;
    var _deferShow = false;
    
    var usLoaded = function() {
        _loaded = true;
        if (_usersnapconfig.usersnapLoaded !== null) {
            _usersnapconfig.usersnapLoaded.apply(this);
        }
        if (_deferShow) {
            pubMethods['show'].apply(this);
        }
    };
    
    var preLoad = function() {
        //preload data
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//api.usersnap.com/usersnap.js';
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    };
    
    var pubMethods = {
        'show': function() {
            if (!_loaded) {
                _deferShow = true;
            } else {
                _deferShow = false;
                UserSnap.openReportWindow();    
            }
        },
        'emailbox': function(val) {
            if (_loaded) {
                UserSnap.setEmailBox(val);    
            }
        },
        'language': function(val) {
            if (_loaded) {
                _loaded = false;
                UserSnap.setLanguage(val, usLoaded);
            }
        }
    };
    
    $.usersnap = function(action) {
        if (typeof(action) === 'string') {
            if (!_init) {
                $.error('Please initialize first!');
            } else {
                //method
	            if (pubMethods[action]) {
	                pubMethods[action].apply(this, Array.prototype.slice.call(arguments,1));
	            } else {
	                $.error('Method on plugin not implemented');
	            }    
            }
        } else if (typeof(action) === 'object') {
            if (_init) {
                $.error('Already initialized!');
            } else {
                //base configuration
                _init = true;
	            var config = $.extend({
	                lang: 'en',
	                usersnapLoaded: null
	            }, action);
	            _usersnapconfig = config;
	            _usersnapconfig['mode'] = 'report';
                _usersnapconfig['loadHandler'] = usLoaded;
	            if (typeof(_usersnapconfig['apiKey']) !== 'string') {
	                $.error('Please specify at least an valid apiKey');
	            } else {
	                preLoad();    
	            }
            }
        }
    };
})(jQuery);