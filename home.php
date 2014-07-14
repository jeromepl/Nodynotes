<?php	
    session_start();
	if(isset($_SESSION['id'])) {
		header('Location: board.php');
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="description" content="Save your knowledge and thoughts in an organized fashion. Never forget anything again.">
		<title>Nodynotes - Organized and free notes for everyone</title>
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/homeStyle.css">
        <script src="http://use.edgefonts.net/asap.js"></script>
	</head>
    <body>
        <!--[if lte IE 9]>
            <p id='old_ie'>Your browser is too old for this website. Please download the latest version of your browser <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" rel="nofollow">here</a>.</p>
        <![endif]-->
        <header>
            <div id='header'>
                <div id='head_container' class='container'>
                    <img id='alpha' src='images/alpha.png' draggable='false'>
                    <h1>Nodynotes</h1>
                    <?php
                        if(isset($_GET['ref_id'])) {
                            echo '<form method="post" action="server_side/login.php?ref_id=' . $_GET['ref_id'] . '">';
                        }
                        else {
                            echo '<form method="post" action="server_side/login.php">';
                        }
                    ?>
                        <input type="text" name="email" placeholder="Email">
                        <input type="password" name="password" placeholder="Password">
                        <input type="submit" id="login" class="button" value="Log in">
                        <?php
                            if(isset($_GET['er']) && is_numeric($_GET['er']) && $_GET['er'] <= 3) {
                                echo "<p id='error_connect'>";
                                switch($_GET['er']) {
                                    case 1:
                                        echo "Invalid email or password";
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
                            <input type="text" name="name_first" placeholder="First Name">
                            <input type="text" name="name_last" placeholder="Last Name">
                            <img data-src="images/icons/check.svg" class="iconic iconic-sm input_good">
                            <img data-src="images/icons/x.svg" class="iconic iconic-sm input_bad">
                        </div>
                        <div id='input_error1' class='input_error'>Is that your name? That seems odd.</div>
                        <div id='input2' class='input'><input type="text" name="email" placeholder="Email" autocomplete="off">
                            <img data-src="images/icons/check.svg" class="iconic iconic-sm input_good">
                            <img data-src="images/icons/x.svg" class="iconic iconic-sm input_bad">
                        </div>
                        <div id='input_error2' class='input_error'>This does not look like an email address!</div>
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
                                        echo "This email address already corresponds to an account";
                                        break;
                                    case 5:
                                        echo "An error occured while trying to create your account. Please try again.";
                                        break;
                                }
                                echo "</p>";
                            }
                        ?>
                    </form>
                </div>
            </div>
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
                <div class='feature_icon'><img data-src="images/icons/fork.svg" class="iconic iconic-lg"></div>
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

<div class='container'><a id='backToTop' onclick="$('header').animatescroll({easing:'easeInOutCirc', scrollSpeed:1400});" class='button'>Try it now!</a></div>
        
        <footer>
            <div class='container'>
                <h3>©Nodynotes 2014</h3>
                <div id='links'>
                    <a href="blog/">Blog</a>
                    <a href="#">Legal Stuff</a>
                    <a href="#">Contact us</a>
                </div>
            </div>
        </footer>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>
        <script src="plugins/animatescroll.min.js"></script>
        <script>
            function validateForm() {
                var isOk = true;
                if(!$('#signup_block input[name="name_first"]').val().match(/^[A-Za-z\u00C0-\u017F -]+$/)) { //regex for all letters and accents
                    $('#input1 .input_bad').show();
                    $('#input1 .input_good').hide();
                    $('#input_error1').show();
                    isOk = false;
                }
                else {
                    $('#input1 .input_good').show();
                    $('#input1 .input_bad').hide();
                    $('#input_error1').hide();
                }
                if(!$('#signup_block input[name="name_last"]').val().match(/^[A-Za-z\u00C0-\u017F -]+$/)) {
                    $('#input1 .input_bad').show();
                    $('#input1 .input_good').hide();
                    $('#input_error1').show();
                    isOk = false;
                }
                else {
                    $('#input1 .input_good').show();
                    $('#input1 .input_bad').hide();
                    $('#input_error1').hide();
                }
                if(!$('#signup_block input[name="email"]').val().match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)) {
                    $('#input2 .input_bad').show();
                    $('#input2 .input_good').hide();
                    $('#input_error2').show();
                    isOk = false;
                }
                else {
                    $('#input2 .input_good').show();
                    $('#input2 .input_bad').hide();
                    $('#input_error2').hide();
                }
                if($('#signup_block input[name="password"]').val().length < 6) {
                    $('#input3 .input_bad').show();
                    $('#input3 .input_good').hide();
                    $('#input_error3').show();
                    isOk = false;
                }
                else {
                    $('#input3 .input_good').show();
                    $('#input3 .input_bad').hide();
                    $('#input_error3').hide();
                }

                if(isOk)
                    return true;
                else
                    return false;
            }

            //EVENTS
            $(document).on('blur', '#signup_block input[name="name_first"]', function(e){
                if($('#signup_block input[name="name_last"]').val() != '') {
                    if($(this).val().match(/^[A-Za-z\u00C0-\u017F -]+$/) && $('#signup_block input[name="name_last"]').val().match(/^[A-Za-z\u00C0-\u017F -]+$/)) { //regex for all letters and accents
                        $('#input1 .input_good').show();
                        $('#input1 .input_bad').hide();
                        $('#input_error1').hide();
                    }
                    else {
                        $('#input1 .input_bad').show();
                        $('#input1 .input_good').hide();
                        $('#input_error1').show();
                    }
                }
            });
            $(document).on('blur', '#signup_block input[name="name_last"]', function(e){
                if($(this).val().match(/^[A-Za-z\u00C0-\u017F -]+$/) && $('#signup_block input[name="name_first"]').val().match(/^[A-Za-z\u00C0-\u017F -]+$/)) {
                    $('#input1 .input_good').show();
                    $('#input1 .input_bad').hide();
                    $('#input_error1').hide();
                }
                else {
                    $('#input1 .input_bad').show();
                    $('#input1 .input_good').hide();
                    $('#input_error1').show();
                }
            });
            $(document).on('blur', '#signup_block input[name="email"]', function(e){
                if($('#signup_block input[name="email"]').val().match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)) {
                    $('#input2 .input_good').show();
                    $('#input2 .input_bad').hide();
                    $('#input_error2').hide();
                }
                else {
                    $('#input2 .input_bad').show();
                    $('#input2 .input_good').hide();
                    $('#input_error2').show();
                }
            });
            $(document).on('blur', '#signup_block input[name="password"]', function(e){
                if($('#signup_block input[name="password"]').val().length >= 6) {
                    $('#input3 .input_good').show();
                    $('#input3 .input_bad').hide();
                    $('#input_error3').hide();
                }
                else {
                    $('#input3 .input_bad').show();
                    $('#input3 .input_good').hide();
                    $('#input_error3').show();
                }
            });
        </script>
    </body>
</html>
