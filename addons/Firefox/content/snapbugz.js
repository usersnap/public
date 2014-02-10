var SnapBugz = {
  cURL: null,
  getcURL: function() {
 	this.cURL = gBrowser.contentWindow.location.hostname;
  },
 Do: function() {
	this.getcURL();
	gBrowser.selectedTab = gBrowser.addTab("http://snapbugz.com/do/" + this.cURL);
  }
};
