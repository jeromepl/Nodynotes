<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="description" content="Save and organize your thoughts in an beautiful tree diagram. Free your mind.">
		<title>Your Boards - Nodynotes</title>
        <base href="http://localhost/Nodes/">
        <link rel="shortcut icon" href="images/shortcut_icon.png?v=1">
        <link rel="stylesheet" type="text/css" href="styles/explorerStyle.css">
        <link rel="stylesheet" type="text/css" href="styles/headerStyle.css">
        <link rel="stylesheet" type="text/css" href="styles/iconicStyle.css">
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
            <div id='head_right'>
                <a id='logout' class='head_icon' href='server_side/disconnect.php' title='Log out'><img data-src='images/icons/account.svg' class='iconic iconic-md' data-state='logout'></a>
            </div>
            <div id='head_left'>
               <h1 id='logo'>N<span>ODYNOTES</span></h1>
            </div>
        </header>

        <div class="container">
            <div id="selector">
                <ul>
                    <li class="selected">All</li>
                    <li>Public</li>
                    <li>Private</li>
                </ul>
            </div>
            <div id="viewer">
                <?php for($i = 0; $i < count($boards); $i++) { ?>
                    <a class="board <?=$boards[$i]['public']?>" href="board/<?=$boards[$i]['id']?>">
                        <img src="images/board_test.png">
                        <div class="title">
                            <h3><?=$boards[$i]['title']?></h3>
                        </div>
                    </a>
                <?php } ?>
            </div>
        </div>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="plugins/iconic.min.js"></script>

        <script>
            $(document).ready(function(){
                setContainerWidth();
            });

            $(window).resize(function(){
               setContainerWidth();
            });

            function setContainerWidth()
            {
                var viewerWidth = $('#viewer').width() - 20; //-20 to account for scroll bar
                var blockWidth = $('.board').outerWidth() + 40; //20px margin on each side minimum
                var maxBoxPerRow = Math.floor(viewerWidth / blockWidth);
                var margin = (viewerWidth - maxBoxPerRow * blockWidth) / (maxBoxPerRow + 1) + 35; //35 instead of 40 just in case. +1 to account for last margin on the right
                $('.board').css("margin-left", margin);
            }

            $('#selector li').on('click', function(e) {
                $('#selector li').removeClass('selected'); //Reset
                $('.board').show(); //Reset
                $(this).addClass('selected'); //Show which filter is selected


                //Apply the filter
                if($(this).text() == 'Public') {
                    $('.board.private').hide();
                }
                else if($(this).text() == 'Private') {
                    $('.board.public').hide();
                }
                //If its neither of the above then "All" was selected and all boards are already shown
            });
        </script>
    </body>
</html>
