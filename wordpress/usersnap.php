<?php
/*
Plugin Name: Usersnap
Plugin URI: http://www.usersnap.com
Description: Usersnap helps website owners to get feedback in form of screeenshots from their customers, readers or users.
Version: 1.9
Author: Usersnap
Author URI: http://usersnap.com
License: GPL v2
*/

define('USERSNAP_VERSION', '1.8');
define('USERSNAP_PLUGIN_URL', plugin_dir_url( __FILE__ ));

if ( is_admin() ){ // admin actions
  add_action( 'admin_init', 'us_register_settings' );
  add_action( 'admin_menu', 'us_plugin_menu' );
} else {
	add_action('wp_head', 'us_add_js');
}

function us_add_js() {
	$options = get_option('usersnap_options');
	if ($options['button-valign']==null) {
		$options['button-valign'] = "bottom";
	}
	if ($options['button-halign']==null) {
		$options['button-halign'] = "right";
	}
	if ($options['lang']==null) {
		$options['lang'] = "en";
	}
	if ($options['tool0']==null) {
		$options['tool0'] = "highlight";
	}
	if ($options['tool1']==null) {
		$options['tool1'] = "blackout";
	}
	if ($options['tool2']==null) {
		$options['tool2'] = "note";
	}
	$tools = "'".$options['tool0']."'";
	if ($options['tool1'] != "none") {
		$tools .= ",'".$options['tool1']."'";
	}
	if ($options['tool2'] != "none") {
		$tools .= ",'".$options['tool2']."'";
	}
	if ($options['api-key']!=="") {
		?>
		<script type="text/javascript" data-cfasync="false">
			var _usersnapconfig = {
				apiKey: '<?php echo $options['api-key']; ?>',
				valign: '<?php echo $options['button-valign']; ?>',
				halign: '<?php echo $options['button-halign']; ?>',
				tools: [<?php echo $tools; ?>],<?php  
				if ($options['emailbox'] == "true") {
				?>emailBox: true,<?php
				}
				if ($options['btntext'] != "") {
				?>btnText: '<?php echo $options['btntext']; ?>',<?php
				}
				if ($options['emailboxph'] != "") {
				?>emailBoxPlaceholder: '<?php echo $options['emailboxph']; ?>',<?php
				}
				if ($options['emailboxvalue'] != "") {
				?>emailBoxValue: '<?php echo $options['emailboxvalue']; ?>',<?php
				}
				if ($options['commentbox'] == "true") {
				?>commentBox: true,<?php
				}
				if ($options['shortcut'] == "true") {
				?>shortcut: true,<?php
				}
				if ($options['commentboxph'] != "") {
				?>commentBoxPlaceholder: '<?php echo $options['commentboxph']; ?>',<?php
				}
				?>lang: '<?php echo $options['lang']; ?>'
			}; 
			(function() {
			    var s = document.createElement('script');
			    s.type = 'text/javascript';
			    s.async = true;
			    s.src = '//api.usersnap.com/usersnap.js';
			    var x = document.getElementsByTagName('head')[0];
			    x.appendChild(s);
			})();
		</script>
		<?php
	}
} 

function us_plugin_menu() {
	add_menu_page('Usersnap Settings', 'Usersnap', 'administrator', __FILE__, 'us_option_page', plugins_url('/usersnap_16x16.png', __FILE__));
}

