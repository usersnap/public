/** Solve problem: add here your own jQuery implementation
 *  you can assign it to your own variable!
 * myJQuery = [jQuery version]
 **/
function mywidget() {
	//load library
	var elm = document.createElement('div');
	elm.setAttribute('class', 'widget');
	elm.innerHTML = '<h2>This is my widget content</h2>'+
		'<p>Browser: ' + jQuery.browser.version + '</p>'+
		'<button id="closeme">close me</button>'+
	'</div>';
	document.body.appendChild(elm);
	var btn = document.getElementById('closeme');
	btn.addEventListener('click', function() {
		document.body.removeChild(elm);
	});
}