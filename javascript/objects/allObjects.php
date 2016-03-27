<?php

header("Content-Type: application/javascript");

/*
This file helps to increase the download speed of the page:
Instead of downloading all the following files individually, download them all as one big file
*/

include("Board.js");
include("Node.js");
include("TextNode.js");
include("Subtitle.js");
include("Tag.js");
include("Linkbar.js");
include("ContentShower.js");
include("BoardToolbar.js");
include("NodeToolbar.js");
include("Tool.js");
include("Saver.js");
include("Search.js");

//Tools
include("nodeTools/AddSubtitle.js");
include("nodeTools/DeleteNode.js");
include("nodeTools/ChangeColor.js");
include("nodeTools/ChangeIcon.js");
include("nodeTools/ManageTags.js");

include("boardTools/MoveTool.js");
include("boardTools/DeleteTool.js");
include("boardTools/LinkTool.js");
include("boardTools/AddNode.js");
include("boardTools/Undo.js");
include("boardTools/BoardProperties.js");
