<?php
    
    // Summary of errors:
    // LOGIN:
    // 1: Invalid email/username or password
    // 2: Please login first
    // 3: General error occured (missing or wrong POST parameters)
    // SIGNUP:
    // 4: Email already used
    // 5: General error occured (missing or wrong POST parameters)
    // 6: Username already used

    // Rules for password:
    // At least 6 characters
    // Rules for username:
    // 4 to 15 characters, letters (upper or lower case), numbers, underscore or dot

    session_start();
    include_once('mySQL_connection.php');
    include_once('settings.php');

    if(isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])
       && preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $_POST['email'])
       && preg_match("#^[A-Za-z0-9_.]{4,15}$#", $_POST['username']) && strlen($_POST['password']) >= 6) {

        if(uniqueMail($_POST['email'])) {
            if(uniqueUsername($_POST['username'])) {

                $req = $bdd->prepare('INSERT INTO users(email, password, username, date_creation, date_last, ip_creation, ip_last, logins, views, last_board)
                                        VALUES(:email, :pass, :username, NOW(), NOW(), :ip1, :ip2, 0, 0, 0)');
                $req->execute(array('email' => $_POST['email'],
                                    'pass' => crypt($_POST['password'], $salt),
                                    'username' => trim($_POST['username']),
                                    'ip1' => $_SERVER['REMOTE_ADDR'],
                                    'ip2' => $_SERVER['REMOTE_ADDR']));

                $_SESSION['id'] = $bdd->lastInsertId();
                $_SESSION['username'] = $_POST['username']; //no need to strip tags usernames since '<' and '>' cannot be used in usernames

                //Create a demo board
                $req = $bdd->prepare('INSERT INTO boards(user_id, title, xPos, yPos, date_creation, date_seen, views, ip_creation, public)
									   VALUES(:user_id, \'Demo\', 0, 0, NOW(), NOW(), 0, :ip, \'F\')');
                $req->execute(array('user_id' => $_SESSION['id'],
                                    'ip' => $_SERVER['REMOTE_ADDR']));
                $newBoard = $bdd->lastInsertId();

                $req = $bdd->prepare('INSERT INTO nodes(board_id, title, text, xPos, yPos, color, icon, date_creation, date_update, ip_creation)
								        VALUES(:boardId, \'Welcome to Nodynotes\', "To get started, click the \"+\" sign in the toolbar on the right and create a new Node.<br>You can then edit that Node with the toolbar that will appear over it.<br>To create a new board, visit the \"Your Boards\" page by clicking on the icon in the top-right section of your screen.<br>You can put your mouse over all icons in toolbars to see their name.<br><br>Visit http://www.nodynotes.com/board/demo for a more complete overview of Nodynotes!<br><br>That\'s all!<br>Enjoy note-taking on Nodynotes!", 500, 500, \'00D7DD\', \'none\', NOW(), NOW(), :ip)');
                $req->execute(array('boardId' => $newBoard,
                                    'ip' => $_SERVER['REMOTE_ADDR']));
                $newNode = $bdd->lastInsertId();

                header('Location: ../board/' . $newBoard . '&node_id=' . $newNode); //This will save the new board as the last seen one
            }
            else
                header('Location: ../?er=6'); //Username already used
        }
        else
            header('Location: ../?er=4'); //Email already used
    }
    else
        header('Location: ../?er=5');

    function uniqueMail($email) { //verify if the email is not used by another user
        global $bdd;
        $answer = $bdd->prepare('SELECT COUNT(id) FROM users WHERE email = :email');
        $answer->execute(array('email' => $email)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch()[0];
        $answer->closeCursor();
        if($data != 0)
            return false;
        else
            return true;
    }

    function uniqueUsername($username) { //verify if the username is not used by another user
        global $bdd;
        $answer = $bdd->prepare('SELECT COUNT(id) FROM users WHERE username = :username');
        $answer->execute(array('username' => $username)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch()[0];
        $answer->closeCursor();
        if($data != 0)
            return false;
        else
            return true;
    }
