<?php
    include_once('../server_side/mySQL_connection.php');

    $nb = 0;

    $answer = $bdd->prepare('DELETE FROM boards
                            WHERE user_id
                            NOT IN (
                                SELECT id
                                FROM users
                            )');
    $nb = $answer->execute() or die(print_r($bdd->errorInfo()));
    print $nb . " boards deleted<br>";
    $nb = 0;

    $answer = $bdd->prepare('DELETE FROM nodes
                            WHERE board_id
                            NOT IN (
                                SELECT id
                                FROM boards
                            )');
    $nb = $answer->execute() or die(print_r($bdd->errorInfo()));
    print $nb . " nodes deleted<br>";
    $nb = 0;

    $answer = $bdd->prepare('DELETE FROM subtitles
                            WHERE node_id
                            NOT IN (
                                SELECT id
                                FROM nodes
                            )');
    $nb = $answer->execute() or die(print_r($bdd->errorInfo()));
    print $nb . " subtitles deleted<br>";
    $nb = 0;

    $answer = $bdd->prepare('DELETE FROM linkbars
                            WHERE node1_id
                            NOT IN (
                                SELECT id
                                FROM nodes
                            )
                            OR node2_id
                            NOT IN (
                                SELECT id
                                FROM nodes
                            )');
    $nb = $answer->execute() or die(print_r($bdd->errorInfo()));
    print $nb . " linkbars deleted<br>";
    $nb = 0;

    $answer = $bdd->prepare('DELETE FROM tags
                            WHERE node_id
                            NOT IN (
                                SELECT id
                                FROM nodes
                            )');
    $nb = $answer->execute() or die(print_r($bdd->errorInfo()));
    print $nb . " tags deleted<br>";
