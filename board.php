<?php
	session_start();
    $baseUrl = 'http://localhost/Nodes/'; //TODO try if it would work without any base url
    $isConnected = false; //to know if it's an anonymous person viewing a public board or a connected one

	if(!isset($_SESSION['id'])) {
        $_SESSION['id'] = 0; //Set the id to 0 so that public boards can be accessed without logging in
	}
	
    include_once("server_side/mySQL_connection.php"); //where $bdd is set

    //setup for the global variable board_id
    if(!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        if($_SESSION['id'] == 0) {//user not logged in
            session_destroy();
            header('Location: ' . $baseUrl . '?er=2'); //tell the user to login first
        }
        else
            header('Location: ' . $baseUrl . 'errors/404.html'); //TODO create the 404 page
    }
    else { //Check if the board specified belongs to the user
        $answer = $bdd->prepare('SELECT b.id
                                FROM access a
                                RIGHT JOIN boards b ON b.id = a.board_id
                                WHERE b.id = :id AND (a.user_id = :user_id OR b.user_id = :user_id2 OR b.public = \'T\')');
        $answer->execute(array('id' => $_GET['id'],
                               'user_id' => $_SESSION['id'],
                               'user_id2' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
        $data = $answer->fetch();
        $answer->closeCursor();
        if(!$data) { //if the board does not belong to the user and is not public
            if($_SESSION['id'] == 0) { //user not logged in
                session_destroy();
                header('Location: ' . $baseUrl . '?er=2&ref_id=' . $_GET['id']); //tell the user to login first
            }
            else { //get the user's last seen board since he can't see this one
                $answer = $bdd->prepare('SELECT last_board FROM users WHERE id = :user_id');
                $answer->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
                $data = $answer->fetch();
                $answer->closeCursor();

                $_GET['id'] = $data['last_board'];
                header('Location: ' . $baseUrl . 'boards/' . $_GET['id']);
            }
        }
        else if($_SESSION['id'] != 0)
            $isConnected = true;
    }
?>
<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
        <meta name="description" content="Add or edit nodes and subtitles on this page. You will have access to them from any computer afterwards!">
        <title>Your board - Nodynotes</title>
        <base href="http://localhost/Nodes/">
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/nodeStyle.css">
        <link rel="stylesheet" type="text/css" href="styles/toolbarStyle.css">
        <link rel="stylesheet" type="text/css" href="styles/headerStyle.css">
        <link rel="stylesheet" type="text/css" href="styles/sidebarStyle.css">
        <link rel="stylesheet" type="text/css" href="styles/iconicStyle.css">
        <!--[if lte IE 9]>
            <script>window.onload = function() {document.body.innerHTML = '<p>Your browser is too old for this website. Please download the latest version of your browser <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">here</a>.</p>'
            };</script>
        <![endif]-->
        
        <script src="http://use.edgefonts.net/asap.js"></script>
	</head>

	<body>
    	<header>
            <div id='head_right'> <!-- Head right must go first to prevent display anomalies due to the float functionality -->
                <?php
                    if($isConnected) { //Show profile and disconnect buttons
                        echo "<a id='head_profile' class='head_icon' href='#'  title='Profile'><img data-src='images/icons/person.svg' class='iconic iconic-md' data-gender='genderless'></a>";
                        echo "<a id='logout' class='head_icon' href='server_side/disconnect.php'  title='Log out'><img data-src='images/icons/account.svg' class='iconic iconic-md' data-state='logout'></a>";
                    }
                    else { //show login form
                        echo "<form method='post' action='server_side/login.php?ref_id=" . $_GET['id'] . "'>";
                        echo "<input type='text' name='email_username' placeholder='Email or username'>";
                        echo "<input type='password' name='password' placeholder='Password'>";
                        echo "<input type='submit' id='login' value='Log in'>";
                    }
                ?>
            </div>
             <div id='head_left'>
                <img id='alpha' src='images/alpha.png' draggable='false'>
                <a id='logo' href="home.php">Nodynotes</a>
            </div>
             <div id='head_middle'>
                <div id='search'>
                    <input type='text' placeholder="Find something" >
                    <div id='search_results'>
                        <h4 id='search_noResults'>No results found</h4>
                    </div>
                     <div id='head_search' class='head_icon' title='Search'><img data-src="images/icons/magnifying-glass.svg" class="iconic iconic-md"></div>
                </div>
            </div>
        </header>
        <section id='nodesContainer'>
            <div id='nodesArea'>
                <div id='showContent'>
                    <div id='content_title'>
                        <h1></h1>
                        <input type='text' >
                    </div>
                    <div id='content_text'>
                        <p></p>
                        <textarea></textarea>
                    </div>
                    
                    <img src="images/pointer.png" id="pointer" class="pointerRight" draggable = "false">
                    <div id='changeContent'>
                        <div id='changeContentButton' title='Modify'><img data-src="images/icons/pencil.svg" class="iconic iconic-md" title="Edit"></div>
                        <div id='changeContent_change' title='Apply'><img data-src="images/icons/circle-check.svg" class="iconic iconic-md" title="Apply"></div>
                        <div id='changeContent_cancel' title='Cancel'> <img data-src="images/icons/circle-x.svg" class="iconic iconic-md" title="Cancel"></div>
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
            	<div id='tool2_img_7' class="tool2_icon" title='More'><img data-src="images/icons/ellipses.svg" class='iconic iconic-md'></div>
                
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
                		<input type='text' id='tag_name' >
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
                <input id='board_newTitle' type="text" style="display: none;" >
                <?php
                    $answer = $bdd->prepare('SELECT id, title, date_creation FROM boards WHERE user_id = :user_id AND id = :id');
				    $answer->execute(array('user_id' => $_SESSION['id'], 'id' => $_GET['id'])) or die(print_r($bdd->errorInfo()));
                    $data = $answer->fetchAll();
                    echo "<h1>" . strip_tags($data[0]['title']) . "</h1>";
                    echo "<h2>Author:</h2><h3>" . $_SESSION['username'] . "</h3><br>";
                    echo "<h2>Created on:</h2><h3>" . $data[0]['date_creation'] . "</h3><br>";
                    echo "<h2>Link to this board:</h2><h3>http://localhost/Nodes/boards/" . $data[0]['id'] ."</h3><br>";
                    $answer->closeCursor();
                ?>
                <div id='board_changetitle' class='property_button'>Change Title</div>
                <div id='board_delete' class='property_button'>Delete Board</div>
                <img id='properties_close' data-src="images/icons/x.svg" title='Close window' class='iconic iconic-sm'>
            </div>
        </section>
    	<section id='toolbar'>
        	<div id='tool_img_1' class="tool_icon" title='Move/Select tool'><img data-src="images/icons/move.svg" class='iconic iconic-lg'></div>
            <div id='tool_img_2' class="tool_icon" title='Delete tool'><img data-src="images/icons/x.svg" class='iconic iconic-lg'></div>
        	<div id='tool_img_3' class="tool_icon" title='Link tool'><img data-src="images/icons/connections.svg" class='iconic iconic-lg' data-state="intact"></div>
            <div id='tool_img_4' class="tool_icon" title='Add node'><img data-src="images/icons/plus.svg" class='iconic iconic-lg'></div>
            <div id='tool_img_5' class="tool_icon" title='Undo'><img data-src="images/icons/action.svg" class='iconic iconic-lg' data-state="undo"></div>
            <div id='tool_img_6' class="tool_icon" title='Board properties'><img data-src="images/icons/list.svg" class="iconic iconic-lg"></div>
        </section>
        
        <section id='sidebar'>
        	<div id='unfold_button'>
        		<span></span><h1>Boards</h1>
            </div>
            <div id='board_chooser'>
                <h2>Your boards</h2>
                <img data-src="images/icons/plus.svg" class="iconic iconic-lg" id="add_board" title="Add Board">
                <div id='board_search'>
                    <input type='text' placeholder="Search boards" >
                    <img data-src="images/icons/magnifying-glass.svg" class="iconic iconic-md" id="board_search_img">
                </div>
                <div id='boards'>
                	<?php 
                        $answer = $bdd->prepare('SELECT b.id, b.title
                                                FROM access a
                                                RIGHT JOIN boards b ON b.id = a.board_id
                                                WHERE a.user_id = :user_id OR b.user_id = :user_id2 ORDER BY b.date_creation');
                        $answer->execute(array('user_id' => $_SESSION['id'], 'user_id2' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
						while($data = $answer->fetch()) {
							echo '<a href="boards/' . $data['id'] . '">
									<div id="board_node' . $data['id'] . '" class="node board_node" style="background: radial-gradient(#999 40%, #CCC 65%);">
									  <h3 class="nodeTitle">' . strip_tags($data['title']) . '</h3>
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
            	<input id="board_title" type="text" placeholder="Board Title">
                <div id="add_board_confirm">Create board</div>
                <div id="add_board_cancel">Cancel</div>
            </div>
        </section>
    	<div id='saving'>
        	<p><i>Saving</i></p>
            <img src="images/ajax-loader.gif" alt="Loading" draggable="false">
        </div>
        
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>
        
        <script src="javascript/objects/Board.js"></script>
        <script src="javascript/objects/Node.js"></script>
        <script src="javascript/objects/Subtitle.js"></script>
        <script src="javascript/objects/LinkBar.js"></script>
        <script src="javascript/objects/Tag.js"></script>
        
        <script src="javascript/functions.js"></script>
        
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

            <?php
                //Set the board area to the right place
                if (isset($_GET['node_id'])) {
                    $answer = $bdd->prepare('SELECT n.yPos, n.xPos FROM nodes n
                                            INNER JOIN boards b ON b.id = n.board_id
                                            WHERE n.id = :id');
                    $answer->execute(array('id' => $_GET['node_id'])) or die(print_r($bdd->errorInfo()));
                    $data = $answer->fetch();
                    echo "\n\t$('#nodesArea').css({top: $('#nodesContainer').outerHeight() / 2.6 - " . $data['yPos'] . ",
                            left: $('#nodesContainer').outerWidth() / 2.2 - " . $data['xPos'] . "});\n";
                    echo "\tsearchedFor = '#node" . $_GET['node_id'] . "';";

                    $answer->closeCursor();
                }
                else if (isset($_GET['sub_id'])) {
                    $answer = $bdd->prepare('SELECT s.id, n.yPos, n.xPos FROM subtitles s
                                            INNER JOIN nodes n ON n.id = s.node_id
                                            INNER JOIN boards b ON b.id = n.board_id
                                            WHERE s.id = :id');
                    $answer->execute(array('id' => $_GET['sub_id'])) or die(print_r($bdd->errorInfo()));
                    $data = $answer->fetch();
                    echo "\n\t$('#nodesArea').css({top: $('#nodesContainer').outerHeight() / 2.6 - " . $data['yPos'] . ",
                            left: $('#nodesContainer').outerWidth() / 2.2 - " . $data['xPos'] . "});\n";
                    echo "\tsearchedFor = '#subtitle" . $_GET['sub_id'] . "';";

                    $answer->closeCursor();
                }
                else {
                    $answer = $bdd->prepare('SELECT yPos, xPos FROM boards WHERE id = :id'); //Board is placed where the creator last saw it
                    $answer->execute(array('id' => $_GET['id'])) or die(print_r($bdd->errorInfo()));
                    $data = $answer->fetch();
                    echo "\n\t$('#nodesArea').css({top: " . $data['yPos'] . ", left: " . $data['xPos'] . "});\n";

                    $answer->closeCursor();
                }

                //Save this board into the last seen board
                $req = $bdd->prepare('UPDATE users
                                    SET last_board = :board_id, views = views + 1
                                    WHERE id = :user_id');
                $req->execute(array('board_id' => $_GET['id'],
                                    'user_id' => $_SESSION['id']));

                //Save the date and add a view to the board
                $req = $bdd->prepare('UPDATE boards
                                    SET date_seen = NOW(), views = views + 1
                                    WHERE id = :id'); //not checking user id for public boards to count correctly views
                $req->execute(array('id' => $_GET['id']));
            ?>
        </script>
        <script src="javascript/events.js"></script>
        <script src='javascript/toolbar.js'></script>
	</body>
</html>
