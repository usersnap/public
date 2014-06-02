var myjson = JSON.parse;
var testRe = new RegExp(/evil/i);
JSON.parse = function(s) {
	if (testRe.test(s)) {
		return "";
	} else {
		return myjson(s);
	}
};