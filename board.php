<?php
	session_start();
	if(!isset($_SESSION['id'])) {
		header('Location: home.php?er=2'); //tell the user to login first
	}
	
	include_once("server_side/mySQL_connection.php"); //where $bdd is set

    //setup for the global variable board_id
    if(!isset($_GET['id']) || !is_numeric($_GET['id'])) { //get the last seen board
        $answer = $bdd->prepare('SELECT last_board FROM users WHERE id = :user_id');
        $answer->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();

        $_GET['id'] = $data['last_board'];
    }
?>
<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
		<title>Nody Notes - Learn and never forget again</title>
        <link rel="SHORTCUT ICON" href="images/shortcut_icon.png">
        <link rel="stylesheet" type="text/css" href="styles/nodeStyle.css"/>
        <link rel="stylesheet" type="text/css" href="styles/toolbarStyle.css"/>
        <link rel="stylesheet" type="text/css" href="styles/headerStyle.css"/>
        <link rel="stylesheet" type="text/css" href="styles/sidebarStyle.css"/>
        <link rel="stylesheet" type="text/css" href="styles/iconicStyle.css"/>
        <!--[if lte IE 9]>
            <script>window.onload = function() {document.body.innerHTML = '<p>Your browser is too old for this website. Please download the latest version of Internet Explorer <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">here</a>.</p>'
            };</script>
        <![endif]-->
        
        <script src="http://use.edgefonts.net/asap.js"></script>
	</head>

	<body>
    	<header>
        	<div id='head_container'>
                <div id='head_right'> <!-- Head right must go first to prevent display anomalies due to the float functionality -->
                    <a id='disconnect' href="server_side/disconnect.php">Disconnect</a>
                </div>
                <div id='head_left'>
        		  <a id='link_home' href="home.php">Nody Notes</a>
                    <div id="head_friends" class="head_icon"><img data-src="images/icons/person.svg" class="iconic iconic-md" data-gender="genderless"></div>
                </div>
                <div id='head_middle'>
                    <div id='search'>
                        <input type='text' placeholder="Find something" />
                        <div id='search_results'>
                            <h4 id='search_noResults'>No results found</h4>
                        </div>
                        <div id='head_search' class='head_icon'><img data-src="images/icons/magnifying-glass.svg" class="iconic iconic-md"></div>
                    </div>
                </div>
            </div>
        </header>
        <div id='nodesContainer'>
            <div id='nodesArea'>
                <div id='showContent'>
                    <div id='content_title'>
                        <h1></h1>
                        <input type='text' />
                    </div>
                    <div id='content_text'>
                        <p></p>
                        <textarea></textarea>
                    </div>
                    
                    <img src="images/pointer.png" id="pointer" class="pointerRight" draggable = "false">
                    <div id='changeContent'>
                        <img data-src="images/icons/pencil.svg" id='changeContentButton' class="iconic iconic-md" title="Edit">
                        <img data-src="images/icons/circle-check.svg" id="changeContent_change" class="iconic iconic-md" title="Apply">
                        <img data-src="images/icons/circle-x.svg" id="changeContent_cancel" class="iconic iconic-md" title="Cancel">
                    </div>
                </div>
                <div id='fakeLink' class='linkBar' style="display: none; z-index: 1;"></div>
                <div id='overlay_linkDel' style="display: none; z-index: 1;"></div>
                <div id='overlay_nodeDel'>
                	<div id='overlay_titleDel'></div>
                    <!-- Up to 5 subtitles -->
                    <div class='overlay_subDel'></div>
                    <div class='overlay_subDel'></div>
                   	<div class='overlay_subDel'></div>
                    <div class='overlay_subDel'></div>
                    <div class='overlay_subDel'></div>
                </div>
                <div id='overlay_subDelSingle' class='overlay_subDel'></div>
            </div>
            <div id='toolbar2'>
                <!-- Everything is placed in a div, otherwise the border is not correctly shown with the SVGs -->
            	<div id='tool2_img_1' class="tool2_icon" title='Add Subtitle'><img data-src="images/icons/plus.svg" class='iconic iconic-md'></div>
            	<div id='tool2_img_2' class="tool2_icon" title='Delete Node'><img data-src="images/icons/x.svg" class='iconic iconic-md'></div>
            	<div id='tool2_img_3' class="tool2_icon" title='Change Color'><img data-src="images/icons/brush.svg" class='iconic iconic-md'></div>
            	<div id='tool2_img_4' class="tool2_icon" title='Change Icon'><img data-src="images/icons/image.svg" class='iconic iconic-md' data-orientation="landscape"></div>
                <div id='tool2_img_5' class="tool2_icon" title='Inputs/Outputs'><img data-src="images/icons/transfer.svg" class='iconic iconic-md'></div>
            	<div id='tool2_img_6' class="tool2_icon" title='Manage Tags'><img data-src="images/icons/tags.svg" class='iconic iconic-md'></div>
            	<div id='tool2_img_7' class="tool2_icon" title='Sublink'><img data-src="images/icons/ellipses.svg" class='iconic iconic-md'></div>
                
                <div id='colorChoices'>
                    <div class='colorBox' style='background-color: #FB001A;'></div>
                    <div class='colorBox' style='background-color: #E500D9;'></div>
                    <div class='colorBox' style='background-color: #90F;'></div>
                    <div class='colorBox' style='background-color: #4140E1;'></div>
                    <div class='colorBox' style='background-color: #00D7DD;'></div>
                    <div class='colorBox' style='background-color: #2F2;'></div>
                    <div class='colorBox' style='background-color: #FF0;'></div>
                    <div class='colorBox' style='background-color: #FFA500;'></div>
                    <div class='colorBox' style='background-color: #7E2B02;'></div>
                    <div class='colorBox' style='background-color: #FFF;'></div>
                    <div class='colorBox' style='background-color: #555;'></div>
                    <div class='colorBox' style='background-color: #000;'></div>
                    
                    <img src="images/pointer-grey.png" draggable = "false">
                </div>

                <div id='tag_box'>
                	<div id='tag_form'>
                		<input type='text' id='tag_name' />
                    	<div id='add_tag'>Add tag</div>
                    </div>
                    <div id='all_tags'></div>
                    <img src="images/pointer-grey.png" draggable = "false">
                </div>

                <div id='icon_box'>
                    <h2>Icons:</h2>
                    <div id='all_icons'></div>
                    <img src="images/pointer-grey.png" draggable = "false">
                </div>
			</div>
            <div id='board_properties'> <!-- Placed here to be centered in the nodesContainer -->
                <input id='board_newTitle' type="text" style="display: none;" />
                <?php
                    $answer = $bdd->prepare('SELECT id, title, date_creation FROM boards WHERE user_id = :user_id AND id = :id');
				    $answer->execute(array('user_id' => $_SESSION['id'], 'id' => $_GET['id'])) or die(print_r($bdd->errorInfo()));
                    $data = $answer->fetchAll();
                    echo "<h1>" . stripslashes(strip_tags($data[0]['title'])) . "</h1>";
                    echo "<h2>Author:</h2><h3>" . $_SESSION['name_first'] . " " . $_SESSION['name_last'] . "</h3><br>";
                    echo "<h2>Created on:</h2><h3>" . $data[0]['date_creation'] . "</h3><br>";
                    echo "<h2>Link to this board:</h2><h3>localhost/Nodes/board.php?id=" . $data[0]['id'] ."</h3><br>";
                    $answer->closeCursor();
                ?>
                <div id='board_changetitle' class='property_button'>Change Title</div>
                <div id='board_delete' class='property_button'>Delete Board</div>
                <img id='properties_close' data-src="images/icons/x.svg" title='Close window' class='iconic iconic-sm'>
            </div>
        </div>
    	<div id='toolbar'>
        	<div id='tool_img_1' class="tool_icon" title='Move/Select tool'><img data-src="images/icons/move.svg" class='iconic iconic-lg'></div>
            <div id='tool_img_2' class="tool_icon" title='Delete tool'><img data-src="images/icons/x.svg" class='iconic iconic-lg'></div>
        	<div id='tool_img_3' class="tool_icon" title='Link tool'><img data-src="images/icons/link.svg" class='iconic iconic-lg' data-state="intact"></div>
            <div id='tool_img_4' class="tool_icon" title='Add node'><img data-src="images/icons/plus.svg" class='iconic iconic-lg'></div>
            <div id='tool_img_5' class="tool_icon" title='Undo'><img data-src="images/icons/action.svg" class='iconic iconic-lg' data-state="undo"></div>
            <div id='tool_img_6' class="tool_icon" title='Board properties'><img data-src="images/icons/list.svg" class="iconic iconic-lg"></div>
        </div>
        
        <div id='sidebar'>
        	<div id='unfold_button'>
        		<span></span><h1>Boards</h1>
            </div>
            <div id='board_chooser'>
                <h2>Your boards</h2>
                <img data-src="images/icons/plus.svg" class="iconic iconic-lg" id="add_board" title="Add Board">
                <div id='board_search'>
                    <input type='text' placeholder="Search boards" />
                    <img data-src="images/icons/magnifying-glass.svg" class="iconic iconic-md" id="board_search_img">
                </div>
                <div id='boards'>
                	<?php 
						$answer = $bdd->prepare('SELECT id, title FROM boards WHERE user_id = :user_id');
						$answer->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
						while($data = $answer->fetch()) {
							echo '<a href="board.php?id=' . $data['id'] . '">
									<div id="board_node' . $data['id'] . '" class="node board_node" style="background: radial-gradient(#999 40%, #CCC 65%);">
									  <h3 class="nodeTitle">' . stripslashes(strip_tags($data['title'])) . '</h3>
								  	</div>
								</a>';
						}
                        $answer->closeCursor();
					?>
                    <h4 id="board_noResults">No results found</h4>
           		</div>
        	</div>
            <div id="add_board_box">
            	<h2>Create a new board</h2>
            	<input id="board_title" type="text" placeholder="Board Title"/>
                <div id="add_board_confirm">Create board</div>
                <div id="add_board_cancel">Cancel</div>
            </div>
        </div>
    	<div id='saving'>
        	<p><i>Saving</i></p>
            <img src="images/ajax-loader.gif" alt="Loading" draggable="false">
        </div>
        
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>
        
        <script src="objects/Board.js"></script>
        <script src="objects/Node.js"></script>
        <script src="objects/Subtitle.js"></script>
        <script src="objects/LinkBar.js"></script>
        <script src="objects/Tag.js"></script>
        
        <script src="functions.js"></script>
        
        <script>
			//Global variables
        	var nodes = [];
			var linkBars = [];
			var changingContent = false;
			var changeContentType = 'node';
			var selectedType = 'node';
			var colorChanging = false;
			var addingBoard = false;
			var tagsOpen = false;
            var iconsOpen = false;
			var ellipsisClicked = false;
			var ellipsisNode; //the node on which the clicked ellipsis is
			var selectedTool = 1;
			selectTool(1); //default tool
			var link_firstSelected = null;
			var selectedNode = null;
			var changedSub = null;
			var nodeTitleMinWidth;
			var subMaxWidth;
            var searchedFor = ''; //if the value doesn't change, there was no redirection from search
			
            //Initialize Iconic
			var iconic = new IconicJS({
				autoInjectDone: function (count) {
					//icons are hidden in nodeStyle.css
					$('.iconic').show();
					//these 2 icons use iconic, but need to stay hidden
					$('#changeContent_change').hide();
					$('#changeContent_cancel').hide();
				}
			});

			var board_id = <?php echo $_GET['id'] ?>;
			
        </script>
        <?php include('events.php')?>
        <script src='toolbar.js'></script>
	</body>
</html>
