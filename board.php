<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
        <meta name="description" content="Add or edit nodes and subtitles on this page. You will have access to them from any computer afterwards!">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
        <title>Your board - Nodynotes</title>
        <base href=<?php echo '"' . $baseUrl . '"'; ?>></base>
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/allBoardStyles.php">
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
                    if($isConnected) { //Show profile and disconnect buttons ?>
                        <div id='head_friends' class='head_icon' title='Friends'><img data-src='images/icons/people.svg' class='iconic iconic-md'></div>
                        <a id='head_profile' class='head_icon' href='#' title='Profile'><img data-src='images/icons/person.svg' class='iconic iconic-md' data-gender='genderless'></a>
                        <a id='logout' class='head_icon' href='server_side/disconnect.php'  title='Log out'><img data-src='images/icons/account.svg' class='iconic iconic-md' data-state='logout'></a>
                <?php }
                    else { //show login form ?>
                        <form method='post' action='server_side/login.php?ref_id=<?php echo $_GET['id'];?>'>
                        <input type='text' name='email_username' placeholder='Email or username'>
                        <input type='password' name='password' placeholder='Password'>
                        <input type='submit' id='login' value='Log in'>
                <?php } ?>
            </div>
             <div id='head_left'>
                <h1 id='logo' href="#">Nodynotes <span id='alpha'>&#x3b1;</span></h1>
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
                    <?php if(!$isPublic || $isCreator) { ?>
                        <div id='changeContent'>
                            <div id='changeContentButton' title='Modify'><img data-src="images/icons/pencil.svg" class="iconic iconic-md" title="Edit"></div>
                            <div id='changeContent_change' title='Apply'><img data-src="images/icons/circle-check.svg" class="iconic iconic-md" title="Apply"></div>
                            <div id='changeContent_cancel' title='Cancel'> <img data-src="images/icons/circle-x.svg" class="iconic iconic-md" title="Cancel"></div>
                        </div>
                    <?php } ?>
                </div>
                <?php if(!$isPublic || $isCreator) { ?>
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
                <?php } ?>
            </div>
                <div id='toolbar2' <?php if($isPublic && !$isCreator) { ?> style="width:0;height:0;border:none;display:none;" <?php } ?>>
                    <?php if(!$isPublic || $isCreator) { //leave the toolbar2, but empty to avoid errors?>
                    <!-- Everything is placed in a div, otherwise the border is not correctly shown with the SVGs -->
                    <div id='tool2_img_1' class="tool2_icon" title='Add Subtitle'><img data-src="images/icons/plus.svg" class='iconic iconic-md'></div>
            	    <div id='tool2_img_2' class="tool2_icon" title='Delete Node'><img data-src="images/icons/x.svg" class='iconic iconic-md'></div>
            	    <div id='tool2_img_3' class="tool2_icon" title='Change Color'><img data-src="images/icons/brush.svg" class='iconic iconic-md'></div>
            	    <div id='tool2_img_4' class="tool2_icon" title='Change Icon'><img data-src="images/icons/image.svg" class='iconic iconic-md' data-orientation="landscape"></div>
                    <div id='tool2_img_5' class="tool2_icon" title='Inputs/Outputs'><img data-src="images/icons/transfer.svg" class='iconic iconic-md'></div>
            	    <div id='tool2_img_6' class="tool2_icon" title='Manage Tags'><img data-src="images/icons/tags.svg" class='iconic iconic-md'></div>
            	    <div id='tool2_img_7' class="tool2_icon" title='More'><img data-src="images/icons/ellipses.svg" class='iconic iconic-md'></div>
                
                    <div id='colorChoices'>
                        <div class='colorBox' style='background-color: #e74c3c;'></div>
                        <div class='colorBox' style='background-color: #E500D9;'></div>
                        <div class='colorBox' style='background-color: #9b59b6;'></div>
                        <div class='colorBox' style='background-color: #3498db;'></div>
                        <div class='colorBox' style='background-color: #00D7DD;'></div>
                        <div class='colorBox' style='background-color: #2ecc71;'></div>
                        <div class='colorBox' style='background-color: #f1c40f;'></div>
                        <div class='colorBox' style='background-color: #e67e22;'></div>
                        <div class='colorBox' style='background-color: #7E2B02;'></div>
                        <div class='colorBox' style='background-color: #bdc3c7;'></div>
                        <div class='colorBox' style='background-color: #95a5a6;'></div>
                        <div class='colorBox' style='background-color: #34495e;'></div>
                    
                        <img src="images/pointer-grey.png" draggable="false">
                    </div>
            <?php }  //leave the tags to avoid errors during board loading?>
            <div id='tag_box'>
                <div id='tag_form'>
                    <input type='text' id='tag_name' >
                    <div id='tag_suggestions'></div>
                    <div id='add_tag'>Add tag</div>
                </div>
                <div id='all_tags'></div>
                <img src="images/pointer-grey.png" draggable="false">
            </div>
            <?php if(!$isPublic || $isCreator) { ?>
                    <div id='icon_box'>
                        <h2>Icons:</h2>
                        <div id='all_icons'></div>
                        <img src="images/pointer-grey.png" draggable="false">
                    </div>
            <?php } ?>
            </div>

            <?php if(!$isPublic || $isCreator) { ?>
                <div id='board_properties'> <!-- Placed here to be centered in the nodesContainer -->
                    <input id='board_newTitle' type="text" style="display: none;" >
                    <?php
                        $answer = $bdd->prepare('SELECT id, title, date_creation FROM boards WHERE user_id = :user_id AND id = :id');
				        $answer->execute(array('user_id' => $_SESSION['id'], 'id' => $_GET['id'])) or die(print_r($bdd->errorInfo()));
                        $data = $answer->fetchAll();
                        echo "<h1>" . strip_tags($data[0]['title']) . "</h1>";
                        echo "<h2>Author:</h2><h3>" . $_SESSION['username'] . "</h3><br>";
                        echo "<h2>Created on:</h2><h3>" . $data[0]['date_creation'] . "</h3><br>";
                        echo "<h2>Link to this board:</h2><h3>http://www.nodynotes.com/board/" . $data[0]['id'] ."</h3><br>";
                        $answer->closeCursor();
                    ?>
                    <div id="choose_public_prop">
                        <label><input type="radio" name="public_prop" value="F" <?php if(!$isPublic) { echo "checked='true'"; }?>>Private</label>
                        <label><input type="radio" name="public_prop" value="T" <?php if($isPublic) { echo "checked='true'"; }?>>Public</label>
                        <p id="text_private_prop" <?php if($isPublic) { echo "style='display: none;'"; }?>>Only you and who you choose will be able to see this board!</p>
                        <p id="text_public_prop" <?php if(!$isPublic) { echo "style='display: none;'"; }?>>Everyone will be able to see this board. It might even become super popular!</p>
                    </div>
                    <div id='board_changetitle' class='property_button'>Change Title</div>
                    <div id='board_delete' class='property_button'>Delete Board</div>
                    <img id='properties_close' data-src="images/icons/x.svg" title='Close window' class='iconic iconic-sm'>
                </div>
            <?php } ?>
        </section>
        <?php if(!$isPublic || $isCreator) { ?>
    	    <section id='toolbar'>
        	    <div id='tool_img_1' class="tool_icon" title='Move/Select tool'><img data-src="images/icons/move.svg" class='iconic iconic-lg'></div>
                <div id='tool_img_2' class="tool_icon" title='Delete tool'><img data-src="images/icons/x.svg" class='iconic iconic-lg'></div>
        	    <div id='tool_img_3' class="tool_icon" title='Link tool'><img data-src="images/icons/connections.svg" class='iconic iconic-lg' data-state="intact"></div>
                <div id='tool_img_4' class="tool_icon" title='Add node'><img data-src="images/icons/plus.svg" class='iconic iconic-lg'></div>
                <div id='tool_img_5' class="tool_icon" title='Undo'><img data-src="images/icons/action.svg" class='iconic iconic-lg' data-state="undo"></div>
                <div id='tool_img_6' class="tool_icon" title='Board properties'><img data-src="images/icons/list.svg" class="iconic iconic-lg"></div>
            </section>
        <?php } ?>
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
							echo '<a href="board/' . $data['id'] . '">
									<div id="board_node' . $data['id'] . '" class="node board_node" style="background: radial-gradient(#999 40%, #CCC 65%);">
									  <h3 class="nodeTitle">' . strip_tags($data['title']) . '</h3>
								  	</div>
								</a>';
						}
                        $answer->closeCursor();
					?>
                    <h4 id="board_noResults">No results found</h4>
                    <?php if(!$isConnected) { ?><h4>Login to see your boards</h4> <?php } ?>
           		</div>
        	</div>
            <?php if($isConnected) { ?>
                <div id="add_board_box">
                    <h2>Create a new board</h2>
                    <input id="board_title" type="text" placeholder="Board Title">
                    <div id="add_board_confirm">Create board</div>
                    <div id="add_board_cancel">Cancel</div>
                    <div id="choose_public_add">
                        <label><input type="radio" name="public_add" value="F" checked="true">Private</label>
                        <label><input type="radio" name="public_add" value="T">Public</label>
                        <p id="text_private_add">Only you and who you choose will be able to see this board!</p>
                        <p id="text_public_add">Everyone will be able to see this board. It might even become super popular!</p>
                    </div>
                </div>
            <?php } ?>
        </section>
        <?php if(!$isPublic || $isCreator) { ?>
    	    <div id='saving'>
        	   <p><i>Saving</i></p>
                <img src="images/ajax-loader.gif" alt="Loading" draggable="false">
            </div>
        <?php } ?>
        
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>
        
        <script type="text/javascript" src="javascript/objects/allObjects.php"></script>
        
        <script src="javascript/functions.js"></script>
        <?php if(!$isPublic || $isCreator) { ?>
            <script src="javascript/save.js"></script>
        <?php } ?>
        
        <script>
			//Global variables
			var changingContent = false;
			var changeContentType = 'node';
			var selectedType = 'node';
			var colorChanging = false;
            var sidebarExpanded = false;
			var addingBoard = false;
			var tagsOpen = false;
            var iconsOpen = false;
			var ellipsisClicked = false;
			var ellipsisNode; //the node on which the clicked ellipsis is
			var link_firstSelected = null;
			var selectedNode = null;
			var changedSub = null;
            var searchedFor = ''; //if the value doesn't change, there was no redirection from search
			
            //Initialize Iconic
			var iconic = new IconicJS({
				autoInjectDone: function (count) {
					//icons are hidden in nodeStyle.css for a smoother show-up
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
        <?php if($isConnected) { ?>
            <script src="javascript/events-connected.js"></script>
        <?php } if(!$isPublic || $isCreator) { ?>
            <script src='javascript/events-for-creator.js'></script>
            <script src='javascript/toolbar.js'></script>
        <?php } ?>
	</body>
</html>
