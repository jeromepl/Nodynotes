<?php
    $baseUrl = "http://localhost/Nodes/";

    session_start();

    include_once("server_side/mySQL_connection.php"); //sets up $bdd
    include_once("model/explorer.php");

    if(!isset($_SESSION['id']))
        header('Location: ' . $baseUrl); //Go back to home page if user isn't connected


    $boards = getBoards();
    include("view/explorer.php"); //Include the view

