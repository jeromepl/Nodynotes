<?php
    include_once('../server_side/mySQL_connection.php');

    print "<strong>General:</strong><br>";

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

    print "<br><strong>Colors:</strong><br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'22ff22\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " lime<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'ffff00\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " yellow<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'ffa500\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " orange<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'fb001a\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " red<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'e500d9\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " fuchsia<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'9900ff\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " purple<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'4140e1\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " blue<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'00d7dd\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " cyan<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'7e2b02\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " brown<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'ffffff\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " white<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'555555\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " grey<br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE color=\'000000\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " black<br>";

    print "<br><strong>Icons:</strong><br>";

    $answer = $bdd->prepare('SELECT COUNT(id) FROM nodes WHERE icon != \'none\'');
    $answer->execute() or die(print_r($bdd->errorInfo()));
    print $answer->fetch()[0] . " nodes have an icon<br>";
