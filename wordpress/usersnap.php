<?php
/*
Plugin Name: Usersnap
Plugin URI: http://www.usersnap.com
Description: Usersnap helps website owners to get feedback in form of screeenshots from their customers, readers or users.
Version: 3.2
Author: Usersnap
Author URI: http://usersnap.com
License: GPL v2
*/

define('USERSNAP_VERSION', '3.2');
define('USERSNAP_PLUGIN_URL', plugin_dir_url( __FILE__ ));

if ( is_admin() ){ // admin actions
  add_action( 'admin_init', 'us_register_settings' );
  add_action( 'admin_menu', 'us_plugin_menu' );
} else {
	add_action('wp_head', 'us_add_js');
}

function us_add_js() {
	$options = get_option('usersnap_options');
	//check if we should display usersnap
	$dispUS = false;
	if (isset($options['api-key']) && strlen($options['api-key'])>0) {
		if (!isset($options['visible-for'])) {
			$options['visible-for']="all";
		}
		if ($options['visible-for']=="users") {
			if (is_user_logged_in()) {
				$dispUS = true;
			}
		} else if ($options['visible-for']=="roles") {	
			if ( is_user_logged_in() ) {
				$user = new WP_User(get_current_user_id());
				if (!empty($user->roles) && is_array($user->roles)) {
					foreach($user->roles as $role ) {
						if ($dispUS) {
							break;
						}
						foreach($options['visible-for-roles'] as $chrole) {
							if ($chrole == $role) {
								$dispUS = true;
							}
						}
					}
				}
			}
		} else {
			$dispUS = true;
		}
	}

	if ($dispUS) {
		?>
		<script type="text/javascript" data-cfasync="false">
			(function() {
			    var s = document.createElement('script');
			    s.type = 'text/javascript';
			    s.async = true;
			    s.src = '//api.usersnap.com/load/<?php echo $options['api-key']; ?>.js';
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
	add_settings_field('us-api-key', 'Enter your Usersnap API key', 'usersnap_input_text', 'usersnap', 'usersnap_main');
	
	//page usersnap_pg_new
	add_settings_section('usersnap_new', 'Create your Usersnap account', 'usersnap_section_new', 'usersnap_pg_new');
	add_settings_field('us-user-email', 'Your email', 'usersnap_input_user_email', 'usersnap_pg_new', 'usersnap_new');
	add_settings_field('us-user-url', 'Blog URL', 'usersnap_input_user_url', 'usersnap_pg_new', 'usersnap_new');
	add_settings_field('us-user-pwd', 'Choose a password', 'usersnap_input_user_pwd', 'usersnap_pg_new', 'usersnap_new');
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
               <div class="us-box">Manage and configure the button theme and settings on your <a href="https://usersnap.com/apikeys" target="_blank">Usersnap site configuration</a>.</div>  
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
               <div class="us-box">Screenshots of your WordPress site will help you improve your site and communicate with your readers. Promised.<br/><a href="https://usersnap.com/wordpress?gat=wpplugin" target="_blank">Learn more about Usersnap here</a></div>  
            </td>
		</tr>
	</table>
	<?php
}

function usersnap_input_text() {
	$options = get_option('usersnap_options');
	$key = "";
	if (isset($options['api-key'])) {
		$key = $options['api-key'];
	}
	?><input id="us-api-key" style="width:300px;" name="usersnap_options[api-key]" size="40" type="text" value="<?php echo $key; ?>" /><?php
	if (strlen($key) > 0) {
		?>&nbsp;<a href="https://usersnap.com/configurator/v2?key=<?php echo $key; ?>" target="_blank">configure</a><?php
	}
}

function usersnap_options_validate($input) {
	if (!isset($input["usersnap-api-requ"])) {
		$input["usersnap-api-requ"] = false;
	}
	$input["message"] = "";
	$input["error"] = false;
	if (isset($_POST['us_setup']) && ($input["usersnap-api-requ"] !== true)) {
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

function us_create_visibility_form() {
	$options = get_option('usersnap_options');
	if (!isset($options['visible-for'])) {
		$options['visible-for']="all";
	}
	if (!isset($options['visible-for-roles'])) {
		$options['visible-for-roles']=array();
	}
	?>
	<table class="form-table">
		<tr>
		<th colspan="2">
               Enable Usersnap for:
		</th>
		</tr>
		<tr>
		  <td width="20"><input type="radio" <?php echo ($options['visible-for']=="all"?"checked":"")?> name="usersnap_options[visible-for]" value="all" id="us-visible-for-all"/></td>
		  <td><label for="us-visible-for-all">All Visitors</label></td>
		</tr>
		<tr>
		  <td width="20"><input type="radio" <?php echo ($options['visible-for']=="users"?"checked":"")?> name="usersnap_options[visible-for]" value="users" id="us-visible-for-users"/></td>
		  <td><label for="us-visible-for-users">Only users who are signed in</label></td>
		</tr>
		<tr>
		  <td width="20"><input type="radio" <?php echo ($options['visible-for']=="roles"?"checked":"")?> name="usersnap_options[visible-for]" value="roles" id="us-visible-for-roles"/></td>
		  <td><label for="us-visible-for-roles">Only users with a specific role</label></td>
		</tr>
		<tr id="us-visible-roles">
		  <td width="20"></td>
		  <td>
		<table class="form-table">
		<?php
		$wp_roles = new WP_Roles();
		$roles = $wp_roles->get_names();
		$ctn = 0;
		$check = false;
	 
		foreach ($roles as $role_value => $role_name) {
			$check = false;
			foreach($options['visible-for-roles'] as $lurole) {
				if ($lurole === $role_value) {
					$check = true;
					break;
				}
			}
			?>
			<tr>
			  <td width="20"><input type="checkbox" <?php echo ($check?"checked":"")?> name="usersnap_options[visible-for-roles][]" value="<?php echo $role_value; ?>" id="us-visible-for-role-<?php echo $ctn;?>"/></td>
			  <td><label for="us-visible-for-role-<?php echo $ctn;?>"><?php echo $role_name; ?></label></td>
			</tr>
			<?php
			$ctn++;
	  	}
		?>
		</table>
		  </td>
		</tr>
	</table>
	<script type="text/javascript">
	jQuery(function() {
		jQuery('#us-settings-form input[type=radio]').change(function() {
			var radio = jQuery('#us-visible-for-roles');
			if (radio.is(':checked')) {
				jQuery('#us-visible-roles').show();
			} else {
				jQuery('#us-visible-roles').hide();
			}
		});
		var radio = jQuery('#us-visible-for-roles');
		if (radio.is(':checked')) {
			jQuery('#us-visible-roles').show();
		}
	});
	</script>
	<?php
}


function us_option_page() {
	if (!current_user_can('administrator'))  {
		wp_die( __('You do not have sufficient permissions to access this page.') );
	}
	$options = get_option('usersnap_options');
	$tabs = array();
	if (isset($options['api-key']) && strlen($options['api-key'])>0) {
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
	<?php
	switch($currenttab) {
		case 'newusersnap':
			?>
			<h3>Already have a Usersnap account?</h3>
			<p>Click the configure tab above.</p>
			<?php
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
				<input type="hidden" name="us_setup" value="true"/>
				<input type="submit" id="us-btn-setup" name="us_btn_setup" class="button-primary" value="<?php _e('Create Usersnap account') ?>" />
			</p>
			<script type="text/javascript">
			jQuery('#us-settings-form').submit(function(form) {
				if ((jQuery('#us-user-pwd').val()==='') || (jQuery('#us-user-pwd').val() !== jQuery('#us-user-pwd2').val())) {
					alert('<?php _e('Your passwords are empty or not equal!') ?>');
					return false;
				}
				jQuery('#us-btn-setup').attr("disabled", true).val("<?php _e('Please wait...') ?>");
			});
			</script>
			<?php
			break;
		case 'configure':
			do_settings_sections('usersnap');
			us_create_visibility_form();
			?>
			<p class="submit">
				<input type="submit" id="us-btn-save" name="us_btn_save" class="button-primary" value="<?php _e('Save Changes') ?>" />
				<input type="button" class="button" id="us-reset-settings" value="<?php _e('Reset Settings') ?>" />
			</p>
			<script type="text/javascript">
			jQuery(function() {
				jQuery('#us-settings-form').submit(function() {
					if (jQuery('#us-api-key').val()!=='') {
						var s = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
						if (!s.test(jQuery('#us-api-key').val())) {
							jQuery('#us-api-key').focus();
							alert('<?php _e('Your API key is not valid, please check again!') ?>');
							return false;
						}
					}
				});

				jQuery('#us-reset-settings').click(function() {
					jQuery('#us-api-key').val('');
					jQuery('#us-visible-for-all').attr('checked',true);
					jQuery('#us-visible-roles').hide();
					jQuery('#us-btn-save').click();
				});
			});
			</script>
			<?php
			break; 
	}
	?>
	</form>
	</div>
	<?php
}
