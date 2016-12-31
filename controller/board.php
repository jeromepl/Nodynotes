<?php
    session_start();

    include_once("server_side/mySQL_connection.php"); //sets up $bdd
    include_once("server_side/settings.php");
    include_once("model/board.php");

    if(!isset($_GET['node_id']))
        $_GET['node_id'] = 0;

    $connected = isset($_SESSION['id']);
    $public = isPublic($_GET['id']);

    $creator = false;
    $sharedWith = false;
    if($connected) {
        $creator = isCreator($_GET['id'], $_SESSION['id']);
        $sharedWith = isSharedWith($_GET['id'], $_SESSION['id']);
    }

    $board_info = getBoardInfo($_GET['id']);
    
    // Check if the board exists, otherwise redirect to a 404 page
    if(count($board_info) == 0) {
        header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
        include('errors/404.html');
    }
    else {
        include("view/board.php"); //Include the view
    }
