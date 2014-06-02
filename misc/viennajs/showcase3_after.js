function checkmessage(msg) {
	//console.log('msg: %o', arguments);
	console.log('server replied with: %o', msg.data);
	
}
function postsomedata() {
	window.addEventListener("message", checkmessage, false);

	var postframe = document.createElement('iframe');
	var uid = 'post_frame_' + new Date().getTime();
	document.body.appendChild(postframe);
	postframe.contentWindow.name = uid;
	var postURL = 'http://myspecialhost.local/viennajs/showcase3_after.php';
	postframe.addEventListener('load', function() {
		console.log('post done, but dont know if it was successful or a error was raised');
		//this raises a securty error
		//var d = postframe.contentWindow.document;
		//post messages work although there is a cross origin policy
		postframe.contentWindow.postMessage("ok?", postURL);
		//start counter too, give them 5 sec to respond
	});
	
	var form = document.createElement("form");
	form.target = uid;
	form.action = postURL;
	form.method = 'POST';
	form.acceptCharset = 'utf-8';
	
    //add field
	var input = document.createElement("input");
    input.type = "hidden";
    input.name = 'name';
    input.value = 'Josef';
    form.appendChild(input);
	
	//send it
	form.submit();
}