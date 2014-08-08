$(function() {

    //SEARCHING EVERYTHING
    $(document).on('focusin', '#head_middle input[type="text"]', function(e) {
		setTimeout(function() { //a timeout needs to be set because something in chrome and IE was deselecting it right after selecting it
			$('#head_middle input[type="text"]').select();
		}, 20);
	});
    $(document).on('keyup', '#head_middle input[type="text"]', function(e) {
        if(e.which != 38 && e.which != 40)
            mainSearch($('#head_middle input[type="text"]').val());
	});
	$(document).on('click', '#head_search', function(e) {
        mainSearch($('#head_middle input[type="text"]').val());
	});
    $(document).on('click', function(e) {
        var tar = $(e.target);
        if(!tar.is('#search_results') && !tar.parents('#search_results').length &&
            !tar.is('#search input') && !tar.parents('#search input').length &&
            !tar.is('#head_search') && !tar.parents('#head_search').length) {

            $('#search_results').hide();
            $('#search input').val('');
            $('.search_result').remove();
        }
    });
    var resultAmount = 0;
    var curResult = 0;
	function mainSearch(input) {
        $('#search_results').show();

        input = '+' + (input.trim()).replace(/\W+/g, ' +'); //make every word mandatory (add a + sign before each word)

        $.getJSON("server_side/search.php?query=" + input + "*", function(data) {
            //console.log(data);
            $('.search_result').remove();

            if(data.length == 0) { //no results
                $('#search_noResults').show();
            }
            else {
                $('#search_noResults').hide();
                resultAmount = 0;
                for(var i = 0; i < data.length; i++) {
                    var currentA = $('<a>').appendTo('#search_results').addClass('search_result');
                    if(data[i].type == 'node') {
                        $('<div>').appendTo(currentA).addClass('search_nodeResult');
                        currentA.attr('href', "boards/" + data[i].board_id + "/node_id=" + data[i].id);
                    }
                    else { //subtitle
                        $('<div>').appendTo(currentA).addClass('search_subtitleResult');
                        currentA.attr('href', "boards/" + data[i].board_id + "/sub_id=" + data[i].id);
                    }
                    var currentDiv = $('<div>').appendTo(currentA).addClass('search_textResult');
                    $('<h3>').appendTo(currentDiv).text(data[i].title);
                    $('<p>').appendTo(currentDiv).text(data[i].text);
                    resultAmount++;
                }

                $('.search_result:first').addClass('search_selected');
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + ": " + errorThrown);
        });
	}
    $(document).on('keydown', '#head_middle input[type="text"]', function(e) {
        if (e.which == 13) { //enter
            window.location.href = $('.search_selected').attr('href');
        }
        else if (e.which == 40 && curResult + 1 < resultAmount) { //down
            $('.search_selected').removeClass('search_selected');
            curResult++;
            $('.search_result').eq(curResult).addClass('search_selected');
        }
        else if (e.which == 38 && curResult - 1 >= 0) { //up
            $('.search_selected').removeClass('search_selected');
            curResult--;
            $('.search_result').eq(curResult).addClass('search_selected');
        }
    });

    //SEARCHING BOARD
	$(document).on('mouseenter', '#board_search_img', function(e) {
		$('#board_search_img.iconic *').css({fill: '#09F', stroke: '#09F'});
	});
	$(document).on('mouseleave', '#board_search_img', function(e) {
		$('#board_search_img.iconic *').css({fill: '#020024', stroke: '#020024'});
	});
	$(document).on('focusin', '#board_chooser input[type="text"]', function(e) {
		setTimeout(function() { //a timeout needs to be set because something in chrome and IE was deselecting it right after selecting it
			$('#board_chooser input[type="text"]').select();
		}, 20);
	});
	$(document).on('keyup', '#board_chooser input[type="text"]', function(e) {
		search_hideBoards($('#board_chooser input[type="text"]').val());
		if(e.which == 13) $('#board_chooser input[type="text"]').blur();
	});
	$(document).on('click', '#board_search_img', function(e) {
		search_hideBoards($('#board_chooser input[type="text"]').val());
	});
	function search_hideBoards(input) { //this function hides all boards not matching the user input
		var boardTitles = [];
		$('.board_node').each(function() {
            boardTitles.push($(this));
        });
		var smtgShown = false;
		for(var i = 0; i < boardTitles.length; i++) {
			var regexp = new RegExp(input, "i");
			if(!regexp.test(boardTitles[i].children('h3').text())) boardTitles[i].hide();
			else {
				if(boardTitles[i].css('display') == 'none') boardTitles[i].show();
				smtgShown = true;
			}
		}

		if(!smtgShown) $('#board_noResults').show();
		else $('#board_noResults').hide();
	}

	//ADDING BOARD
	$(document).on('mouseenter', '#add_board', function(e) {
		$('#add_board.iconic *').css({fill: '#09F', stroke: '#09F'});
	});
	$(document).on('mouseleave', '#add_board', function(e) {
		$('#add_board.iconic *').css({fill: '#020024', stroke: '#020024'});
	});
	$(document).on('click', '#add_board', function(e) {
		$('#add_board_box').show();
		$('#nodesContainer').css('opacity', '0.5');
		$('#board_title').focus();
		addingBoard = true;

		if(sidebarExpanded) {
			$('#sidebar').animate({left: '-=385px'}, 200);
			sidebarExpanded = false;
		}
	});
	$(document).on('click', '#add_board_confirm', function(e) {
        if($('#board_title').val() != '') saveBoard({action: 'insert', title: $('#board_title').val(), public: $('input[name=public]:checked').val()});
	});
	$(document).on('keydown', function(e) {
        if(e.which == 13 && $('#board_title').is(':focus') && $('#board_title').val() != '') saveBoard({action: 'insert', title: $('#board_title').val(), public: $('input[name=public]:checked').val()});
	});
	$(document).on('click', '#add_board_cancel', function(e) {
		$('#board_title').val('');
		$('#add_board_box').hide();
		$('#nodesContainer').css('opacity', '1');
		addingBoard = false;
	});
});