function us_register_settings() {
	register_setting( 'usersnap_options', 'usersnap_options', 'usersnap_options_validate');
	add_settings_section('usersnap_main', 'Main Settings', 'usersnap_section_text', 'usersnap');
	add_settings_field('us-api-key', 'API-Key', 'usersnap_input_text', 'usersnap', 'usersnap_main');
	add_settings_field('us-button-valign', 'Button Vertical Alignment', 'usersnap_input_vbutton', 'usersnap', 'usersnap_main');
	add_settings_field('us-button-halign', 'Button Horizontal Alignment', 'usersnap_input_hbutton', 'usersnap', 'usersnap_main');
	add_settings_field('us-lang', 'Language', 'usersnap_input_lang', 'usersnap', 'usersnap_main');
	add_settings_field('us-btntext', 'Button Text', 'usersnap_input_btntext', 'usersnap', 'usersnap_main');
	add_settings_field('us-shortcut', 'Shortcut', 'usersnap_input_shortcut', 'usersnap', 'usersnap_main');

	add_settings_field('us-emailbox', 'Emailbox', 'usersnap_input_emailbox', 'usersnap', 'usersnap_main');
	add_settings_field('us-emailboxph', 'Emailbox Placeholder', 'usersnap_input_emailboxPlaceholder', 'usersnap', 'usersnap_main');
	add_settings_field('us-emailboxvalue', 'Emailbox Value', 'usersnap_input_emailboxValue', 'usersnap', 'usersnap_main');
	add_settings_field('us-commentbox', 'Commentbox', 'usersnap_input_commentbox', 'usersnap', 'usersnap_main');
	add_settings_field('us-commentboxph', 'Commentbox Placeholder', 'usersnap_input_commentboxPlaceholder', 'usersnap', 'usersnap_main');
	
	add_settings_section('usersnap_tools', 'Tool Settings', 'usersnap_section_tool', 'usersnap');
	add_settings_field('us-tool0', 'First Tool', 'usersnap_input_tool0', 'usersnap', 'usersnap_tools');
	add_settings_field('us-tool1', 'Second Tool', 'usersnap_input_tool1', 'usersnap', 'usersnap_tools');
	add_settings_field('us-tool2', 'Third Tool', 'usersnap_input_tool2', 'usersnap', 'usersnap_tools');
}

function usersnap_input_text() {
	$options = get_option('usersnap_options');
	?><input id="us-api-key" style="width:250px;" name="usersnap_options[api-key]" size="40" type="text" value="<?php echo $options['api-key']; ?>" /><?php
}

function usersnap_input_btntext() {
	$options = get_option('usersnap_options');
	if ($options['btntext']==null) {
		$options['btntext'] = "Feedback";
	}
	?><input id="us-btntext" style="width:250px;" name="usersnap_options[btntext]" size="40" type="text" value="<?php echo $options['btntext']; ?>" /><?php

}

function usersnap_input_shortcut() {
	$options = get_option('usersnap_options');
	?><input type="checkbox" id="us-shortcut" value="true" <?php echo ($options['shortcut']=="true"?"checked":"")?> name="usersnap_options[shortcut]"/>&nbsp;<label for="us-shortcut"><small>If you want that you can open Usersnap with Ctrl+U</small></label>
		<?php
}


function usersnap_input_vbutton() {
	$options = get_option('usersnap_options');
	if ($options['button-valign']==null) {
		$options['button-valign'] = "bottom";
	}
	?><select id="us-button-valign" style="width:250px;" name="usersnap_options[button-valign]">
		<option value="middle" <?php echo ($options['button-valign']=="middle"?"selected":"")?>>middle</option>
		<option value="bottom" <?php echo ($options['button-valign']=="bottom"?"selected":"")?>>bottom</option>
	</select><?php
}

function usersnap_input_hbutton() {
	$options = get_option('usersnap_options');
	if ($options['button-halign']==null) {
		$options['button-halign'] = "right";
	}
	?><select id="us-button-halign" style="width:250px;" name="usersnap_options[button-halign]">
		<option value="left" <?php echo ($options['button-halign']=="left"?"selected":"")?>>left</option>
		<option value="right" <?php echo ($options['button-halign']=="right"?"selected":"")?>>right</option>
	</select><?php
}

