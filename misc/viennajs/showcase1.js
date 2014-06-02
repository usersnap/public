function mywidget() {
	var elm = document.createElement('div');
	elm.setAttribute('class', 'widget');
	elm.innerHTML = '<h2>This is my widget content</h2>'+
		'<p>YOLO street art craft beer, cornhole lo-fi plaid bespoke hella Portland Banksy. Whatever 3 wolf moon flannel Brooklyn Tumblr. Single-origin coffee Neutra food truck four loko. Tousled slow-carb Brooklyn church-key VHS. Direct trade gluten-free hashtag farm-to-table +1. Food truck Kickstarter Wes Anderson yr, VHS wolf sriracha fingerstache chillwave selfies Schlitz pickled normcore Marfa. Chambray kogi irony, butcher dreamcatcher vinyl vegan roof party pour-over forage.</p>'+
		'<button id="closeme">close me</button>'+
	'</div>';
	document.body.appendChild(elm);
	var btn = document.getElementById('closeme');
	btn.addEventListener('click', function() {
		document.body.removeChild(elm);
	});
}