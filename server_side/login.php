<?php //check if email matches password

    session_start();
	include_once("mySQL_connection.php"); //where $bdd is set
    include_once("settings.php");

	if(isset($_POST['email_username']) && isset($_POST['password'])) {

        if(strpos($_POST['email_username'],'@') !== false) { //The user used his email adress to connect
            $req = $bdd->prepare('SELECT id, username FROM users WHERE email = :email AND password = :password');
            $req->execute(array('email' => $_POST['email_username'],
                                'password' => crypt($_POST['password'], $salt)));
            $answer = $req->fetch();

            $req->closeCursor();

            if(!$answer) {       
                // Legacy support for really old accounts with passwords hashed with Sha1:
                // TODO ask these users to enter a new password
                
                $req = $bdd->prepare('SELECT id, username FROM users WHERE email = :email AND password = :password');
                $req->execute(array('email' => $_POST['email_username'],
                                    'password' => sha1("1996j" . $_POST['password'] . "pl42")));
                $answer = $req->fetch();

                $req->closeCursor();

                if(!$answer) {
                    header('Location: ../?er=1'); //tell the user email-password doesn't work
                }
                else {
                    login($answer);
                }
            }
            else {
                login($answer);
            }
		}
        else { //The user used his username to connect
            $req = $bdd->prepare('SELECT id, username FROM users WHERE username = :username AND password = :password');
            $req->execute(array('username' => $_POST['email_username'],
                                'password' => crypt($_POST['password'], $salt)));
            $answer = $req->fetch();

            $req->closeCursor();

            if(!$answer) {       
                // Legacy support for really old accounts with passwords hashed with Sha1:
                
                $req = $bdd->prepare('SELECT id, username FROM users WHERE username = :username AND password = :password');
                $req->execute(array('username' => $_POST['email_username'],
                                    'password' => sha1("1996j" . $_POST['password'] . "pl42")));
                $answer = $req->fetch();

                $req->closeCursor();

                if(!$answer) {
                    header('Location: ../?er=1'); //tell the user email-password doesn't work
                }
                else {
                    login($answer);
                }
            }
            else {
                login($answer);
            }
        }
	}
	else header('Location: ../?er=3'); //tell the user an error occured

function login(&$answer) {
    global $bdd;
    $_SESSION['id'] = $answer['id'];
    $_SESSION['username'] = $answer['username']; //no need to strip tags usernames since '<' and '>' cannot be used in usernames

    //increment login count and set last ip and last login date
    $req = $bdd->prepare('UPDATE users
                                    SET ip_last = :ip, date_last = NOW(), logins = logins + 1
                                    WHERE id = :id');
    $req->execute(array('ip' => $_SERVER['REMOTE_ADDR'],
                        'id' => $_SESSION['id']));

    if(isset($_GET['ref_id']) && is_numeric($_GET['ref_id'])) {
        header('Location: ../board/' . $_GET['ref_id']);
    }
    else {

        $req = $bdd->prepare('SELECT last_board FROM users WHERE id = :user_id');
        $req->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
        $data = $req->fetch();
        $req->closeCursor();

        header('Location: ../board/' . $data['last_board']);
    }
}
