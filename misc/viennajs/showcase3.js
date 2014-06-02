function postsomedata() {
	var postframe = document.createElement('iframe');
	var uid = 'post_frame_' + new Date().getTime();
	document.body.appendChild(postframe);
	postframe.contentWindow.name = uid;
	postframe.addEventListener('load', function() {
		console.log('post done, but dont know if it was successful or a error was raised');
		//this raises a securty error
		var d = postframe.contentWindow.document;
	});
	
	var form = document.createElement("form");
	//important thing, this is the target of the form
	form.target = uid;
	form.action = 'http://myspecialhost.local/viennajs/showcase3.php';
	form.method = 'POST';
	form.acceptCharset = 'utf-8';
	document.body.appendChild(form);
	
    //add field
	var input = document.createElement("input");
    input.type = "hidden";
    input.name = 'name';
    input.value = 'Josef';
    form.appendChild(input);
	
	
	//send it
	form.submit();
}