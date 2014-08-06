<?php
	try {
		$bdd = new PDO('mysql:host=localhost;dbname=data', 'root', 'H0T_Gu!t@r3');
	} catch(Exception $e) {
		die('Error : '.$e->getMessage());
	}
	$bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	//$bdd can now be used
