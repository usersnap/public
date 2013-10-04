<?php
/*
Plugin Name: Usersnap
Plugin URI: http://www.usersnap.com
Description: Usersnap helps website owners to get feedback in form of screeenshots from their customers, readers or users.
Version: 2.3
Author: Usersnap
Author URI: http://usersnap.com
License: GPL v2
*/

define('USERSNAP_VERSION', '2.3');
define('USERSNAP_PLUGIN_URL', plugin_dir_url( __FILE__ ));

if ( is_admin() ){ // admin actions
  add_action( 'admin_init', 'us_register_settings' );
  add_action( 'admin_menu', 'us_plugin_menu' );
} else {
	add_action('wp_head', 'us_add_js');
}

function us_add_js() {
	$options = get_option('usersnap_options');
	if (!isset($options['button-valign']) || $options['button-valign']==null) {
		$options['button-valign'] = "bottom";
	}
	if (!isset($options['button-halign']) || $options['button-halign']==null) {
		$options['button-halign'] = "right";
	}
	if (!isset($options['lang']) || $options['lang']==null) {
		$options['lang'] = "en";
	}
	if (!isset($options['emailbox'])) {
		$options['emailbox'] = "true";
	}
	if (!isset($options['btntext'])) {
		$options['btntext'] = "";
	}
	if (!isset($options['emailboxph'])) {
		$options['emailboxph'] = "";
	}
	if (!isset($options['emailboxvalue'])) {
		$options['emailboxvalue'] = "";
	}
	if (!isset($options['commentbox'])) {
		$options['commentbox'] = "true";
	}
	if (!isset($options['shortcut'])) {
		$options['shortcut'] = "false";
	}
	if (!isset($options['commentboxph'])) {
		$options['commentboxph'] = "";
	}
	if (!isset($options['tool0']) || $options['tool0']==null) {
		$options['tool0'] = "pen";
	}
	if (!isset($options['tool1']) || $options['tool1']==null) {
		$options['tool1'] = "highlight";
	}
	if (!isset($options['tool2']) || $options['tool2']==null) {
		$options['tool2'] = "note";
	}
	$tools = "'".$options['tool0']."'";
	if (!isset($options['tool1']) || $options['tool1'] != "none") {
		$tools .= ",'".$options['tool1']."'";
	}
	if (!isset($options['tool2']) || $options['tool2'] != "none") {
		$tools .= ",'".$options['tool2']."'";
	}
	if (strlen($options['api-key'])>0) {
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
	$page = add_menu_page('Usersnap Settings', 'Usersnap', 'administrator', __FILE__, 'us_option_page', plugins_url('/usersnap_16x16.png', __FILE__));

	add_action('admin_print_styles-'. $page, 'us_add_admin_styles');
}

function us_add_admin_styles() {
	wp_enqueue_style('usersnapAdminStyle');
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
	
	//page usersnap_pg_new
	add_settings_section('usersnap_new', 'Create an Usersnap account', 'usersnap_section_new', 'usersnap_pg_new');
	add_settings_field('us-user-email', 'Account email', 'usersnap_input_user_email', 'usersnap_pg_new', 'usersnap_new');
	add_settings_field('us-user-url', 'Blog URL', 'usersnap_input_user_url', 'usersnap_pg_new', 'usersnap_new');
	add_settings_field('us-user-pwd', 'Choose a new password', 'usersnap_input_user_pwd', 'usersnap_pg_new', 'usersnap_new');
	add_settings_field('us-user-pwd2', 'Retype your password', 'usersnap_input_user_pwd2', 'usersnap_pg_new', 'usersnap_new');
	

	//add css
	wp_register_style('usersnapAdminStyle', plugins_url('style.css', __FILE__));
}

//user - section

function usersnap_input_user_email() {
	$options = get_option('usersnap_options');
	if (!isset($options['user-email']) || $options['user-email']=="") {
		$options['user-email'] = get_bloginfo("admin_email");
	}
	?><input id="us-user-email" style="width:250px;" name="usersnap_options[user-email]" size="40" type="email" value="<?php echo $options['user-email']; ?>" /><?php
}
function usersnap_input_user_pwd() {
	$options = get_option('usersnap_options');
	?><input id="us-user-pwd" style="width:250px;" name="usersnap_options[user-pwd]" size="40" type="password" value="" /><?php
}

function usersnap_input_user_pwd2() {
	$options = get_option('usersnap_options');
	?><input id="us-user-pwd2" style="width:250px;" name="usersnap_options[user-pwd2]" size="40" type="password" value="" /><?php
}

function usersnap_input_user_url() {
	$options = get_option('usersnap_options');
	if (!isset($options['user-url']) || $options['user-url']=="") {
		$options['user-url'] = get_bloginfo("url");
	}
	?><input id="us-user-url" style="width:250px;" name="usersnap_options[user-url]" size="40" type="text" value="<?php echo $options['user-url']; ?>" /><?php
}

//end of user section

function usersnap_section_text() {
	?>
	<table class="form-table">
		<tr>
			<td>
               <div class="us-box">Manage your API keys on <a href="https://usersnap.com/apikeys" target="_blank">http://usersnap.com/apikeys</a>.</div>  
            </td>
		</tr>
	</table>
	<?php
}

function usersnap_section_new() {
	?>
	<table class="form-table">
		<tr>
			<td>
               <div class="us-box"><a href="https://usersnap.com/wordpress?gat=wpplugin" target="_blank">Usersnap</a> enables your readers to create annotated screenshots with browser and operating system specifics attached. Actionable feedback directly in your inbox!</div>
               <div class="us-box">Screenshots of your WordPress site will help you improve your site and communicate with your readers. Promised.</div>  
            </td>
		</tr>
	</table>
	<?php
}

function usersnap_section_tool() {
	?><p>Specify the tools which you want to be displayed. Three are allowed.<?php
}


function usersnap_input_text() {
	$options = get_option('usersnap_options');
	?><input id="us-api-key" style="width:250px;" name="usersnap_options[api-key]" size="40" type="text" value="<?php echo $options['api-key']; ?>" /><?php
}

function usersnap_input_btntext() {
	$options = get_option('usersnap_options');
	if (!isset($options['btntext']) || $options['btntext']==null) {
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
	if (!isset($options['button-valign']) || $options['button-valign']==null) {
		$options['button-valign'] = "bottom";
	}
	?><select id="us-button-valign" style="width:250px;" name="usersnap_options[button-valign]">
		<option value="middle" <?php echo ($options['button-valign']=="middle"?"selected":"")?>>middle</option>
		<option value="bottom" <?php echo ($options['button-valign']=="bottom"?"selected":"")?>>bottom</option>
	</select><?php
}

function usersnap_input_hbutton() {
	$options = get_option('usersnap_options');
	if (!isset($options['button-halign']) || $options['button-halign']==null) {
		$options['button-halign'] = "right";
	}
	?><select id="us-button-halign" style="width:250px;" name="usersnap_options[button-halign]">
		<option value="left" <?php echo ($options['button-halign']=="left"?"selected":"")?>>left</option>
		<option value="right" <?php echo ($options['button-halign']=="right"?"selected":"")?>>right</option>
	</select><?php
}

function usersnap_input_lang() {
	$options = get_option('usersnap_options');
	if (!isset($options['lang']) || $options['lang']==null) {
		$options['lang'] = substr(get_bloginfo("language"),0,2);
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
	if (!isset($options['emailbox']) || $options['emailbox']==null) {
		$options['emailbox'] = "true";
	}
	?><input type="checkbox" value="true" <?php echo ($options['emailbox']=="true"?"checked":"")?> name="usersnap_options[emailbox]"/>
		<?php
}

function usersnap_input_emailboxPlaceholder() {
	$options = get_option('usersnap_options');
	if (!isset($options['emailboxph']) || $options['emailboxph']==null) {
		$options['emailboxph'] = "";
	}
	?><input type="text" style="width:250px;" value="<?php echo $options['emailboxph']; ?>" name="usersnap_options[emailboxph]"/><i>Optional</i><?php
}

function usersnap_input_emailboxValue() {
	$options = get_option('usersnap_options');
	if (!isset($options['emailboxvalue']) || $options['emailboxvalue']==null) {
		$options['emailboxvalue'] = "";
	}
	?><input type="text" style="width:250px;" value="<?php echo $options['emailboxvalue']; ?>" name="usersnap_options[emailboxvalue]"/><i>Optional</i><?php
}

function usersnap_input_commentbox() {
	$options = get_option('usersnap_options');
	if (!isset($options['commentbox']) || $options['commentbox']==null) {
		$options['commentbox'] = "true";
	}
	?><input type="checkbox" value="true" <?php echo ($options['commentbox']=="true"?"checked":"")?> name="usersnap_options[commentbox]"/>
		<?php
}

function usersnap_input_commentboxPlaceholder() {
	$options = get_option('usersnap_options');
	if (!isset($options['commentboxph']) || $options['commentboxph']==null) {
		$options['commentboxph'] = "";
	}
	?><input type="text" style="width:250px;" value="<?php echo $options['commentboxph']; ?>" name="usersnap_options[commentboxph]"/><i>Optional</i><?php
}

function usersnap_input_tool0() {
	$options = get_option('usersnap_options');
	if (!isset($options['tool0']) || $options['tool0']==null) {
		$options['tool0'] = "pen";
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
	if (!isset($options['tool1']) || $options['tool1']==null) {
		$options['tool1'] = "highlight";
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
	if (!isset($options['tool2']) || $options['tool2']==null) {
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




function usersnap_options_validate($input) {
	if (!isset($input["usersnap-api-requ"])) {
		$input["usersnap-api-requ"] = false;
	}
	$input["message"] = "";
	$input["error"] = false;
	if (isset($_POST['us_btn_setup']) && ($input["usersnap-api-requ"] !== true)) {
		$input["usersnap-api-requ"] = true;
		//setup
		$email = $input["user-email"];
		$pwd = $input["user-pwd"];
		$url = $input["user-url"];
		$data = http_build_query( 
			array('email' => $email,
              'url' => $url,
              'password' => $pwd,
              'password2' => $pwd,
              'gat' => 'wpplugin',
		      'tos' => "true",
              'securetoken' => "usersnap",
              'package' => 'Pro',
              'payment' => "oneyear")
		);
		
		$opts = array(
		    'http' => array(
		        'Content-Type: text/html; charset=utf-8',
		        'method' => "POST",
		        'header' => "Accept-language: en\r\n" .
		        'Content-length: '. strlen($data) . "\r\n",
		        'content' => $data
		     )
		);
		
		$context = stream_context_create($opts);
		$error = false;
		$msg = "";
		$fp = @fopen('https://usersnap.com/signup/signup_external', 'r', false, $context);
		if (!$fp) {
			$msg = "HTTP Error";
			$error = true;
		} else {
			$resp = fread($fp, 1000);
			$resp_obj = json_decode($resp);
			$errorMsg = $resp_obj->{'error'};
			if($errorMsg == null) {
				$apikey = $resp_obj->{'apikey'};
				if($apikey != "") {
					//echo "Congratulations: Your API KEY is ".$apikey;
				} else {
					$error = true;
					$msg = "Could not create an API key! (".$errorMsg.")";
					//var_dump($resp_obj);
				}
			} else {
				$error = true;
				$msg = "Could not create an API key! (".$errorMsg.")";
				//var_dump($resp_obj);
			}
			fclose($fp);
		}
		
		//var_dump($errorMsg);
		
		if (!$error) {
			//no error valid api key
			$input["api-key"] = $apikey;
			$input["message"] = "";
			$input["error"] = false;
		} else {
			$input["message"] .= $msg."<br/>";
			$input["error"] = true;
		}
		
	} else {
		$input["usersnap-api-requ"] = false;
		//save
		$t_high = 0;
		$t_black = 0;
		$t_note = 0;
		$t_pen = 0;
	    $t_arrow = 0;
		//check tool2
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
	}
	return $input;
}

function us_option_tab_menu($current = "newusersnap", $tabs) {
	?>	
	<div id="icon-usersnap" class="icon32"><br></div>
	<h2 class="nav-tab-wrapper">
	<?php
	foreach( $tabs as $tab => $name ){
		$class = ( $tab == $current ) ? ' nav-tab-active' : '';
		?>
		<a class='nav-tab<?php echo $class; ?>' href='?page=usersnap/usersnap.php&tab=<?php echo $tab; ?>'><?php echo $name; ?></a>
		<?php
	}
	?>
   	</h2>
   	<?php
}


function us_option_page() {
	if (!current_user_can('administrator'))  {
		wp_die( __('You do not have sufficient permissions to access this page.') );
	}
	$options = get_option('usersnap_options');
	$tabs = array();
	if (strlen($options['api-key'])>0) {
		$tabs = array(
			'configure' => 'Configure'
		);
		$currenttab = "configure";
		if (isset($_GET['tab']) && $_GET['tab'] == "newusersnap") {
			$_GET['tab'] = $currenttab;
		}
	} else {
		$tabs = array(
			'newusersnap' => 'Setup Usersnap',
			'configure' => 'Configure'
		);
		$currenttab = "newusersnap";
	}
	?>
	<div class="wrap">

	<?php
	if (isset($_GET['tab'])) {
		$currenttab = $_GET['tab'];
	}
	us_option_tab_menu($currenttab, $tabs);
	
	?>	
	<?php
	if ($options["error"] == true) {
		?><p style="color: #FF0000;"><strong><?php echo $options["message"]; ?></strong></p><?php
	}
	?>
	<form method="post" action="options.php" id="us-settings-form">
	<?php settings_fields( 'usersnap_options' ); ?>
	<!--
	<table class="form-table">
		<tr>
			<th>Tags with CSS classes</th>
			<td>
               <input id="ilc_tag_class" name="ilc_tag_class" type="checkbox" value="true" />
               <label for="ilc_tag_class">Checking this will output each post tag with a specific CSS class based on its slug.</label>
            </td>
		</tr>
	</table>
	-->
	<?php
	switch($currenttab) {
		case 'newusersnap':
			do_settings_sections('usersnap_pg_new');
			?>
			<table class="form-table">
				<tr>
					<td>
		               By clicking "Create Usersnap account" you agree to the <a href="https://usersnap.com/terms-of-service">Terms of Service</a> and <a href="https://usersnap.com/privacy-policy">Privacy Policy</a>.
		            </td>
				</tr>
			</table>
			<p class="submit">
				<input type="submit" name="us_btn_setup" class="button-primary" value="<?php _e('Create Usersnap account') ?>" />
			</p>
			<script type="text/javascript">
			jQuery('#us-settings-form').submit(function() {
				if ((jQuery('#us-user-pwd').val()==='') || (jQuery('#us-user-pwd').val() !== jQuery('#us-user-pwd2').val())) {
					alert('Your passwords are empty or not equal!');
					return false;
				}
			});
			</script>
			<?php
			break;
		case 'configure':
			do_settings_sections('usersnap');
			?>
			<p class="submit">
				<input type="submit" name="us_btn_save" class="button-primary" value="<?php _e('Save Changes') ?>" />
			</p>
			<?php
			break; 
	}
	?>
	</form>
	</div>
	<?php
}
