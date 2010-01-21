<?php 
/****************************************************
*
* @File: 		resetpassword.php
* @Package:	GetSimple
* @Action:	Resets and then emails a new password 
*						to the admin of the website 	
*
*****************************************************/

	require_once('inc/functions.php');
	require_once('inc/plugin_functions.php');
	$file = 'user.xml';
	$path = tsl('../data/other/');
	if (file_exists($path . $file)) {
		$data = getXML($path . $file);
		$USR = $data->USR;
		$PASSWD = $data->PWD;
		$EMAIL = $data->EMAIL;
	}
	
	if(isset($_POST['submitted'])) {
	if(isset($_POST['email'])) {
		if($_POST['email'] == $EMAIL) {
			
			// create new random password
			$random = createRandomPassword();
			
			// create new users.xml file
			$bakpath = "../backups/other/";
			createBak($file, $path, $bakpath);
			
			$flagfile = "../backups/other/user.xml.reset";
			copy($path . $file, $flagfile);
			
			$xml = @new SimpleXMLElement('<item></item>');
			$xml->addChild('USR', @$USR);
			$xml->addChild('PWD', sha1($random));
			$xml->addChild('EMAIL', @$EMAIL);
			$xml->asXML($path . $file);
	
			// send the email with the new password
			$subject = $site_full_name .' '. $i18n['RESET_PASSWORD'] .' '. $i18n['ATTEMPT'];
			$message = "'". cl($SITENAME) ."' ". $i18n['RESET_PASSWORD'] ." ". $i18n['ATTEMPT'];
			$message .= '<br>-------------------------------------------------------<br>';
			$message .= "<br>". $i18n['LABEL_USERNAME'].": ". $USR;
			$message .= "<br>". $i18n['NEW_PASSWORD'].": ". $random;
			$message .= '<br><br>'. $i18n['EMAIL_LOGIN'] .': <a href="'.$SITEURL.'admin/">'.$SITEURL.'admin/</a>';
			$status = sendmail($EMAIL,$subject,$message);
			exec_action('resetpw-success');
			header("Location: resetpassword.php?upd=pwd-".$status);
		} else {
			exec_action('resetpw-error');
			header("Location: resetpassword.php?upd=pwd-error");
		} 
	}	else {
		header("Location: resetpassword.php?upd=pwd-error");
	}
} 
?>

<?php get_template('header', cl($SITENAME).' &raquo; '.$i18n['RESET_PASSWORD']); ?>
<h1><a href="<?php echo $SITEURL; ?>" target="_blank" ><?php echo cl($SITENAME); ?></a> <span>&raquo;</span> <?php echo $i18n['RESET_PASSWORD']; ?></h1>
</div>
</div>
<div class="wrapper">
	
<?php include('template/error_checking.php'); ?>

<div id="maincontent">
	<div class="main" >
	
	<h3><?php echo $i18n['RESET_PASSWORD']; ?></h3>
	<p><?php echo $i18n['MSG_PLEASE_EMAIL']; ?>.</p>
	
	<form class="fullform" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" accept-charset="utf-8" >
		<p><b><?php echo $i18n['LABEL_EMAIL']; ?>:</b><br /><input class="text" name="email" type="text" value="" /></p>
		<p><input class="submit" type="submit" name="submitted" value="<?php echo $i18n['SEND_NEW_PWD']; ?>" /></p>
	</form><p><a href="index.php"><?php echo $i18n['LOGIN']; ?></a></p>
	</div>
	
</div>

<div class="clear"></div>
<?php get_template('footer'); ?>