<?php
	session_start();
    include_once("server_side/mySQL_connection.php"); //sets up $bdd

    $baseUrl = 'http://localhost/Nodes/';
    $isConnected = false; //to know if it's an anonymous person viewing a public board or a connected one
    $isPublic = false;
    $isCreator = false;

	if(!isset($_SESSION['id'])) {
        $_SESSION['id'] = 0; //Set the id to 0 so that public boards can be accessed without logging in
	}

    if(!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        if($_SESSION['id'] == 0) {//user not logged in
            session_destroy();
            header('Location: ' . $baseUrl . '?er=2'); //tell the user to login first
        }
        else
            header('Location: ' . $baseUrl . 'errors/404.html'); //TODO create the 404 page
    }
    else { //Check if the board specified belongs to the user
        $answer = $bdd->prepare('SELECT b.user_id, b.public
                                FROM access a
                                RIGHT JOIN boards b ON b.id = a.board_id
                                WHERE b.id = :id AND (a.user_id = :user_id OR b.user_id = :user_id2 OR b.public = \'T\')');
        $answer->execute(array('id' => $_GET['id'],
                               'user_id' => $_SESSION['id'],
                               'user_id2' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();
        $answer->closeCursor();
        if(!$data) { //if the board does not belong to the user and is not public
            if($_SESSION['id'] == 0) { //user not logged in
                session_destroy();
                header('Location: ' . $baseUrl . '?er=2&ref_id=' . $_GET['id']); //tell the user to login first
            }
            else { //get the user's last seen board since he can't see this one
                $answer = $bdd->prepare('SELECT last_board FROM users WHERE id = :user_id');
                $answer->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
                $data = $answer->fetch();
                $answer->closeCursor();

                $_GET['id'] = $data['last_board'];
                header('Location: ' . $baseUrl . 'boards/' . $_GET['id']); //TODO tell the user he was redirected because he did not have the right to see the board
            }
        }
        else { //If you get there that means the user has passed all verifications and can see the board
            if($data['public'] == 'T')
                $isPublic = true;
            if($_SESSION['id'] != 0) {
                $isConnected = true;
                if($data['user_id'] == $_SESSION['id'])
                    $isCreator = true;
            }
        }
    }


    include("board.php");
