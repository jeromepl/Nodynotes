<?php //check if email matches password

	include("mySQL_connection.php"); //where $bdd is set
	session_start(); //start session

	if(isset($_POST['email']) && isset($_POST['password'])) {

		$req = $bdd->prepare('SELECT id, name_first, name_last FROM users WHERE email = :email AND password = :password');
		$req->execute(array(
			'email' => $_POST['email'],
			'password' => sha1($_POST['password']))); //TODO Need to salt passwords
		$answer = $req->fetch();

		$req->closeCursor();

		if(!$answer) {
			header('Location: ../home.php?er=1'); //tell ther user email-password doesn't work
		}
		else {
			$_SESSION['id'] = $answer['id'];
			$_SESSION['name_first'] = strip_tags($answer['name_first']);
			$_SESSION['name_last'] = strip_tags($answer['name_last']);
            if(isset($_GET['ref_id'])) {
                header('Location: ../board.php?id=' . $_GET['ref_id']);
            }
            else {
                header('Location: ../board.php');
            }
		}
	}
	else header('Location: ../home.php?er=3'); //tell the user an error occured
