<?php
	session_start();
	if(!isset($_SESSION['id'])) {
		header('Location: home.php?er=2'); //tell the user to login first
	}
	
	include_once("server_side/mySQL_connection.php"); //where $bdd is set
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
        		<a href="home.php">Nody Notes</a>
                <div id="head_friends" class="head_icon"><img data-src="images/person.svg" class="iconic iconic-md" data-gender="genderless"></div>
                
                <input type='text' placeholder="Find something" />
            	<div id="head_search" class="head_icon"><img data-src="images/magnifying-glass.svg" class="iconic iconic-md"></div>
                <a href="server_side/disconnect.php">Disconnect</a>
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
                        <img data-src="images/pencil.svg" id='changeContentButton' class="iconic iconic-md" title="Edit">
                        <img data-src="images/circle-check.svg" id="changeContent_change" class="iconic iconic-md" title="Apply">
                        <img data-src="images/circle-x.svg" id="changeContent_cancel" class="iconic iconic-md" title="Cancel">
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
            	<div id='tool2_img_1' class="tool2_icon"><img data-src="images/plus.svg" title='Add subtitle' class='iconic iconic-md'></div>
            	<div id='tool2_img_2' class="tool2_icon"><img data-src="images/x.svg" title='Delete node' class='iconic iconic-md'></div>
            	<div id='tool2_img_3' class="tool2_icon"><img data-src="images/brush.svg" title='Change color' class='iconic iconic-md'></div>
            	<div id='tool2_img_4' class="tool2_icon"><img data-src="images/image.svg" title='Change icon' class='iconic iconic-md' data-orientation="landscape"></div>
                <div id='tool2_img_5' class="tool2_icon"><img data-src="images/transfer.svg" title='Inputs/Outputs' class='iconic iconic-md'></div>
            	<div id='tool2_img_6' class="tool2_icon"><img data-src="images/tags.svg" title='Manage tags' class='iconic iconic-md'></div>
            	<div id='tool2_img_7' class="tool2_icon"><img data-src="images/ellipses.svg" title='Sublink' class='iconic iconic-md'></div>
                
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
                    
                    <img src="images/pointer.png" draggable = "false">
                </div>
                <div id="tag_box">
                	<div id="tag_form">
                		<input type="text" id="tag_name" />
                    	<div id="add_tag">Add tag</div>
                    </div>
                    <div id="all_tags">
                    </div>
                    
                    <img src="images/pointer.png" draggable = "false">
                </div>
			</div>
        </div>
    	<div id='toolbar'>
        	<div id='tool_img_1' class="tool_icon"><img data-src="images/move.svg" title='Move/Select tool' class='iconic iconic-lg'></div>
            <div id='tool_img_2' class="tool_icon"><img data-src="images/x.svg" title='Delete tool' class='iconic iconic-lg'></div>
        	<div id='tool_img_3' class="tool_icon"> <img data-src="images/link.svg" title='Link tool' class='iconic iconic-lg' data-state="intact"></div>
            <div id='tool_img_4' class="tool_icon"><img data-src="images/plus.svg" title='Add node' class='iconic iconic-lg'></div>
            <div id='tool_img_5' class="tool_icon"><img data-src="images/fork.svg" title='Share board' class='iconic iconic-lg'></div>
            <div id='tool_img_6' class="tool_icon"><img data-src="images/list.svg" title='Board properties' class="iconic iconic-lg"></div>
        </div>
        
        <div id='sidebar'>
        	<div id='unfold_button'>
        		<span></span><h1>Boards</h1>
            </div>
            <div id='board_chooser'>
                <h2>Your boards</h2>
                <img data-src="images/plus.svg" class="iconic iconic-lg" id="add_board" title="Add Board">
                <div id='board_search'>
                    <input type='text' placeholder="Search boards" />
                    <img data-src="images/magnifying-glass.svg" class="iconic iconic-md" id="board_search_img">
                </div>
                <div id='boards'>
                	<?php 
						$answer = $bdd->prepare('SELECT id, title FROM boards WHERE user_id = :user_id');
						$answer->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
						while($data = $answer->fetch()) {
							echo '<a href="board.php?id=' . $data['id'] . '">
									<div class="node board_node" style="background: radial-gradient(#999 40%, #CCC 65%);">
									  <h3 class="nodeTitle">' . stripslashes(strip_tags($data['title'])) . '</h3>
								  	</div>
								</a>';
						}
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
			var ellipsisClicked = false;
			var ellipsisNode; //the node on which the clicked ellipsis is
			var selectedTool = 1;
			selectTool(1); //default tool
			var link_firstSelected = null;
			var selectedNode = null;
			var changedSub = null;
			var nodeTitleMinWidth;
			var subMaxWidth;
			
			var iconic = new IconicJS({
				autoInjectDone: function (count) {
					//icons are hidden in nodeStyle.css
					$('.iconic').show();
					//these 2 icons use iconic, but need to stay hidden
					$('#changeContent_change').hide();
					$('#changeContent_cancel').hide();
				}
			});
			
			<?php
				//setup for the global variable board_id
				global $board_id;
				if(isset($_GET['id']) && is_numeric($_GET['id'])) {
					$board_id = $_GET['id'];
				}
				else { //get the last seen board
					$answer = $bdd->prepare('SELECT last_board FROM users WHERE id = :user_id');
					$answer->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
					$data = $answer->fetch();
					
					$board_id = $data['last_board'];
				}
			?>
			var board_id = <?php echo $board_id ?>;
			
			//Caching stuff
			var appCache = window.applicationCache;
			appCache.addEventListener("updateready", function(e) {
				appCache.swapCache();
				window.location.reload(); //need to reload the page when the manifest has changed (meaning website update) to apply updates
			}, false);
			appCache.update();
			
        </script>
        <?php include('events.php')?>
        <script src='toolbar.js'></script>
	</body>
</html>