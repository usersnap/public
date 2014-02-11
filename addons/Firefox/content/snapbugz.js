var SnapBugz = {
    cURL: null,
    getcURL: function() {
        this.cURL = gBrowser.contentWindow.location.href;
    },
    Do: function() {
        this.getcURL();
        if(this.cURL.indexOf("about:") === 0 || this.cURL.indexOf("file:") === 0) {
            return;
        }
        gBrowser.selectedTab = gBrowser.addTab("http://www.snapbugz.com/fetch?q=" +
                encodeURIComponent(this.cURL));
    }
};

window.addEventListener("load", function() {

            var ITEM_ID = "snapbugz-button";
            var NAV_INSERT_BEFORE_ID = "urlbar-container";

            var isButtonInstalled = function() {
                var toolbox = document && document.getElementById("navigator-toolbox");

                for(var i = 0; i < toolbox.childNodes.length; i++) {
                    var testNode = toolbox.childNodes[i];
                    if(testNode.localName == "toolbar" &&
                            testNode.getAttribute("customizable") == "true") {
                        if(testNode.currentSet.indexOf(ITEM_ID) != -1) {
                            return true;
                        }
                    }
                }

                return false;

            };

            var installButton = function() {

                var toolboxDoc = document.getElementById("navigator-toolbox").ownerDocument;
                var nav = document.getElementById("nav-bar");

                var navElements = nav.currentSet.split(",");
                var insertBeforeIndex = navElements.indexOf(NAV_INSERT_BEFORE_ID);

                if(insertBeforeIndex == -1) {
                    navElements.append(ITEM_ID);
                } else {

                    var navEnd = navElements.splice(insertBeforeIndex);
                    navElements.push(ITEM_ID);
                    navElements = navElements.concat(navEnd);
                }

                nav.setAttribute("currentset", navElements.join(","));
                nav.currentSet = navElements.join(",");
                toolboxDoc.persist(nav.id, "currentset");
                try {
                    BrowserToolboxCustomizeDone(true);
                } catch(e) {
                }
            };

            if(!isButtonInstalled()) {
                installButton();
            }

        }, false);

