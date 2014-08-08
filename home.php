<?php	
    session_start();
    include_once("server_side/mySQL_connection.php");

	if(isset($_SESSION['id'])) {
        $req = $bdd->prepare('SELECT last_board FROM users WHERE id = :user_id');
        $req->execute(array('user_id' => $_SESSION['id'])) or die(print_r($bdd->errorInfo()));
        $data = $req->fetch();
        $req->closeCursor();

        header('Location: boards/' . $data['last_board']);
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="description" content="Save your knowledge and thoughts in an organized fashion. Never forget anything again.">
		<title>Nodynotes - Your thoughts, organized</title>
        <base href="http://localhost/Nodes/">
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/homeStyle.css">
        <script src="http://use.edgefonts.net/asap:n7,i4,n4,i7:all;ubuntu:n4,i4,n7,i7,n3,i3,n5,i5:all.js"></script>
	</head>
    <body>
        <!--[if lte IE 9]>
            <p id='old_ie'>Your browser is too old for this website. Please download the latest version of your browser <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" rel="nofollow">here</a>.</p>
        <![endif]-->
        <header>
            <div id='head_container' class='container'>
                <h1>Nodynotes <span id='alpha'>&#x3b1</span></h1>
                <?php
                    if(isset($_GET['ref_id'])) {
                        echo '<form method="post" action="server_side/login.php?ref_id=' . $_GET['ref_id'] . '">';
                    }
                    else {
                        echo '<form method="post" action="server_side/login.php">';
                    }
                ?>
                    <input type="text" name="email_username" placeholder="Email or username">
                    <input type="password" name="password" placeholder="Password">
                    <input type="submit" id="login" class="button" value="Log in">
                    <?php
                        if(isset($_GET['er']) && is_numeric($_GET['er']) && $_GET['er'] <= 3) {
                            echo "<p id='error_connect'>";
                            switch($_GET['er']) {
                                case 1:
                                    echo "Invalid email/username or password";
                                    break;
                                case 2:
                                    echo "Please login first";
                                    break;
                                case 3:
                                    echo "An error occurred while trying to log in";
                                    break;
                            }
                            echo "\n" . "<img src='images/pointer-red.png' draggable='false'>";
                            echo "</p>";
                        }
                    ?>
                </form>
            </div>
        </header>

        <section id='banner'>
            <p id='alpha_note'>Note: This website is currently in alpha. This means bugs and unexpected problems may occur, but if you are courageous enough to sign up, we promise you a great experience and will be eternally thankful to you!</p>
            <div id='banner_text' class='container'>
                <div id='intro'>
                    <h1>Learn and Never Forget Again</h1>
                    <p>Save your <strong>knowledge</strong> and <strong>thoughts</strong> in an organized fashion. Free your <strong>memory</strong>.</p>
                </div>
                <div id='signup_block'>
                    <form method="post" action="server_side/signup.php" onsubmit="return validateForm()">
                        <div id='input1' class='input'>
                            <input type="text" name="username" placeholder="Username">
                            <img data-src="images/icons/check.svg" class="iconic iconic-sm input_good">
                            <img data-src="images/icons/x.svg" class="iconic iconic-sm input_bad">
                        </div>
                        <div id='input_error1' class='input_error'>This username is too fancy for our systems!<br>Use 4-15 letters, numbers, underscores and periods</div>
                        <div id='input_error1b' class='input_error'>Someone acquired this username before you! :O</div>
                        <div id='input2' class='input'><input type="text" name="email" placeholder="Email" autocomplete="off">
                            <img data-src="images/icons/check.svg" class="iconic iconic-sm input_good">
                            <img data-src="images/icons/x.svg" class="iconic iconic-sm input_bad">
                        </div>
                        <div id='input_error2' class='input_error'>This does not look like an email address!</div>
                        <div id='input_error2b' class='input_error'>Is someone using the same email address as you?</div>
                        <div id='input3' class='input'><input type="password" name="password" placeholder="Password" autocomplete="off">
                            <img data-src="images/icons/check.svg" class="iconic iconic-sm input_good">
                            <img data-src="images/icons/x.svg" class="iconic iconic-sm input_bad">
                        </div>
                        <div id='input_error3' class='input_error'>You wanna get your account stolen or what?? Your password should be at least 6 characters long!</div>
                        <button type="submit" id="signup" class="button">Sign up to Nodynotes!</button>
                        <p>By clicking "Sign up to Nodynotes", you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.</p>
                        <?php
                            if(isset($_GET['er']) && is_numeric($_GET['er']) && $_GET['er'] > 3) {
                                echo "<p id='error_signup'>";
                                switch($_GET['er']) {
                                    case 4:
                                        echo "This email address is already used in another account";
                                        break;
                                    case 5:
                                        echo "An error occured while trying to create your account. We're sorry :/";
                                        break;
                                    case 6:
                                        echo "This username is already used by someone else!";
                                        break;
                                }
                                echo "</p>";
                            }
                        ?>
                    </form>
                </div>
            </div>
            <a id='what_link' onclick="$('#what').animatescroll({easing:'easeInOutCirc', scrollSpeed:1400, padding:40});" class='button'>What is Nodynotes? <span style="font-size: 12px;">&#x25BC</span></a>
        </section>

        <section class='container'>
            <h1 id='what'>What is Nodynotes?</h1>
            <p id='what_description'>From taking <strong>lecture</strong> <strong>notes</strong> at <strong>school</strong> to putting your family recipes <strong>online</strong>, Nodynotes got you covered. Type down anything you want to remember and access it from anywhere in the world.<br>It's that <strong>easy</strong>!</p>
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
                    <p>Find, in a single click, everything you need in your notes with Nodynotes' powerful search algorithm</p>
                </div>
            </div>
            <div class='feature feature_right'>
                <div class='feature_text'>
                    <h2>Organized</h2>
                    <p>No more messy notes on pieces of paper. Your notes will always be <strong>clean</strong> and well organized in a <strong>beautiful</strong> and colored tree <strong>diagram</strong></p>
                </div>
                <div class='feature_icon'><img data-src="images/icons/connections.svg" class="iconic iconic-lg"></div>
            </div>
            <div class='feature feature_left'>
                <div class='feature_icon'><img data-src="images/icons/globe.svg" class="iconic iconic-lg"></div>
                <div class='feature_text'>
                    <h2>Accessible Everywhere</h2>
                    <p>Access your notes anywhere in the world, at anytime, with all the benefits of <strong>cloud</strong> <strong>storage</strong></p>
                </div>
            </div>
            <div class='feature feature_right'>
                <div class='feature_text'>
                    <h2>Private</h2>
                    <p>No one but you and the people you authorize can see your notes</p>
                </div>
                <div class='feature_icon'><img data-src="images/icons/shield.svg" class="iconic iconic-lg"></div>
            </div>
        </section>

        <div class='container'><a id='backToTop' onclick="$('header').animatescroll({easing:'easeInOutCirc', scrollSpeed:1400});" class='button'>Try it now! <span>&#x25B2</span></a></div>
        
        <footer>
            <div class='container'>
                <h3>©Nodynotes 2014</h3>
                <div id='links'>
                    <a href="blog/">Blog</a>
                    <a href="policies.html">Legal Stuff</a>
                    <a href="mailto:nodynotes@gmail.com" target="_blanck">Contact us</a>
                </div>
            </div>
        </footer>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>
        <script src="plugins/animatescroll.min.js"></script>
        <script src="plugins/bgpos.js"></script>
        <script src="plugins/jquery.mousewheel.js"></script>
        <script src="javascript/home.js"></script>
    </body>
</html>