function usersnap_input_lang() {
	$options = get_option('usersnap_options');
	if ($options['lang']==null) {
		$options['lang'] = "en";
	}
	?><select id="us-lang" style="width:250px;" name="usersnap_options[lang]">
		<option value="en" <?php echo ($options['lang']=="en"?"selected":"")?>>English</option>
		<option value="de-informal" <?php echo ($options['lang']=="de-informal"?"selected":"")?>>German formal</option>
		<option value="de-formal" <?php echo ($options['lang']=="de-formal"?"selected":"")?>>German informal</option>
		<option value="fr" <?php echo ($options['lang']=="fr"?"selected":"")?>>French</option>
		<option value="es" <?php echo ($options['lang']=="es"?"selected":"")?>>Spanish</option>
		<option value="pl" <?php echo ($options['lang']=="pl"?"selected":"")?>>Polish</option>
		<option value="fa" <?php echo ($options['lang']=="fa"?"selected":"")?>>Farsi</option>
		<option value="it" <?php echo ($options['lang']=="it"?"selected":"")?>>Italian</option>
		<option value="jp" <?php echo ($options['lang']=="jp"?"selected":"")?>>Japanese</option>
		<option value="ko" <?php echo ($options['lang']=="ko"?"selected":"")?>>Korean</option>
		<option value="hu" <?php echo ($options['lang']=="hu"?"selected":"")?>>Hungarian</option>
		<option value="da" <?php echo ($options['lang']=="da"?"selected":"")?>>Danish</option>
		<option value="cz" <?php echo ($options['lang']=="cz"?"selected":"")?>>Czech</option>
		<option value="sk" <?php echo ($options['lang']=="sk"?"selected":"")?>>Slovakian</option>
		<option value="no" <?php echo ($options['lang']=="no"?"selected":"")?>>Norwegian</option>
		<option value="nl" <?php echo ($options['lang']=="nl"?"selected":"")?>>Dutch</option>
		<option value="fi" <?php echo ($options['lang']=="fi"?"selected":"")?>>Finnish</option>
		<option value="pt" <?php echo ($options['lang']=="pt"?"selected":"")?>>Portuguese</option>
		<option value="tr" <?php echo ($options['lang']=="pt"?"selected":"")?>>Turkish</option>
		<option value="ru" <?php echo ($options['lang']=="pt"?"selected":"")?>>Russian</option>
	</select><?php
}

function usersnap_input_emailbox() {
	$options = get_option('usersnap_options');
	if ($options['emailbox']==null) {
		$options['emailbox'] = "false";
	}
	?><input type="checkbox" value="true" <?php echo ($options['emailbox']=="true"?"checked":"")?> name="usersnap_options[emailbox]"/>
		<?php
}

function usersnap_input_emailboxPlaceholder() {
	$options = get_option('usersnap_options');
	if ($options['emailboxph']==null) {
		$options['emailboxph'] = "";
	}
	?><input type="text" style="width:250px;" value="<?php echo $options['emailboxph']; ?>" name="usersnap_options[emailboxph]"/><i>Optional</i><?php
}

function usersnap_input_emailboxValue() {
	$options = get_option('usersnap_options');
	if ($options['emailboxvalue']==null) {
		$options['emailboxvalue'] = "";
	}
	?><input type="text" style="width:250px;" value="<?php echo $options['emailboxvalue']; ?>" name="usersnap_options[emailboxvalue]"/><i>Optional</i><?php
}

function usersnap_input_commentbox() {
	$options = get_option('usersnap_options');
	if ($options['commentbox']==null) {
		$options['commentbox'] = "false";
	}
	?><input type="checkbox" value="true" <?php echo ($options['commentbox']=="true"?"checked":"")?> name="usersnap_options[commentbox]"/>
		<?php
}

function usersnap_input_commentboxPlaceholder() {
	$options = get_option('usersnap_options');
	if ($options['commentboxph']==null) {
		$options['commentboxph'] = "";
	}
	?><input type="text" style="width:250px;" value="<?php echo $options['commentboxph']; ?>" name="usersnap_options[commentboxph]"/><i>Optional</i><?php
}

function usersnap_section_tool() {
	?><p>Specify the tools which you want to be displayed. Three are allowed.<?php
}

