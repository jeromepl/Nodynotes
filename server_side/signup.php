<?php
    include_once('../server_side/mySQL_connection.php');
    session_start();

    if(isset($_POST['name_first']) && isset($_POST['name_last']) && isset($_POST['email']) && isset($_POST['password'])
       && preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $_POST['email'])
       && preg_match("#^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]+$#", $_POST['name_first']) && preg_match("#^[A-Za-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ -]+$#", $_POST['name_last'])
       && strlen($_POST['password']) >= 6) {
        if(uniqueMail($_POST['email'])) {

            $req = $bdd->prepare('INSERT INTO users(id, email, password, name_first, name_last, date_creation, date_last, ip_creation, ip_last, views, last_board)
                                    VALUES(\'\', :email, :pass, :namef, :namel, NOW(), NOW(), :ip1, :ip2, 0, 0)');
            $req->execute(array('email' => $_POST['email'],
                                'pass' => sha1("1996j" . $_POST['password'] . "pl42"),
                                'namef' => trim($_POST['name_first']),
                                'namel' => trim($_POST['name_last']),
                                'ip1' => $_SERVER['REMOTE_ADDR'],
                                'ip2' => $_SERVER['REMOTE_ADDR']));

            $_SESSION['id'] = $bdd->lastInsertId();
            $_SESSION['name_first'] = strip_tags($_POST['name_first']);
            $_SESSION['name_last'] = strip_tags($_POST['name_last']);

            //Create a demo board
            $req = $bdd->prepare('INSERT INTO boards(id, user_id, title, xPos, yPos, date_creation, date_seen, views, ip_creation)
									VALUES(\'\', :user_id, \'Demo\', 0, 0, NOW(), NOW(), 0, :ip)');
            $req->execute(array('user_id' => $_SESSION['id'],
                                'ip' => $_SERVER['REMOTE_ADDR']));
            $newBoard = $bdd->lastInsertId();

            $req = $bdd->prepare('INSERT INTO nodes(id, board_id, title, text, xPos, yPos, color, icon, date_creation, date_update, ip_creation)
								    VALUES(\'\', :boardId, \'Welcome to Nodynotes\', "To get started, click the \"+\" sign in the toolbar on the right and create a new node.<br>You can then edit that node with the toolbar that will appear over it.<br>To create a new board, click on the vertical \"Board\" on the left of your screen and then on the \"+\" sign on the top right of the window that will open.<br>You can put your mouse over all icons in toolbars to know their use.<br><br>That\'s all!<br>Enjoy note-taking on Nodynotes!", 500, 500, \'00D7DD\', \'none\', NOW(), NOW(), :ip)');
            $req->execute(array('boardId' => $newBoard,
                                'ip' => $_SERVER['REMOTE_ADDR']));
            $newNode = $bdd->lastInsertId();

            header('Location: ../board.php?id=' . $newBoard . '&node_id=' . $newNode); //This will save the new board as the last seen one
        }
        else
            header('Location: ../home.php?er=4'); //Email already used
    }
    else
        header('Location: ../home.php?er=5');

    function uniqueMail($email) { //verify if the email is not used by another user
        global $bdd;
        $answer = $bdd->prepare('SELECT COUNT(id) FROM users WHERE email = :email');
        $answer->execute(array('email' => $email)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch()[0];
        if($data != 0)
            return false;
        else
            return true;
    }
