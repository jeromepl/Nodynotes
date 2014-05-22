<?php
	try {
		$bdd = new PDO('mysql:host=sql202.olikeopen.com;dbname=olope_13798203_data', 'olope_13798203', '05qms89h');
	} catch(Exception $e) {
		die('Error : '.$e->getMessage());
	}
	$bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	//$bdd can now be used