function usersnap_input_tool0() {
	$options = get_option('usersnap_options');
	if ($options['tool0']==null) {
		$options['tool0'] = "highlight";
	}
	?><select id="us-tool0" style="width:250px;" name="usersnap_options[tool0]">
		<option value="highlight" <?php echo ($options['tool0']=="highlight"?"selected":"")?>>Highlight</option>
		<option value="blackout" <?php echo ($options['tool0']=="blackout"?"selected":"")?>>Blackout</option>
		<option value="pen" <?php echo ($options['tool0']=="pen"?"selected":"")?>>Pen</option>
		<option value="note" <?php echo ($options['tool0']=="note"?"selected":"")?>>Note</option>
		<option value="arrow" <?php echo ($options['tool0']=="arrow"?"selected":"")?>>Arrow</option>
	</select><?php
}
function usersnap_input_tool1() {
	$options = get_option('usersnap_options');
	if ($options['tool1']==null) {
		$options['tool1'] = "blackout";
	}
	?><select id="us-tool1" style="width:250px;" name="usersnap_options[tool1]">
		<option value="none" <?php echo ($options['tool1']=="none"?"selected":"")?>>None</option>
		<option value="highlight" <?php echo ($options['tool1']=="highlight"?"selected":"")?>>Highlight</option>
		<option value="blackout" <?php echo ($options['tool1']=="blackout"?"selected":"")?>>Blackout</option>
		<option value="pen" <?php echo ($options['tool1']=="pen"?"selected":"")?>>Pen</option>
		<option value="note" <?php echo ($options['tool1']=="note"?"selected":"")?>>Note</option>
		<option value="arrow" <?php echo ($options['tool1']=="arrow"?"selected":"")?>>Arrow</option>
	</select><?php
}
function usersnap_input_tool2() {
	$options = get_option('usersnap_options');
	if ($options['tool2']==null) {
		$options['tool2'] = "note";
	}
	?><select id="us-tool2" style="width:250px;" name="usersnap_options[tool2]">
		<option value="none" <?php echo ($options['tool1']=="none"?"selected":"")?>>None</option>
		<option value="highlight" <?php echo ($options['tool2']=="highlight"?"selected":"")?>>Highlight</option>
		<option value="blackout" <?php echo ($options['tool2']=="blackout"?"selected":"")?>>Blackout</option>
		<option value="pen" <?php echo ($options['tool2']=="pen"?"selected":"")?>>Pen</option>
		<option value="note" <?php echo ($options['tool2']=="note"?"selected":"")?>>Note</option>
		<option value="arrow" <?php echo ($options['tool2']=="arrow"?"selected":"")?>>Arrow</option>
	</select><?php
}


function usersnap_section_text() {
}

function usersnap_options_validate($input) {
	$t_high = 0;
	$t_black = 0;
	$t_note = 0;
	$t_pen = 0;
    $t_arrow = 0;
	//check tool2
	$input["message"] = "";
	$input["error"] = false;
	for($i = 0; $i < 3; $i++) {
		switch($input["tool".$i]) {
			case "highlight":
				if ($t_high > 0) {
					$input["tool".$i] = "none";
					$input["message"] .= "The highlight tool can only be used once.<br/>";
					$input["error"] = true;
				} else {
					$t_high++;
				}
			break;
			case "blackout":
				if ($t_black > 0) {
					$input["tool".$i] = "none";
					$input["message"] .= "The blackout tool can only be used once.<br/>";
					$input["error"] = true;
				} else {
					$t_black++;
				}
				$t_black++;
			break;
			case "pen":
				if ($t_pen > 0) {
					$input["tool".$i] = "none";
					$input["message"] .= "The pen tool can only be used once.<br/>";
					$input["error"] = true;
				} else {
					$t_pen++;
				}
				$t_pen++;
			break;
			case "note":
				if ($t_note > 0) {
					$input["tool".$i] = "none";
					$input["message"] .= "The note tool can only be used once.<br/>";
					$input["error"] = true;
				} else {
					$t_note++;
				}
				$t_note++;
			break;
			case "arrow":
				if ($t_arrow > 0) {
					$input["tool".$i] = "none";
					$input["message"] .= "The arrow tool can only be used once.<br/>";
					$input["error"] = true;
				} else {
					$t_arrow++;
				}
				$t_arrow++;
			break;
		}
	}
	return $input;
}


function us_option_page() {
	if (!current_user_can('administrator'))  {
		wp_die( __('You do not have sufficient permissions to access this page.') );
	}
	$options = get_option('usersnap_options');
	?>
	<div class="wrap">
	<?php
	if ($options["error"] == true) {
	?><p style="color: #FF0000;"><strong><?php echo $options["message"]; ?></strong></p><?php
	}
	?>
	<form method="post" action="options.php">
	<p><small>Get your Usersnap API-Key at <a href="http://www.usersnap.com" target="_blank">http://www.usersnap.com</a></small></p>
	<?php settings_fields( 'usersnap_options' ); ?>
    <?php do_settings_sections('usersnap'); ?>
	<p class="submit">
		<input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
	</p>
	</form>
	</div>
	<?php
}
