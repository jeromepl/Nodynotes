<?php
    function isPublic($board_id) {
        global $bdd;

        $answer = $bdd->prepare('SELECT public
                                FROM boards
                                WHERE id = :board_id');
        $answer->execute(array('board_id' => $board_id)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();
        $answer->closeCursor();

        if($data['public'] == 'T')
            return true;
        else
            return false;
    }

    function isSharedWith($board_id, $user_id) {
        global $bdd;

        $answer = $bdd->prepare('SELECT b.id
                                FROM access a
                                RIGHT JOIN boards b ON b.id = a.board_id
                                WHERE b.id = :board_id AND a.user_id = :user_id');
        $answer->execute(array('board_id' => $board_id,
                               'user_id' => $user_id)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();
        $answer->closeCursor();

        if($data)
            return true;
        else
            return false;
    }

    function isCreator($board_id, $user_id) {
        global $bdd;

        $answer = $bdd->prepare('SELECT id
                                FROM boards
                                WHERE id = :board_id AND user_id = :user_id');
        $answer->execute(array('board_id' => $board_id,
                               'user_id' => $user_id)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();
        $answer->closeCursor();

        if($data)
            return true;
        else
            return false;
    }

    function getBoardInfo($board_id) {
        global $bdd;
        $info = array();

        $answer = $bdd->prepare('SELECT b.id, u.username, b.title, b.date_creation
                                FROM boards b
                                RIGHT JOIN users u ON b.user_id = u.id
                                WHERE b.id = :board_id');
        $answer->execute(array('board_id' => $board_id)) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();
        $answer->closeCursor();

        if($data)
            $info = $data;

        return $info;
    }
