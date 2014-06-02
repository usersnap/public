<?php
?>

<script type="text/javascript">
	var postOrigin = "";
	function listener(e) {
		if(e.data === 'ok?') {
			postOrigin = e.origin;
			window.parent.postMessage('yes everything ok with me ;-)', postOrigin);
		}
	}
	if (window.addEventListener){
		addEventListener("message", listener, false)
	} else {
		attachEvent("onmessage", listener)
	}
</script>