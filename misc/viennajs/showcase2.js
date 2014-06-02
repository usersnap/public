function mywidget() {
	var myframe = document.createElement('iframe');
	myframe.setAttribute('class', 'iframebox');
	document.body.appendChild(myframe);
	var frame = myframe.contentWindow;
	var doc = myframe.contentDocument;
	//write to iframe
	doc.open();
	doc.write("<!DOCTYPE html>");
	doc.write("<html>");
	doc.write("<head><link href=\"bootstrap/css\/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"showcase2_widget.css\" rel=\"stylesheet\"></head>");
	doc.write("<body></body>");
	doc.write("</html>");
	doc.close();
	//previous code
	var elm = doc.createElement('div');
	elm.setAttribute('class', 'widget');
	elm.innerHTML = '<h2>This is my widget content</h2>'+
		'<p>YOLO street art craft beer, cornhole lo-fi plaid bespoke hella Portland Banksy. Whatever 3 wolf moon flannel Brooklyn Tumblr. Single-origin coffee Neutra food truck four loko. Tousled slow-carb Brooklyn church-key VHS. Direct trade gluten-free hashtag farm-to-table +1. Food truck Kickstarter Wes Anderson yr, VHS wolf sriracha fingerstache chillwave selfies Schlitz pickled normcore Marfa. Chambray kogi irony, butcher dreamcatcher vinyl vegan roof party pour-over forage.</p>'+
		'<button id="closeme">close me</button>'+
	'</div>';
	doc.body.appendChild(elm);
	var btn = doc.getElementById('closeme');
	btn.addEventListener('click', function() {
		doc.body.removeChild(elm);
		document.body.removeChild(myframe);
	});
}