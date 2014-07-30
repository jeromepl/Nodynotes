// BANNER BACKGROUND ANIMATION
$(document).ready(function() {
    var $banner = $('#banner');

    function animBackground() {
        $banner.animate({
            backgroundPositionX: '-=200px',
            backgroundPositionY: '-=150px'
        }, 6000, 'linear', function() {
            animBackground(); //loop
        });
    }

    animBackground(); //start the loop
});

// Automatic Scroll from banner to "what is nodynotes"
var isScrolling = false;
$('header, #banner').mousewheel(function(e) {
    e.preventDefault();
    if(e.deltaY < 0 && !isScrolling) {
        isScrolling = true;
        $('#what').animatescroll({easing: 'easeInOutCirc', scrollSpeed: 1400, padding: 40, onScrollEnd: function() {
            isScrolling = false;
        }});
    }
});
$(window).mousewheel(function(e) {
    if(e.deltaY > 0 && $('#banner').position().top + $('#banner').outerHeight() + 70 > $(window).scrollTop() && !isScrolling) {
        e.preventDefault();
        isScrolling = true;
        $('header').animatescroll({easing: 'easeInOutCirc', scrollSpeed: 1400, onScrollEnd: function() {
            isScrolling = false;
        }});
    }
});

// FORM VALIDATION AND EVENTS
function validateForm() {
    var isOk = true;
    if(!$('#signup_block input[name="username"]').val().match(/^[A-Za-z0-9_]{4,15}$/)) {
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
$(document).on('blur', '#signup_block input[name="username"]', function(e){
    if($(this).val().match(/^[A-Za-z0-9_.]{4,15}$/)) {
        $.post('server_side/isUnique.php', {action: 'username', email_username: $(this).val()}, function(data){
            if(data == 'true') {
                $('#input1 .input_good').show();
                $('#input1 .input_bad').hide();
                $('#input_error1').hide();
                $('#input_error1b').hide();
            }
            else {
                $('#input1 .input_bad').show();
                $('#input1 .input_good').hide();
                $('#input_error1b').show();
                $('#input_error1').hide();
            }
        });
    }
    else {
        $('#input1 .input_bad').show();
        $('#input1 .input_good').hide();
        $('#input_error1').show();
        $('#input_error1b').hide();
    }
});
$(document).on('blur', '#signup_block input[name="email"]', function(e){
    if($(this).val().match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)) {
        $.post('server_side/isUnique.php', {action: 'email', email_username: $(this).val()}, function(data){
            if(data == 'true') {
                $('#input2 .input_good').show();
                $('#input2 .input_bad').hide();
                $('#input_error2').hide();
                $('#input_error2b').hide();
            }
            else {
                $('#input2 .input_bad').show();
                $('#input2 .input_good').hide();
                $('#input_error2b').show();
                $('#input_error2').hide();
            }
        });
    }
    else {
        $('#input2 .input_bad').show();
        $('#input2 .input_good').hide();
        $('#input_error2').show();
        $('#input_error2b').hide();
    }
});
$(document).on('blur', '#signup_block input[name="password"]', function(e){
    if($(this).val().length >= 6) {
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
