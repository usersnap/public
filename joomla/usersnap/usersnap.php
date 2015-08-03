<?php
/*------------------------------------------------------------------------
# usersnap.php - Usersnap - A Screenshot paints a thousand words
# ------------------------------------------------------------------------
# author    Usersnap GmbH
# copyright Copyright (C) 2015 usersnap.com. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.usersnap.com
# Technical Support:  Forum - contact@usersnap.com
-------------------------------------------------------------------------*/
// no direct access
defined('JPATH_BASE') or die( 'Restricted access' ); 
 
/**
 * Example system plugin
 */
class plgSystemUsersnap extends JPlugin
{
	function onBeforeRender() {
		if ( JFactory::getApplication()->isSite()) {
			$document = JFactory::getDocument();
			$apiKey = $this->params->get('api-key', '');
			if ($apiKey !== "") {
				$js_code = "
					(function() {
					    var s = document.createElement('script');
					    s.type = 'text/javascript';
					    s.async = true;
					    s.src = '//api.usersnap.com/load/".$this->params->get('api-key', '').".js';
					    var x = document.getElementsByTagName('head')[0];
					    x.appendChild(s);
					})();
				  ";
				$document->addScriptDeclaration($js_code);
			}
		}
	}
}
