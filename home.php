<?php	
    session_start();
	if(isset($_SESSION['id'])) {
		header('Location: board.php');
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Nody Notes - Learn and never forget again</title>
        <!--[if lte IE 9]>
        	<script>window.onload = function() {
            	document.body.innerHTML= '<p>Please download the latest version of your browser</p>';
            }</script>;
        	<![endif]-->
        <link rel="SHORTCUT ICON" href="images/shortcut_icon.png">
        <link rel="stylesheet" type="text/css" href="styles/homeStyle.css">
        <script src="http://use.edgefonts.net/asap.js"></script>
	</head>

	<body>
    	<header>
        	<div id='head_container'>
            	<div id="head_left">
            		<span></span>
        			<h1>Nody Notes</h1>
                </div>
                <div id="head_right">
                	<span></span>
                    <div id="connection">
                    	<span></span>
                        <form id="login_box" method="post" action="server_side/isValidAccount.php" >
                            <input type="text" name="email" placeholder="Email" name="email" />
                            <input type="password" name="password" placeholder="Password" name="password" />
                            <input type="submit" id="login" class="button" value="Log in" />
                        </form>
                        <div id="connection_or">or</div>
                        <a href="#" id="signup" class="button">Sign up</a>
                    </div>
                </div>
            </div>
        </header>
        <div id="banner">
        	<img src="images/banner.png" id="banner_img">
            <div id="description">
            	<h2>Learn and never forget again</h2>
                <p>Enjoy all the benefits of taking notes online. Remembering will become easy as pie.</p>
                <a href="#">Check the video</a>
            </div>
        </div>
        <div id="option_bar">
        	<ul>
            	<span></span>
            	<li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
            </ul>
        </div>
        
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script>
			$(function() {
				$(document).on('click', '#login', function(e) {
					$('#login_box').show();
				});
			});
		</script>
	</body>
</html>