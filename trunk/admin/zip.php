<?php
/****************************************************
*
* @File: 		zip.php
* @Package:	GetSimple
* @Action:	Creates an archive for the website 	
*
*****************************************************/

// Setup inclusions
$load['plugin'] = true;

// Relative
$relative = '../';

// Include common.php
include('inc/common.php');

		require_once('inc/zip.class.php');
		
		$zipfile = new zipfile();
		$timestamp = date('Y-m-d-Hi');
		ini_set("memory_limit","600M"); 
		
		// paths and files to backup
		$paths = array(GSROOTPATH. 'data', GSROOTPATH. 'theme'); //no trailing slash
		$files = array(GSROOTPATH. '.htaccess', GSROOTPATH. 'index.php');	
		
		// cycle thru each path and file and add to zip file
		foreach ($paths as $path) 
		{
			$dir_handle = @opendir($path) or die("Unable to open $path");
			ListDir($dir_handle,$path);
		}
		
		foreach ($files as $fl) 
		{
			$filedata = file_get_contents($fl);
			$zipfile->add_file($filedata, $fl);
		}
		
		// $listing is the list of all files and folders that were added to the backup
		//echo $listing;

		// create the final zip file
		$file = $relative. 'backups/zip/'. $timestamp .'_archive.zip';
		$fh = fopen($file, 'w') or die('Could not open file for writing!');	
	
		fwrite($fh, $zipfile->file()) or die('Could not write to file');
		fclose($fh);
		
		// redirect back to archive page with a success
		header('Location: archive.php?done');
?> 