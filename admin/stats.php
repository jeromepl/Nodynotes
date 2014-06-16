<?php
    include_once('../server_side/mySQL_connection.php');

    $answer = $bdd->prepare('SELECT COUNT(id) FROM users');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " users<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM boards');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " boards<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " nodes<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM subtitles');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " subtitles<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM linkbars');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " linkbars<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM tags');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " tags<br>";
