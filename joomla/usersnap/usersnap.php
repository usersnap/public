<?php
// no direct access
defined('JPATH_BASE') or die;
 
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
					var _usersnapconfig = {
					    apiKey: '".$this->params->get('api-key', '')."',
					    btnText: '".$this->params->get('btn-text', '')."',
					    shortcut: ".($this->params->get('shortcut', '0')=="1"?"true":"false").",
					    emailBox: ".($this->params->get('emailbox', '0')=="1"?"true":"false").",
					    lang: '".$this->params->get('lang', 'en')."',
					    emailBoxPlaceholder: '".$this->params->get('emailboxph', '')."',
					    emailBoxValue: '".$this->params->get('emailboxvalue', '')."',
					    commentBox: ".($this->params->get('commentbox', '0')=="1"?"true":"false").",
					    commentBoxPlaceholder: '".$this->params->get('commentboxph', '')."',
					    valign: '".$this->params->get('button-valign', '')."',
					    halign: '".$this->params->get('button-halign', '')."'
					}; 
					(function() {
					    var s = document.createElement('script');
					    s.type = 'text/javascript';
					    s.async = true;
					    s.src = '//api.usersnap.com/usersnap.js';
					    var x = document.getElementsByTagName('head')[0];
					    x.appendChild(s);
					})();
				  ";
				$document->addScriptDeclaration($js_code);
			}
		}
	}
}
