<?php
    function getBoards() {
        global $bdd; //$bdd is set in controller

        $boards = array();

        if(isset($_SESSION['id'])) {
            $req = $bdd->prepare("SELECT id, title, public
                                    FROM boards
                                    WHERE user_id = :userId");
            $req->execute(array('userId' => $_SESSION['id']));

            $i = 0;
            while($data = $req->fetch()) {
                $boards[$i] = array();
                $boards[$i]['id'] = $data['id'];
                $boards[$i]['title'] = $data['title'];
                $boards[$i]['public'] = ($data['public'] == 'T')? 'public': 'private';
                $i++;
            }

            $req->closeCursor();
        }

        return $boards;
    }
