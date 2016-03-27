<?php
    $baseUrl = "http://localhost/Nodes/";

    session_start();

    include_once("server_side/mySQL_connection.php"); //sets up $bdd
    include_once("model/board.php");

    if(!isset($_GET['id']))
       header('Location: ' . $baseUrl . 'errors/404.html'); //TODO create the 404 page

    $connected = isset($_SESSION['id']);
    $public = isPublic($_GET['id']);

    $creator = false;
    $sharedWith = false;
    if($connected) {
        $creator = isCreator($_GET['id'], $_SESSION['id']);
        $sharedWith = isSharedWith($_GET['id'], $_SESSION['id']);
    }

    $board_info = getBoardInfo($_GET['id']);

    include("view/board.php"); //Include the view
