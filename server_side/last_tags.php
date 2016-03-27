<?php

    include_once("mySQL_connection.php"); //where $bdd is set
	session_start();
    header('Content-Type: application/json');

    $last_tags = array();

    //No need to handle if the user is not connected since if he's not connected, he can't see his last used tags

    if(isset($_SESSION['id']) && is_numeric($_SESSION['id']) && isset($_GET['query'])) {

        $answer = $bdd->prepare('SELECT DISTINCT(t.title)
                                FROM tags t
                                INNER JOIN nodes n ON n.id = t.node_id
                                INNER JOIN boards b ON b.id = n.board_id
                                WHERE b.user_id = :user_id AND t.title LIKE :query
                                ORDER BY t.date_creation DESC
                                LIMIT 4');
        $answer->execute(array('user_id' => $_SESSION['id'],
                              'query' => $_GET['query'] . "%")) or die(print_r($bdd->errorInfo()));
        while($data = $answer->fetch()) {
            $last_tags[] = $data['title'];
        }
        $answer->closeCursor();

    }

    echo json_encode($last_tags);
