$(function() {
	$('#saving').hide();
	$('#showContent').hide();
	$('#colorChoices').hide();

	$('#changeContent').hide();
	$('#changeContent_change').hide();
	$('#changeContent_cancel').hide();
	$('#content_title input').hide();
	$('#content_text textArea').hide();

	new Board(board_id); //create the board

	titleMinWidth = $('.nodeTitle').css('width'); //width = min-width at the beginning, because no scaling occured (Used for expanding the title)

    //TODO remove this when the profile page will be done
    $(document).on('click', '#head_profile', function(e){
       alert("We are currently working on this feature. Sorry for the inconvenience.");
    });

	//SHOW SIDEBAR
	var sidebarExpanded = false;
	$(document).on('click', '#unfold_button', function(e) {
		if(!addingBoard && selectedTool != 6) {
			if(!sidebarExpanded) {
				$('#sidebar').css('box-shadow', '#999 2px 3px 7px').animate({left: '+=385px'}, 200);
				sidebarExpanded = true;
			}
			else {
                $('#sidebar').css('box-shadow', 'none').animate({left: '-=385px'}, 200);
				sidebarExpanded = false;
			}
		}
	});

	//MOVING THE NODES AREA
	var moving = false;
	var moveInfo = {};
	var area_startPositionX = 0, area_startPositionY = 0;
	var tool_initTop = 0, tool_initLeft = 0;
	$(document).on('mousedown', function(e) {
		if(!addingBoard && selectedTool != 6) {
			if(e.target === $('#nodesContainer')[0] || $(e.target).hasClass('linkBar')) { //clicked on background or a link bar
				moving = true;
				moveInfo.startY = e.clientY; //used to move the toolbar
				moveInfo.startX = e.clientX;
				moveInfo.offsetTop = e.clientY - $('#nodesArea')[0].offsetTop;
				moveInfo.offsetLeft = e.clientX - $('#nodesArea')[0].offsetLeft;

				area_startPositionX = e.clientX;
				area_startPositionY = e.clientY;

				tool_initTop = $('#toolbar2').position().top;
				tool_initLeft = $('#toolbar2').position().left;
			}
		}
	});
	$(document).on('mouseup', function(e) {
		if(moving) {
			moving = false;
			var area_endPositionX = e.clientX;
			var area_endPositionY = e.clientY;
			if(Math.abs(area_endPositionX - area_startPositionX) + Math.abs(area_endPositionY - area_startPositionY) >= 2) { //save only if moved
				saveBoard({action: 'update', board_id: board_id, yPos: $('#nodesArea').position().top, xPos: $('#nodesArea').position().left}); //Board id is setted in global variables
			}
		}
	});
	$(document).on('mousemove', function(e) {
		if(moving) {
			$('#nodesArea').css({top: e.clientY - moveInfo.offsetTop, left: e.clientX - moveInfo.offsetLeft});

			var movedY = e.clientY - moveInfo.startY;
			var movedX = e.clientX - moveInfo.startX;
			$('#toolbar2').css({top: (tool_initTop + movedY), left: (tool_initLeft + movedX)}); //move the toolbar #2 too (it's placed outside of the nodes area)
		}
	});

	//MOVING THE NODES
	var moveStartPositionX = 0, moveStartPositionY = 0;
	var mouseDownNode = null;
	$(document).on('mousedown', '.node:not(.board_node)', function(e) {
		if(selectedTool == 1 && !changingContent && !addingBoard) {
			var node = $.data(this, 'node').object;

			var tar = $(e.target);
			if(tar.hasClass('subtitle') || tar.parents('.subtitle').length) return; //an ellipsis also has the subtitle class

			mouseDownNode = node;
			node.element.css('z-index', '2');
			node.moveInfo.offsetTop = e.clientY - node.element[0].offsetTop;
			node.moveInfo.offsetLeft = e.clientX - node.element[0].offsetLeft;

			moveStartPositionX = e.clientX;
			moveStartPositionY = e.clientY;
		}
    });
	$(document).on('mouseup', function(e) {
		var moveEndPositionX = e.clientX;
		var moveEndPositionY = e.clientY;
		if(mouseDownNode && !mouseDownNode.changingTitle) {
			mouseDownNode.element.css('z-index', '1');
			if(Math.abs(moveEndPositionX - moveStartPositionX) + Math.abs(moveEndPositionY - moveStartPositionY) >= 2) { //don't save when only clicking the node
				save({action: 'update', xPos: mouseDownNode.element.position().left + mouseDownNode.addedVal.left,
					yPos: mouseDownNode.element.position().top + mouseDownNode.addedVal.top, id: mouseDownNode.id});
			}

			mouseDownNode = null;
		}
    });
	$(document).on('mousemove', function(e) {
		if(mouseDownNode) { //if it's not null
			mouseDownNode.element.css({top: (e.clientY - mouseDownNode.moveInfo.offsetTop), left: (e.clientX - mouseDownNode.moveInfo.offsetLeft)});
			refreshLinkBars(mouseDownNode);

			if(mouseDownNode.isSelected) mouseDownNode.deselected(); //stop showing content if dragged

			mouseDownNode.scale(1.1);
		}
    });

	//MOVING SUBTITLES
	var mouseDownSub = null
	var sub_startPos;
	$(document).on('mousedown', '.subtitle:not(.ellipsis)', function(e) {
		if(selectedTool == 1 && !changingContent && !addingBoard) {
			var subtitle = $.data(this, 'subtitle').object;
			mouseDownSub = subtitle;
			subtitle.element.css('z-index', '2');
			subtitle.moveInfo.offsetTop = e.clientY - subtitle.element[0].offsetTop;
			subtitle.moveInfo.offsetLeft = e.clientX - subtitle.element[0].offsetLeft;

			sub_startPos = subtitle.position;
		}
    });
	$(document).on('mouseup', function(e) {
		if(mouseDownSub) { //if it's not null
			mouseDownSub.mouseDown = false;
			mouseDownSub.element.css('z-index', '1');

			//update the new position to the subtitle element
			mouseDownSub.element.css({top: mouseDownSub.top, left: mouseDownSub.left});
			if(mouseDownSub.node.isScaled) mouseDownSub.node.scale(1.1); //reset scale so that subtitles are correctly placed

			if(sub_startPos != mouseDownSub.position) save({action: 'update', subtitle_position: mouseDownSub.position, id: mouseDownSub.id}); //save only if moved

			mouseDownSub = null;
		}
    });
	$(document).on('mousemove', function(e) {
		if(mouseDownSub && !mouseDownSub.isChanging) {
			var displacement = mouseDownSub.node.scaleFactor * 25/2; //25px is the height between 2 subtitles
			if(mouseDownSub.top - (e.clientY - mouseDownSub.moveInfo.offsetTop) >= displacement) {
				mouseDownSub.moveSubtitle(true); //called everytime the subtitle is moved by "displacement" pixels, because the subtitle.top is changed in the moveSubtitle method
				if(mouseDownSub.node.isScaled) mouseDownSub.node.scale(1.1); //reset scale so that subtitles are correctly placed
			}
			else if(mouseDownSub.top - (e.clientY - mouseDownSub.moveInfo.offsetTop) <= -displacement) {
				mouseDownSub.moveSubtitle(false);
				if(mouseDownSub.node.isScaled) mouseDownSub.node.scale(1.1); //reset scale so that subtitles are correctly placed
			}

			mouseDownSub.element.css({top: (e.clientY - mouseDownSub.moveInfo.offsetTop),
				left: (e.clientX - mouseDownSub.moveInfo.offsetLeft) }); //update the subtitle's position
		}
    });

	//SHOWING CONTENT (both nodes and subtitles)
	var lastClickTime = 0;
	var clickedInsideContent = false; //used to know if the content must be hidden (hide it if not clicked inside content)
	var content_clickStartPositionX = 0, content_clickStartPositionY = 0;

	$(document).on('mousedown', function(e) { //not on node because content shower is not in node
		if(selectedTool == 1 && !changingContent && !addingBoard) {
			var tar = $(e.target);
			if(tar[0] === $('#showContent')[0] || tar.parents('#showContent').length) {
				clickedInsideContent = true;
				return;
			}

			content_clickStartPositionX = e.clientX; //used when dragging the background
			content_clickStartPositionY = e.clientY;

			clickedInsideContent = false;
		}
	});
	$(document).on('mouseup', function(e) {
		content_clickEndPositionX = e.clientX;
		content_clickEndPositionY = e.clientY;
		var clickTime = new Date().getTime();

		var clickedOnNewNode = false;
		var tar = $(e.target);
		//HIDING CONTENT SHOWER
		if(Math.abs(content_clickEndPositionX - content_clickStartPositionX) +
			Math.abs(content_clickEndPositionY - content_clickStartPositionY) <= 2 //case where node is moved handled in 'moving nodes'
			&& clickTime - lastClickTime >= 400) { //avoid hiding the content shower when double clicking

			if(selectedNode) { //if it's not null
				if(tar[0] === $('#showContent')[0] || tar.parents('#showContent').length || tar[0] === $('#toolbar')[0] || tar.parents('#toolbar').length
					|| tar[0] === $('#toolbar2')[0] || tar.parents('#toolbar2').length || tar.is('header') || tar.parents('header').length || clickedInsideContent) return; //if mousedown happened inside the content shower or header

				var parentNode = tar.parents('.node:not(board_node)');
				if((parentNode.length && (tar.hasClass('subtitle') && !tar.hasClass('ellipsis') || tar.parents('.subtitle:not(.ellipsis)').length)) ||
					(parentNode.length && ($.data(parentNode[0], 'node').object !== selectedNode || selectedType == 'subtitle')) ||
					(tar.hasClass('node') && !tar.hasClass('board_node') && ($.data(tar[0], 'node').object !== selectedNode || selectedType == 'subtitle'))) { //to know if clicked on new node

					clickedOnNewNode = true;
				}

				selectedNode.deselected();

				if(!clickedOnNewNode) return; //if no node has been clicked to hide the content shower, don't show it again, so stop function
			}
		}

		//SHOWING CONTENT SHOWER
		//if "return" hasn't been called, ANOTHER NODE HAS BEEN CLICKED (or simply a new one), so find the one clicked on
		if(tar.hasClass('ellipsis') || tar.parents('.ellipsis').length) return; //do not select a node if clicking on ellipsis
		if(Math.abs(content_clickEndPositionX - content_clickStartPositionX) +
			Math.abs(content_clickEndPositionY - content_clickStartPositionY) <= 2) { //if the user moves the node, don't show content

			var tarParent = tar.parents('.node');
			var tarParentSub = tar.parents('.subtitle:not(.ellipsis)');
			if(tar.hasClass('subtitle') && !tar.hasClass('ellipsis')) {
				$.data(tar[0], 'subtitle').object.selected();
				moveIntoView();

				lastClickTime = clickTime;
			}
			else if(tarParentSub.length) {
				$.data(tarParentSub[0], 'subtitle').object.selected();
				moveIntoView();

				lastClickTime = clickTime;
			}
			else if(tar.hasClass('node') && !tar.hasClass('board_node')) {
				$.data(tar[0], 'node').object.selected();
				moveIntoView();

				lastClickTime = clickTime;
			}
			else if(tarParent.length && !tar.parents('.board_node').length) {
				$.data(tarParent[0], 'node').object.selected();
				moveIntoView();

				lastClickTime = clickTime;
			}
		}
	});

	//CHANGING CONTENT
	// var changingContent is setted outside of everything to be accessible by the toolbar
	$(document).on('mouseenter', '#showContent', function(e) {
		$('#changeContent').show();
	});
	$(document).on('mouseleave', '#showContent', function(e) {
		if(!changingContent) $('#changeContent').hide();
	});
	$(document).on('click', '#changeContentButton', function(e) {
		if(selectedType == 'subtitle') $.data($('#showContent')[0], 'subtitle').object.changeContent();
		else if(selectedType == 'node') $.data($('#showContent')[0], 'node').object.changeContent();
		moveIntoView(); //The text input takes more or less place than the usual content shower
	});
	$(document).on('dblclick', '.node:not(.board_node)', function(e) {
		if(selectedTool == 1 && !addingBoard && !changingContent) {
			var node = $.data(this, 'node').object;

			var tar = $(e.target);
			var tarParent = tar.parents('.subtitle');
			if(tar.hasClass('subtitle') && !tar.hasClass('ellipsis')) { //if a subtitle is double clicked
				$.data(tar[0], 'subtitle').object.changeContent();
				moveIntoView();
			}
			else if(tarParent.length) {
				$.data(tarParent[0], 'subtitle').object.changeContent();
				moveIntoView();
			}
			else { //it's on a node
				$.data(this, 'node').object.changeContent();
				moveIntoView();
			}
		}
	});
	$(document).on('click', '#changeContent_change', function(e) {
		if(changeContentType == 'subtitle') $.data($('#showContent')[0], 'subtitle').object.setContent(true);
		else if(changeContentType == 'node') $.data($('#showContent')[0], 'node').object.setContent(true);
		moveIntoView(); //the height of the content shower might have changed
	});
	$(document).on('click', '#changeContent_cancel', function(e) {
		if(changeContentType == 'subtitle') $.data($('#showContent')[0], 'subtitle').object.setContent(false);
		else if(changeContentType == 'node') $.data($('#showContent')[0], 'node').object.setContent(false);
		moveIntoView();
	});

	//SCALING NODES AND SHOWING TITLE
	$(document).on('mouseenter', '.node:not(.board_node)', function(e) {
		if(selectedTool != 2 && !changingContent && !addingBoard && selectedTool != 6) {
			var node = $.data(this, 'node').object;

			var tar = $(e.target);
			if(tar.hasClass('subtitle') || tar.parents('.subtitle').length) return;

			node.scale(1.1);
		}
    });
	$(document).on('mouseleave', '.node:not(.board_node)', function(e) {
		if(selectedTool != 2 && !changingContent && !addingBoard && selectedTool != 6) {
			$.data(this, 'node').object.resetScale(); //reset scale also retracts the title
		}
    });

	//SHOWING SUBTITLES' TITLES
	$(document).on('mouseenter', '.subtitle:not(.ellipsis)', function(e) {
		if(selectedTool != 2 && !changingContent && !addingBoard && selectedTool != 6) {
			$.data(this, 'subtitle').object.showSubtitle();
		}
	});
	$(document).on('mouseleave', '.subtitle:not(.ellipsis)', function(e) { //back to normal size
		if(selectedTool != 2 && !changingContent && !addingBoard && selectedTool != 6) {
			var subtitle = $.data(this, 'subtitle').object;
			if(!subtitle.node.isSelected) subtitle.hideSubtitle();
		}
	});

	//EXPANDING SUBTITLES
	var sub_clickStartPositionX, sub_clickStartPositionY;
	$(document).on('click', '.ellipsis', function(e) { //SHOW
		if(!changingContent && !addingBoard && selectedTool != 6) {
			$.data($(this).parents('.node')[0], 'node').object.expandSubtitles(); //find the node attached to the ellipsis
			ellipsisClicked = true;
		}
	});
	$(document).on('mousedown', function(e) {
		sub_clickStartPositionX = e.clientX;
		sub_clickStartPositionY = e.clientY;
	});
	$(document).on('mouseup', function(e) { //HIDE
		var sub_clickEndPositionX = e.clientX;
		var sub_clickEndPositionY = e.clientY;

		if(ellipsisClicked && ellipsisNode && Math.abs(sub_clickEndPositionX - sub_clickStartPositionX) + Math.abs(sub_clickEndPositionY - sub_clickStartPositionY) <= 2) {
			var tar = $(e.target);
			var tarParent = tar.parents('.node:not(board_node)');

			if(tar.hasClass('node')  && !tar.hasClass('board_node') && tar[0] === ellipsisNode.element[0]) return;
			else if(tarParent.length && tarParent[0] === ellipsisNode.element[0]) return;
			if(tar[0] === $('#toolbar')[0] || tar.parents('#toolbar').length || tar[0] === $('#toolbar2')[0] || tar.parents('#toolbar2').length) return; //avoid hiding subtitles when clicking on toolbars
			if(tar[0] === $('#overlay_subDelSingle')[0]) return; //don't hide if deleting subtitle

			ellipsisClicked = false;
			ellipsisNode.retractSubtitles();
		}
	});

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
            console.log(data);
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
                        currentA.attr('href', "board.php?id=" + data[i].board_id + "&node_id=" + data[i].id);
                    }
                    else { //subtitle
                        $('<div>').appendTo(currentA).addClass('search_subtitleResult');
                        currentA.attr('href', "board.php?id=" + data[i].board_id + "&sub_id=" + data[i].id);
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
		if($('#board_title').val() != '') saveBoard({action: 'insert', title: $('#board_title').val()});
	});
	$(document).on('keydown', function(e) {
		if(e.which == 13 && $('#board_title').is(':focus') && $('#board_title').val() != '') saveBoard({action: 'insert', title: $('#board_title').val()});
	});
	$(document).on('click', '#add_board_cancel', function(e) {
		$('#board_title').val('');
		$('#add_board_box').hide();
		$('#nodesContainer').css('opacity', '1');
		addingBoard = false;
	});
});
