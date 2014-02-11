chrome.browserAction.onClicked.addListener(function(tab) {
            if(tab && tab.url.indexOf("chrome") !== 0) {
                var url = encodeURIComponent(tab.url);
                chrome.tabs.create({
                            "url": "http://www.snapbugz.com/fetch?q=" + url
                        });
            }
        });
