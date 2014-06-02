function jsonp(resp) {
	//console.log('JSONP Response');
	//console.log(resp);
	//parse it
	var o = JSON.parse(resp);
	console.log('my Object response is');
	//console.log(o);
	console.log('your name is %o', o.value);
}
function mycode() {
	var req = document.createElement('script');
	req.setAttribute('type', 'text/javascript');
	req.src = 'showcase5.php?dc='+new Date().getTime();
	document.body.appendChild(req);
}