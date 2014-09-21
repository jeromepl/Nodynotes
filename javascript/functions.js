function refreshLinkBars(node) { //node is optionnal
	if(node) { //if the node is specified
		for(var i = 0; i < linkBars.length; i++) {
			if(linkBars[i].node1 === node || linkBars[i].node2 === node) linkBars[i].refreshPos();
		}
	}
	else {
		for(var i = 0; i < linkBars.length; i++) {
			linkBars[i].refreshPos();
		}
	}
}

function moveIntoView() { //Moves the nodesArea in case the information would be hidden (use only when content shower is shown)

    var areaY = $('#nodesArea').position().top, showY = $('#showContent').position().top, showHeight = $('#showContent').outerHeight(), viewHeight = $('#nodesContainer').outerHeight();
	var bottomY = areaY + showY + showHeight; //position of the bottom of the content shower
    var areaX = $('#nodesArea').position().left, showX = $('#showContent').position().left;
    var tool2Y = $('#toolbar2').position().top, headerHeight = $('header').outerHeight();
    var tool2RightX = $('#toolbar2').position().left + $('#toolbar2').outerWidth(), tool1X = $('#toolbar').position().left;

    //if its too high
    if(tool2Y < headerHeight) {
        $('#nodesArea').css('top', $('#nodesArea').position().top + (headerHeight - tool2Y) + 5); //5 to leave a little space
		$('#toolbar2').css('top', headerHeight + 5); //also move the 2nd toolbar (it's placed outside of the nodesArea)
    }

	//if it's too low
	if(bottomY > viewHeight && showHeight < viewHeight) { //if part of the content shower is hidden and if the content shower is not higher than the page
		$('#nodesArea').css('top', areaY - (bottomY - viewHeight));
		$('#toolbar2').css('top', $('#toolbar2').position().top - (bottomY - viewHeight));
	}

	//if it's too far to the left
	if(showX + areaX < 0) {
		$('#nodesArea').css('left', areaX + Math.abs(areaX + showX) + 5); //5 to leave a little space
		$('#toolbar2').css('left', $('#toolbar2').position().left + Math.abs(areaX + showX) + 5);
	}

    //if it's too far on the right
    if(tool2RightX > tool1X) {
        $('#nodesArea').css('left', $('#nodesArea').position().left - (tool2RightX - tool1X) - 5); //-5 to leave a little space
		$('#toolbar2').css('left', $('#toolbar2').position().left - (tool2RightX - tool1X) - 5);
    }
}

function save() {} //These methods are overidden in save.js (to avoid errors when someone else is viewing the board)
function saveBoard() {}

function deleteLinks(node) { //delete all links connected to a specific node (cannot do this in php because need to remove html elements too)
	for(var i = 0; i < linkBars.length; i++) {
		if(linkBars[i].node1 === node || linkBars[i].node2 === node) {

			linkBars[i].element.remove();
			save({action: 'delete', what2Del: 'link', link_id: linkBars[i].id});

			linkBars.splice(i, 1);
			deleteLinks(node);
			return;
		}
	}
}

var tool_colors = ['90F', '4140E1', '00D7DD', '2F2', 'FF0', 'FFA500']; //keys 4 and 5 are currently unused
function selectTool(toolID) {
	if(!changingContent && !addingBoard) { //do not select the tool if content is being changed

		if(selectedNode) selectedNode.deselected(); //deselect node

        if(selectedTool == 6 && toolID == 6) toolID = 1; //If the user wants to close the board properties box by re-clicking on the tool, select the default tool
		deselectTool(selectedTool); //deselect the previous tool

		var query = '#tool_img_' + toolID;
		selectedTool = toolID;
		$(query).addClass('activeTool').css('border-left', '5px #' + tool_colors[toolID - 1] + ' solid');
	}
}

function deselectTool(toolID) {
	var query = '#tool_img_' + toolID;
	$(query).removeClass('activeTool').css('border-left', 'none');

	if(toolID == 3 || toolID == 2) $('.node:not(.board_node)').css('cursor', 'move');
	if(toolID == 2) {
		$('#overlay_nodeDel').hide(); //just in case
		$('#overlay_subDelSingle').hide();
		$('#overlay_linkDel').hide();
	}
	else if(link_firstSelected && toolID == 3) { //reset the link tool
		$('#fakeLink').hide();
		link_firstSelected = null;
	}
    else if(toolID == 6) {
        $('#board_properties').hide();

        if($('#board_properties h1').css('display') == 'none') {
            $('#board_newTitle').val('').hide();
            $('#board_properties h1').show();
        }
    }
}

function nl2br(str) {
	return str.replace(/(\n)/g, '<br>');
}
function br2nl(str) {
	return str.replace(/(<br>)/g, '\n');
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function activateHtml(text) {
    return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp/g, "&");
}

function componentToHex(c) { //for the colorToHex function
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') { //if its already hex
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

	return '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue);
}
