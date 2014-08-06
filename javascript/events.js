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
});
