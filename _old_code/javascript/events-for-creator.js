$(function() {
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

			if(mouseDownNode.isSelected) mouseDownNode.deselect(); //stop showing content if dragged

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
});
