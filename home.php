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
        <link rel="SHORTCUT ICON" href="images/shortcut_icon.png">
        <link rel="stylesheet" type="text/css" href="styles/homeStyle.css">
        <script src="http://use.edgefonts.net/asap.js"></script>
	</head>
    <body>
        <header>
            <div id='header'>
                <div id='head_container' class='container'>
                    <h1>NodyNotes</h1>
                    <form method="post" action="server_side/isValidAccount.php" >
                        <input type="text" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Password" />
                        <input type="submit" id="login" class="button" value="Log in" />
                    </form>
                </div>
            </div>
        </header>

        <div id='banner'>
            <div id='banner_text' class='container'>
                <div id='intro'>
                    <h1>Learn and Never Forget Again</h1>
                    <p>Save your knowledge and thoughts in an organized fashion. Never forget anything again</p>
                </div>
                <div id='signup_block'>
                    <form method="post" action="#" >
                        <div id="signup_name">
                            <input type="text" name="name_first" placeholder="First Name" />
                            <input type="text" name="name_last" placeholder="Last Name" />
                        </div>
                        <input type="text" name="email" placeholder="Email" autocomplete="off" />
                        <input type="password" name="password" placeholder="Password" autocomplete="off" />
                        <button type="submit" id="signup" class="button" >Sign up to NodyNotes!</button>
                        <p>By clicking "Sign up to NodyNotes", you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.</p>
                    </form>
                </div>
            </div>
        </div>

        <div class='container'>
            <h1 id='what'>What is NodyNotes?</h1>
            <p id='what_description'>From taking chemistry notes at school to putting your family recipes online, NodyNotes got you covered. Type down anything you want to remember and acces it from anywhere in the world.<br>It's that easy!</p>
            <div class='feature feature_left'>
                <div class='feature_icon'><img data-src="images/icons/brush.svg" class="iconic iconic-lg"></div>
                <div class='feature_text'>
                    <h2>Create</h2>
                    <p>Write your thoughts or knowledge down quickly and easily before forgetting them</p></p>
                </div>
            </div>
            <div class='feature feature_right'>
                <div class='feature_text'>
                    <h2>Share</h2>
                    <p>Expand your knowledge with your friends' notes and share yours</p>
                </div>
                <div class='feature_icon'><img data-src="images/icons/share-boxed.svg" class="iconic iconic-lg"></div>
            </div>
            <div class='feature feature_left'>
                <div class='feature_icon'><img data-src="images/icons/magnifying-glass.svg" class="iconic iconic-lg"></div>
                <div class='feature_text'>
                    <h2>Search</h2>
                    <p>Find, in a single click, everything you need in your notes with NodyNotes' powerful search algorithm</p>
                </div>
            </div>
            <div class='feature feature_right'>
                <div class='feature_text'>
                    <h2>Organized</h2>
                    <p>No more messy notes on pieces of paper. Your notes will always be clean and well organized in a beautiful and colored tree diagram</p>
                </div>
                <div class='feature_icon'><img data-src="images/icons/fork.svg" class="iconic iconic-lg"></div>
            </div>
            <div class='feature feature_left'>
                <div class='feature_icon'><img data-src="images/icons/globe.svg" class="iconic iconic-lg"></div>
                <div class='feature_text'>
                    <h2>Accessible Everywhere</h2>
                    <p>Access your notes anywhere in the world, at anytime, with all the benefits of cloud storage</p>
                </div>
            </div>
            <div class='feature feature_right'>
                <div class='feature_text'>
                    <h2>Private</h2>
                    <p>No one but you and the people you authorize can see your notes</p>
                </div>
                <div class='feature_icon'><img data-src="images/icons/shield.svg" class="iconic iconic-lg"></div>
            </div>
        </div>

        <div class='container'><a id='backToTop' href='#signup_block'class='button'>Try it now!</a></div>
        
        <div id='footer'>
            <div class='container'>
                <h3>©NodyNotes 2014</h3>
                <div id='links'>
                    <a href="blog/">Blog</a>
                    <a href="#">Legal Stuff</a>
                    <a href="#">Contact us</a>
                </div>
            </div>
        </div>
    </body>
    <script src="plugins/iconic.min.js"></script>
</html>
