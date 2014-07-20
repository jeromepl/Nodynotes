<?php

    include_once('../server_side/mySQL_connection.php');

    if(isset($_POST['action']) && isset($_POST['email_username'])) {
        switch($_POST['action']) {
            case 'email':
                uniqueMail($_POST['email_username']);
            break;
            case 'username':
                uniqueUsername($_POST['email_username']);
            break;
        }
    }

function uniqueMail($email) { //verify if the email is not used by another user
    global $bdd;
    $answer = $bdd->prepare('SELECT COUNT(id) FROM users WHERE email = :email');
    $answer->execute(array('email' => $email)) or die(print_r($bdd->errorInfo()));
    $data = $answer->fetch()[0];
    if($data != 0)
        echo 'false';
    else
        echo 'true';
}

function uniqueUsername($username) { //verify if the username is not used by another user
    global $bdd;
    $answer = $bdd->prepare('SELECT COUNT(id) FROM users WHERE username = :username');
    $answer->execute(array('username' => $username)) or die(print_r($bdd->errorInfo()));
    $data = $answer->fetch()[0];
    if($data != 0)
        echo 'false';
    else
        echo 'true';
}
