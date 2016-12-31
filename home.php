<?php
    include_once("server_side/settings.php");

    // See server_side/signup.php for an explaination of all errors
    $default_error = "Sorry, an error occured";
    $error_messages = [
        "Invalid email/username or password",
        "Please Login first",
        $default_error,
        "This email is already used",
        "Passwords should contain at least 6 characters.<br>
            Usernames should contain only 4-15 letters, numbers or dots.",
        "This username is already used"
    ];

    $error = null;
    $show_signup = false;
    $signup_errors = [4, 5, 6]; // Indices of errors related to signup

    if (isset($_GET['er'])) {
        $er_num = intval($_GET['er']);
        if ($er_num <= count($error_messages))
            $error = $error_messages[$er_num - 1];
        else
            $error = $default_error;
        
        if (in_array($er_num, $signup_errors))
            $show_signup = true;
    }


    // Lastly, show the signup if the signup argument is in the URL
    if (isset($_GET['signup']))
        $show_signup = true;
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>Nodynotes - Your thoughts, organized</title>
        <base href=<?='"' . $baseUrl . '"'?>></base>
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/homeStyle.css">
        <script src="http://use.edgefonts.net/asap:n7,i4,n4,i7:all;ubuntu:n4,i4,n7,i7,n3,i3,n5,i5:all.js"></script>
        <!-- Analytics -->
        <!--<script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-53854387-1', 'auto');ga('send', 'pageview');
        </script>-->
	</head>
    <body>
        <!--[if lte IE 9]>
            <p id='old_ie'>Your browser is too old for this website. Please download the latest version of your browser <a target="_blank" href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" rel="nofollow">here</a>.</p>
        <![endif]-->
        <header>
            <div id='top-header-container'>
                <div id='head_right'>
                    <form method='post' action='server_side/login.php'>
                        <input id='login_box' class='form-text-input' type='text' name='email_username' placeholder='Email or username'>
                        <input id='password_box' class='form-text-input' type='password' name='password' placeholder='Password'>
                        <input type='submit' id='login' class='button' value='Log in'>
                    </form>
                    <button id="signup" class="button">Sign Up</button>
                </div>
            </div>

            <div class='container'>
                <div class='banner-section'>
                    <h1 id='logo'>N<span>ODYNOTES</span></h1>
                    <h2>Save and organize your thoughts in an beautiful tree-shaped diagram</h2>
                    <a class='discover button' href="board/demo">Discover Nodynotes</a>
                </div>
                <?php if ($error) { ?>
                    <h6 class='error'><?=$error?></h6>
                <?php } ?>
                <div id='signup-section' class='banner-section'>
                    <form id='signup-form' method="post" action="server_side/signup.php">
                        <input type="text" class='form-text-input' name="username" placeholder="Username">
                        <input type="text" class='form-text-input' name="email" placeholder="Email">
                        <input type="password" class='form-text-input' name="password" placeholder="Password">
                        <input type="submit" class='button' value="Sign Up">
                    </form>
                    <h6 id='terms'>By signing up, you agree to our <a href='policies.html#privacy'>privacy policy</a> and <a href='policies.html#tos'>terms of service</a>.</h6>
                </div>
            </div>
        </header>

        <section class='feature_left'>
            <article>
                <h2>Free Your Mind</h2>
                <p>Nodynotes is the perfect tool to quickly write your ideas down and empty your busy brain.
                    It provides you with easy-to-use tools to quickly transform a simple idea into a full-blown project.
                </p>
            </article>
            <aside>
                <img src="images/img1.png">
            </aside>
        </section>

        <section class='feature_right'>
            <aside>
                <img src="images/img2.png">
            </aside>
            <article>
                <h2>More than Sticky Notes</h2>
                <p>A thought is often more than a single concept and each key idea needs to be subdivided into smaller sub-sections.
                    With Nodynotes, create a more robust note structure by connecting small pieces of notes together.
                    Use colors, icons and tags to help quickly identify and search parts of your work!
                </p>
            </article>
        </section>

        <section class='feature_left'>
            <article>
                <h2>Never Forget Anything</h2>
                <p>Easily find specific pieces of notes you wrote by their content or any tags you attached to them.
                    Remembering old thoughts and ideas has never been easier.
                </p>
            </article>
            <aside>
                <img src="images/img3.png">
            </aside>
        </section>
        
        <section id='discover-footer'>
            <h3>Try out Nodynotes before signing up using our Demo Board!</h3>
            <a class='discover button' href="board/demo">Try Nodynotes Now</a>
        </section>

        <footer>
            <!-- TODO
            <div id='social_networks' class='container'>
                <h3>Facebook - Twitter!</h3>
            </div>
            -->
            <div id='bottom_links'>
                <div id='bottom_links_left'>
                    <h5>&copy; 2016 Jérôme Parent-Lévesque</h5>
                </div>
                <div id='bottom_links_right'>
                    <a href="policies.html">Terms of Service</a>
                    <a href="mailto:nodynotes@gmail.com">Contact Us</a>
                </div>
            </div>
        </footer>
        
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        
        <script>
            var showSignup = <?=$show_signup ? "true" : "false"?>;
            
            $(document).ready(function(){
                
                if (showSignup) {
                    $('#signup-section').show();
                }
                
                $('#signup').click(function(){
                    $('#signup-section').slideDown(400);
                });
            });
        </script>

    </body>
</html>
