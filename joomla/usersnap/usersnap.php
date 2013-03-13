<?php
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );
 
jimport( 'joomla.plugin.plugin' );
 
/**
 * Example system plugin
 */
class plgSystemUsersnap extends JPlugin
{
/**
* Constructor.
*
* @access protected
* @param object $subject The object to observe
* @param array   $config  An array that holds the plugin configuration
* @since 1.0
*/
public function __construct( &$subject, $config )
{
parent::__construct( $subject, $config ); 
}

function onBeforeRender() {
	if ( JFactory::getApplication()->isSite()) {
		$document = JFactory::getDocument();
		$apiKey = $this->params->get('api-key', '');
		if ($apiKey !== "") {
			$js_code = "
				var _usersnapconfig = {
				    apiKey: '".$this->params->get('api-key', '')."',
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
