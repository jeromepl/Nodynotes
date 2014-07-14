<?php //check if email matches password

	include("mySQL_connection.php"); //where $bdd is set
	session_start(); //start session

	if(isset($_POST['email']) && isset($_POST['password'])) {

		$req = $bdd->prepare('SELECT id, name_first, name_last FROM users WHERE email = :email AND password = :password');
		$req->execute(array(
			'email' => $_POST['email'],
            'password' => sha1("1996j" . $_POST['password'] . "pl42")));
		$answer = $req->fetch();

		$req->closeCursor();

		if(!$answer) {
			header('Location: ../home.php?er=1'); //tell ther user email-password doesn't work
		}
		else {
			$_SESSION['id'] = $answer['id'];
			$_SESSION['name_first'] = strip_tags($answer['name_first']);
			$_SESSION['name_last'] = strip_tags($answer['name_last']);

            //increment login count and set last ip and last login date
            $req = $bdd->prepare('UPDATE users
                                SET ip_last = :ip, date_last = NOW(), logins = logins + 1
                                WHERE id = :id');
            $req->execute(array('ip' => $_SERVER['REMOTE_ADDR'],
                                'id' => $_SESSION['id']));

            if(isset($_GET['ref_id']) && is_numeric($_GET['ref_id'])) {
                header('Location: ../board.php?id=' . $_GET['ref_id']);
            }
            else {
                header('Location: ../board.php');
            }
		}
	}
	else header('Location: ../home.php?er=3'); //tell the user an error occured
