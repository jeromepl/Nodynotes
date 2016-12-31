<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
        <meta name="description" content="This is the board '<?=$board_info['title']?>', created by <?=$board_info['username']?>">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
        <title><?=$board_info['title']?> by <?=$board_info['username']?> - Nodynotes</title>
        <base href=<?='"' . $baseUrl . '"'?>></base>
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/allBoardStyles.php">

         <script src="http://use.edgefonts.net/asap:n7,i4,n4,i7:all;ubuntu:n4,i4,n7,i7,n3,i3,n5,i5:all.js"></script>
        <!-- Analytics -->
        <!--<script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-53854387-1', 'auto');ga('send', 'pageview');
        </script>-->
	</head>

	<body>
        <!--[if lte IE 9]>
            <script>window.onload = function() {document.body.innerHTML = '<p>Your browser is too old for this website. Please download the latest version of your browser <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">here</a>.</p>'
            };</script>
        <![endif]-->

    	<header>
            <div id='head_right'>

                <?php if($connected) { //Show profile and disconnect buttons ?>

                    <input id='search_box' type='text' placeholder='Search for...'>
                    <div id='search_results'>
                        <h4 id='search_noResults'>No results found</h4>
                    </div>
                    <div id='search' class='head_icon'><img data-src='images/icons/magnifying-glass.svg', class='iconic iconic-md'></div>
                    <a class='head_icon' href='explorer.php' title='Your Boards'><img data-src='images/icons/menu.svg' class='iconic iconic-md'></a>
                    <a id='logout' class='head_icon' href='server_side/disconnect.php' title='Log out'><img data-src='images/icons/account.svg' class='iconic iconic-md' data-state='logout'></a>

                <?php } else { //show login form ?>
                
                    <form method='post' action='server_side/login.php?ref_id=<?=$_GET['id']?>'>
                        <input id='login_box' type='text' name='email_username' placeholder='Email or username'>
                        <input id='password_box' type='password' name='password' placeholder='Password'>
                        <input type='submit' id='login' class='button' value='Log in'>
                    </form>
                    <a id='signup' class='button' href='./?signup'>Sign Up</a>

                <?php } ?>

            </div>
            <div id='head_left'>
               <h1 id='logo'>N<span>ODYNOTES</span></h1>
            </div>
            <div id='head_center'>
                <h2><?=$board_info['title']?></h2>
            </div>
        </header>

        <section id='boardContainer'>

            <div id='backgroundTextContainer'>
                <div id='backgroundText'>Loading content...</div>
            </div>

            <div id='board'>
                <!-- Nodes and linkbars go here -->

                <div id='nodeToolbar'>
                    <!-- Everything is placed in a div, otherwise the border is not correctly shown with the SVGs -->
                    <div id='nodeTool_1' class="nodeTool" title='Add Subtitle'><img data-src="images/icons/plus.svg" class='iconic iconic-md'></div>
            	    <div id='nodeTool_2' class="nodeTool" title='Delete Node'><img data-src="images/icons/x.svg" class='iconic iconic-md'></div>
            	    <div id='nodeTool_3' class="nodeTool" title='Change Color'><img data-src="images/icons/brush.svg" class='iconic iconic-md'></div>
            	    <div id='nodeTool_4' class="nodeTool" title='Change Icon'><img data-src="images/icons/image.svg" class='iconic iconic-md' data-orientation="landscape"></div>
            	    <div id='nodeTool_5' class="nodeTool" title='Manage Tags'><img data-src="images/icons/tags.svg" class='iconic iconic-md'></div>

                    <img id='nodeToolbarPointer' src="images/pointer-turquoise.png" draggable="false">

                    <div id='colorChoices'>
                        <div class='colorChoice' style='background-color: #e74c3c;'></div>
                        <div class='colorChoice' style='background-color: #E500D9;'></div>
                        <div class='colorChoice' style='background-color: #9b59b6;'></div>
                        <div class='colorChoice' style='background-color: #3498db;'></div>
                        <div class='colorChoice' style='background-color: #00D7DD;'></div>
                        <div class='colorChoice' style='background-color: #2ecc71;'></div>
                        <div class='colorChoice' style='background-color: #f1c40f;'></div>
                        <div class='colorChoice' style='background-color: #e67e22;'></div>
                        <div class='colorChoice' style='background-color: #7E2B02;'></div>
                        <div class='colorChoice' style='background-color: #bdc3c7;'></div>
                        <div class='colorChoice' style='background-color: #95a5a6;'></div>
                        <div class='colorChoice' style='background-color: #34495e;'></div>

                        <img src="images/pointer.png" draggable="false">
                    </div>
                    <div id='tag_box'>
                        <div id='tag_form'>
                            <input type='text' id='tag_name' >
                            <div id='tag_suggestions'></div>
                            <div id='add_tag'>Add tag</div>
                        </div>
                        <div id='all_tags'></div>
                        <img src="images/pointer.png" draggable="false">
                    </div>
                    <div id='icon_box'>
                        <h2>Icons:</h2>
                        <div id='all_icons'></div>
                        <img src="images/pointer.png" draggable="false">
                    </div>
                </div>

                <div id='showContent'>
                    <div id='content_title'>
                        <h1></h1>
                        <input type='text'>
                    </div>
                    <div id='content_text'>
                        <p></p>
                        <textarea placeholder="Add a Description"></textarea>
                    </div>

                    <img src="images/pointer.png" id='pointer' draggable='false'>
                    <div id='changeContent'>
                        <div id='changeContentButton' title='Modify'><img data-src="images/icons/pencil.svg" class="iconic iconic-md" title="Edit"></div>
                        <div id='changeContent_change' title='Apply'><img data-src="images/icons/circle-check.svg" class="iconic iconic-md" title="Apply"></div>
                        <div id='changeContent_cancel' title='Cancel'> <img data-src="images/icons/circle-x.svg" class="iconic iconic-md" title="Cancel"></div>
                    </div>
                </div>
            </div>

            <?php if($connected && $creator || $_GET['id'] == 99) { ?>

            <div id='boardToolbar'>
                <div id='boardTool_1' class="boardTool" title='Move/Select tool'><img data-src="images/icons/move.svg" class='iconic iconic-lg'></div>
                <div id='boardTool_2' class="boardTool" title='Delete tool'><img data-src="images/icons/x.svg" class='iconic iconic-lg'></div>
                <div id='boardTool_3' class="boardTool" title='Link tool'><img data-src="images/icons/connections.svg" class='iconic iconic-lg' data-state="intact"></div>
                <div id='boardTool_4' class="boardTool" title='Add node'><img data-src="images/icons/plus.svg" class='iconic iconic-lg'></div>
                <div id='boardTool_5' class="boardTool" title='Undo'><img data-src="images/icons/action.svg" class='iconic iconic-lg' data-state="undo"></div>
                <div id='boardTool_6' class="boardTool" title='Board properties'><img data-src="images/icons/list.svg" class="iconic iconic-lg"></div>
                <div id='boardToolbarTitle'>Toolbar</div>
            </div>

            <div id='board_properties'> <!-- Placed here to be centered in the boardContainer in CSS -->
                <input id='board_newTitle' type="text" style="display: none;">
                <h1><?=$board_info['title']?></h1>
                <h2>Author:</h2><h3><?=$board_info['username']?></h3><br>
                <h2>Created on:</h2><h3><?=$board_info['date_creation']?></h3><br>
                <h2>Link to this board:</h2><h3>http://www.nodynotes.com/board/<?=$board_info['id']?></h3><br>
                <div id="choose_public_prop">
                    <label><input type="radio" name="public_prop" value="F" <?php if(!$public) echo "checked";?> >Private</label>
                    <label><input type="radio" name="public_prop" value="T" <?php if($public) echo "checked";?> >Public</label>
                    <p id="text_private_prop" <?php if($public) echo "style='display: none;'";?> >Only you and who you choose will be able to see this board.</p>
                    <p id="text_public_prop" <?php if(!$public) echo "style='display: none;'";?> >Anyone with the correct URL will be able to see this board.</p>
                </div>
                <div id='board_changetitle' class='property_button'>Change Title</div>
                <div id='board_delete' class='property_button'>Delete Board</div>
                <img id='properties_close' data-src="images/icons/x.svg" title='Close window' class='iconic iconic-sm'>
            </div>

            <?php } ?>

        </section>

        <section id='sidebar'>
        </section>

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>

        <script type="text/javascript" src="javascript/objects/allObjects.php"></script>
        <script src="javascript/boardEvents.js"></script>
        <script src="javascript/utils.js"></script>

        <script>
            "use strict";

            var User = {
                canSee: <?=(($public || ($connected && ($creator || $sharedWith))) ? "true" : "false")?>,
                canEdit: <?=(($connected && $creator || $_GET['id'] == 99) ? "true" : "false")?>, //Also true if on the demo board
                canSave: <?=(($connected && $creator) ? "true": "false")?>
            };

            var saver = new Saver();
            var search = new Search();

            var selectedNode = <?=$_GET['node_id']?>;
            var callback = null;
            if (selectedNode) {
                callback = function() {
                    var node = board.getNode(selectedNode);
                    board.centerNode(node, true);
                    node.select();
                };
            }
            
            var board = new Board(<?=$_GET['id']?>, callback);

            var tempId = -1; //This variable is used to create new objects such as Nodes and Subtitles without knowing their id (provided by the server) yet. The value should decrease (tempId--) everytime it is used to ensure that no objects will have the same ID.

            //All styles that need to be accessed in Javascript (Note: those values are also specified in the CSS)
            var Styles = {
                nodeTitleBgColor: 'rgba(0, 0, 0, 0.6)',
                nodeTitleMinWidth: '129%',
                subtitleMaxWidth: '110px',
                subtitleBgColor: '', //Transparent
                linkbarBgColor: '#CACACA',
                boardBgColor: 'rgb(240, 240, 240)'
            };

            //All strings of text that are used in Javascript (Note: Some of them are also written in the HTML)
            //Note 2: The alert texts are still in their respective classes... Move them here?
            var Strings = {
                deleteNodeTool: 'Delete Node',
                deleteSubtitleTool: 'Delete Subtitle',
                newNodeTitle: 'Title',
                newNodeText: '',
                newSubtitleTitle: 'Subtitle',
                newSubtitleText: ''
            };

            //Initialize Iconic
            var iconic = new IconicJS({
                autoInjectDone: function (count) {
                   //icons are hidden in nodeStyle.css, then made visible here for a smoother show-up
                   $('.iconic').show();
                   //these 2 icons use iconic, but need to stay hidden
                   $('#changeContent_change').hide();
                   $('#changeContent_cancel').hide();
                }
            });
        </script>

	</body>
</html>
