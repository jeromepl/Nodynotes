$(function() {
	var id = -1; //any unused id works

	//TOOLBAR #1
	selectTool(1); //default tool

	$(document).on('click', '#tool_img_1', function() { // Move/Select tool (default)
		selectTool(1);
    });

	$(document).on('click', '#tool_img_2', function() { // Delete tool
		selectTool(2);
		$('.node:not(.board_node)').css('cursor', 'default');
	});
	//EVENT LISTENERS FOR DELETING
	var enteredNode = null;
	var wasExpanded = false;
	var nodeBack, titleBack;
	$(document).on('mouseenter', '.node:not(.board_node)', function(e) {
		if(selectedTool == 2) {
			if($(e.target).hasClass('subtitle') || $(e.target).parents('.subtitle').length) return;

			var node = $.data(this, 'node').object;

			//prepare
			$('#overlay_nodeDel').css({top: node.element.position().top, left: node.element.position().left});
			var subKey = 2; //first child is title
			for(var i = 0; i < node.subtitles.length; i++) {
				if(node.subtitles[i].position < 4) {
					$('.overlay_subDel:nth-child(' + (subKey++) + ')').css({top: node.subtitles[i].top + 2, left: node.subtitles[i].left + 2, //+ 2 because of no border on fake node
						width: node.subtitles[i].element.width()}).show();
				}
				else if(node.subtitles[i].position == 4) {
					$('.overlay_subDel:last-child').css({top: node.subtitles[i].top + 2, left: node.subtitles[i].left + 2, //+ 2 because of no border on fake node
						width: node.subtitles[i].ellipsis.width()}).show();
					subKey++;
				}
			}

			if(subKey <= 6) { //some overlay subs to hide
				for(var i = subKey; i <= 6; i++) {
					$('.overlay_subDel:nth-child(' + (subKey++) + ')').hide();
				}
			}

			if(node.isExpanded) {
				node.retractSubtitles(); //In order to avoid not having enough overlay subtitles
				wasExpanded = true;
			}

			//show
			$('#overlay_nodeDel').show();
			$('#overlay_subDelSingle').hide(); //just in case
			$('#overlay_linkDel').hide();
			enteredNode = node;
		}
	});
	$(document).on('mouseleave', '#overlay_nodeDel', function(e) { //enter node, leave board_node because it's now over the node
		if(selectedTool == 2) {
			$('#overlay_nodeDel').hide();
			if(wasExpanded) enteredNode.expandSubtitles(); //re-expand subtitles if they were shown before
			wasExpanded = false; //reset
		}
	});
	$(document).on('click', '#overlay_nodeDel', function(e) {
		if(selectedTool == 2) {
			enteredNode.deleteNode();
			$('#overlay_nodeDel').hide();
		}
	});
	var enteredSub = null;
	$(document).on('mouseenter', '.subtitle:not(.ellipsis)', function(e) {
		if(selectedTool == 2) {
			var subtitle = $.data(this, 'subtitle').object;

			$('#overlay_subDelSingle').css({top: subtitle.top + subtitle.node.element.position().top + 2, //+ 2 because of no border on fake node
				left: subtitle.left + subtitle.node.element.position().left + 2,
				width: subtitle.element.width()}).show();

			$('#overlay_nodeDel').hide(); //just in case
			$('#overlay_linkDel').hide();
			enteredSub = subtitle;
		}
	});
	$(document).on('mouseleave', '#overlay_subDelSingle', function(e) {
		if(selectedTool == 2) {
			$('#overlay_subDelSingle').hide();
		}
	});
	$(document).on('click', '#overlay_subDelSingle', function(e) {
		if(selectedTool == 2) {
			enteredSub.deleteSubtitle();
			$('#overlay_subDelSingle').hide();
		}
	});
	var enteredLink = null;
	$(document).on('mouseenter', '.linkBar', function(e) {
		if(selectedTool == 2) {
			var linkBar = $.data(this, 'linkBar').object;

			$('#overlay_linkDel').css({width: linkBar.length, top: linkBar.top, left: linkBar.left,
				webkitTransform: "rotate(" + linkBar.angle + "deg)",
				MozTransform: "rotate(" + linkBar.angle + "deg)",
				msTransform: "rotate(" + linkBar.angle + "deg)",
				OTransform: "rotate(" + linkBar.angle + "deg)"
				}).show();

			$('#overlay_nodeDel').hide(); //just in case
			$('#overlay_subDelSingle').hide()
			enteredLink = linkBar;
		}
	});
	$(document).on('mouseleave', '#overlay_linkDel', function(e) {
		if(selectedTool == 2) {
			$('#overlay_linkDel').hide();
		}
	});
	$(document).on('click', '#overlay_linkDel', function(e) {
		if(selectedTool == 2) {
			enteredLink.deleteLink();
			$('#overlay_linkDel').hide();
		}
	});

	//Linking variables
	var x1, y1, x2, y2, deltaX, deltaY, angle, length;
	var overNode = false;
	var offsetHeight;
	$(document).on('click', '#tool_img_3', function() { // Link tool
		selectTool(3);

		if(!changingContent && !addingBoard) {
			$('.node:not(.board_node)').css('cursor', 'default');
		}
    });
	//EVENT LISTENERS FOR LINKING
	$(document).on('mousedown', '.node:not(.board_node)', function(e) {
		if(selectedTool == 3 && !changingContent && !addingBoard && selectedTool != 6) {
			var node = $.data(this, 'node').object;

			if(!link_firstSelected) {
				offsetHeight = $('#fakeLink')[0].offsetHeight;

				link_firstSelected = node;
				x1 = node.element.position().left + node.element[0].offsetWidth/2 - offsetHeight/4;
				y1 = node.element.position().top + node.element[0].offsetHeight/2 - offsetHeight/2;
				$('#fakeLink').css('width', 0).show(); //to make a length of 0 when starting
			}
			else if(node !== link_firstSelected){
				for(var j = 0; j < linkBars.length; j++) { //verify if the link already exists
					if((linkBars[j].node1 === node && linkBars[j].node2 === link_firstSelected) || (linkBars[j].node1 === link_firstSelected && linkBars[j].node2 === node)) return;
				}

				linkBars.push(new LinkBar(id--, node, link_firstSelected));

				save({action: 'insert', what2Add: 'link', node1_id: node.id, node2_id: link_firstSelected.id},
					linkBars[linkBars.length - 1]);

				$('#fakeLink').hide();
				link_firstSelected = null;
				//other variables resetted in "deselectTool"
			}
		}
	});
	$(document).on('mouseenter', '.node:not(.board_node)', function(e) {
		if(selectedTool == 3) {
			overNode = true;
			var node = $.data(this, 'node').object;
			x2 = node.element.position().left + node.element[0].offsetWidth/2 - offsetHeight/4;
			y2 = node.element.position().top + node.element[0].offsetHeight/2 - offsetHeight/2;
		}
	});
	$(document).on('mouseleave', '.node:not(.board_node)', function(e) {
		if(selectedTool == 3) overNode = false;
	});
	$(document).on('mousemove', function(e) {
		if(link_firstSelected && selectedTool == 3) { //if link_firstSelected is not null
			if(!overNode) {
				x2 = e.clientX  - offsetHeight/4 - $('#nodesArea').position().left;
				y2 = e.clientY  - offsetHeight/2 - $('#nodesArea').position().top;
			}
			deltaX = x2 - x1;
			deltaY = y2 - y1;

			angle = Math.atan(deltaY / deltaX);
			angle = angle / Math.PI * 180; //convert in degrees
			length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

			$('#fakeLink').css({width: length + 'px',
				webkitTransform: "rotate(" + angle + "deg)",
				MozTransform: "rotate(" + angle + "deg)",
				msTransform: "rotate(" + angle + "deg)",
				OTransform: "rotate(" + angle + "deg)",
				top: (y1 + deltaY/2) + 'px',
				left: (x1 + deltaX/2 - length/2) + 'px'
				});
		}
	});

	$(document).on('click', '#tool_img_4', function() { // Add node
		if(selectedTool == 3) selectTool(3); //reset the link tool

		if(!changingContent && !addingBoard && selectedTool != 6) {
			nodes.push(new Node('Title', 'Change content...', '00d7dd', 'none', $('#nodesContainer').outerWidth() / 2.2 - $('#nodesArea').position().left,
			 $('#nodesContainer').outerHeight() / 2.6 - $('#nodesArea').position().top, id--));

			if(selectedNode) {
				var newLinkBar = new LinkBar(id--, selectedNode, nodes[nodes.length - 1]);
				linkBars.push(newLinkBar);

				var position = nodes[nodes.length - 1].element.position(); //to clarify
				save({action: 'insert', what2Add: 'node', board_id: board_id, xPos: position.left, yPos: position.top, color: '00d7dd', icon: 'none'},
					nodes[nodes.length - 1], selectedNode, newLinkBar); //also send selected node and the new link bar the save it

				selectedNode.deselected(); //to select the next one
			}
			else {
				var position = nodes[nodes.length - 1].element.position(); //to clarify
				save({action: 'insert', what2Add: 'node', board_id: board_id, xPos: position.left, yPos: position.top, color: '00d7dd', icon: 'none'},
					nodes[nodes.length - 1]);
			}

			//Change the content of the new node
			nodes[nodes.length - 1].selected();
			nodes[nodes.length - 1].changeContent();
		}
	});

	$(document).on('click', '#tool_img_5', function() { // Undo action
        alert("We are currently working on this feature. Sorry for the inconvenience.");
    });

	$(document).on('click', '#tool_img_6', function() { //Board properties
        $('#board_properties').show(); //board properties is hiden in the deselectTool() function
        selectTool(6);
	});
    //BOARD PROPERTIES EVENTS
    $(document).on('click', '#properties_close', function(e) {
        selectTool(6); //this will deselect the property tool and select the move tool since the property tool is already selected
    });
    $(document).on('click', '#board_changetitle', function(e) {
        if($('#board_properties h1').is(':visible')) {
            $('#board_properties h1').hide();
            $('#board_newTitle').val($('#board_properties h1').text()).show().select();
        }
        else
            changeBoardTitle($('#board_newTitle').val());

    });
    $(document).on('keypress', '#board_newTitle', function(e) {
        if(e.which == 13 && $('#board_newTitle').val() != '')
            changeBoardTitle($('#board_newTitle').val());
    });
    function changeBoardTitle(newTitle) {
        if(newTitle != '') {
            $('#board_newTitle').val('').hide();
            $('#board_properties h1').text(newTitle).show();
            $('#board_node' + board_id + ' .nodeTitle').text(newTitle);
            saveBoard({action: 'update', board_id: board_id, title: newTitle});
        }
    }
    $(document).on('click', '#board_delete', function(e) {
        //TODO redirect to another board after deleting this one and verify if this is last user's board
        /*var del = confirm("Are you sure you want to delete this board? This action can't be undone!");
        if(del) saveBoard({action: 'delete', board_id: board_id});*/
        alert("We are currently working on this feature. Sorry for the inconvenience.");
    });

	/** TOOLBAR #2 **/
	$(document).on('click', '#tool2_img_1', function() { // Add subtitle
		if(!changingContent && !addingBoard && selectedTool != 6) {
			var node = $.data($('#toolbar2')[0], 'node').object;
			node.deselected(); //deselect to reset the subtitles
			node.addSubtitle(id--, node.subtitles.length, 'Subtitle', 'Change content...');

			save({action: 'insert', what2Add: 'subtitle', node_id: node.id, pos: node.subtitles.length - 1},
				node.subtitles[node.subtitles.length - 1]);

			node.subtitles[node.subtitles.length - 1].selected();
			node.subtitles[node.subtitles.length - 1].changeContent();
		}
	});

	$(document).on('click', '#tool2_img_2', function() { // Delete node
		if(selectedType == 'subtitle') {
			var subtitle = $.data($('#toolbar2')[0], 'subtitle').object;
			subtitle.node.selected();
			subtitle.deleteSubtitle();
		}
		else
			$.data($('#toolbar2')[0], 'node').object.deleteNode();
    });

	$(document).on('click', '#tool2_img_3', function() { // Change color
		if(!colorChanging) {
			$('#colorChoices').show();
			colorChanging = true;
		}
		else { //toggle
			$('#colorChoices').hide();
			colorChanging = false;
		}

		if(tagsOpen) { //don't show tags and colors at the same time
			$('#tag_box').hide();
			$('#tag_name').val('');
			tagsOpen = false;
		}
        if(iconsOpen) { //don't show icons and colors at the same time
			$('#icon_box').hide();
			tagsOpen = false;
		}
    });
	//COLOR CHANGING
	$(document).on('mouseenter', '.colorBox', function(e) { //to give a preview
		node = $.data($('#toolbar2')[0], 'node').object;
		node.element.css('background', 'radial-gradient(#999 40%,' + colorToHex($(this).css('background-color')) + ' 65%)');
	});
	$(document).on('mouseleave', '.colorBox', function(e) {
		node = $.data($('#toolbar2')[0], 'node').object;
		node.element.css('background', 'radial-gradient(#999 40%,' + node.color + ' 65%)');
	});
	$(document).on('click', '.colorBox', function(e) {
		node = $.data($('#toolbar2')[0], 'node').object;

		node.color = colorToHex($(this).css('background-color'));
		node.element.css('background', 'radial-gradient(#999 40%,' + node.color + ' 65%)');
		$('#colorChoices').hide();
		colorChanging = false;

		save({action: 'update', id: node.id, color: node.color.substr(1)}); // remove the '#'
	});

	$(document).on('click', '#tool2_img_4', function() { // Change icon
        if(colorChanging) { //don't show icons and colors at the same time
			$('#colorChoices').hide();
			colorChanging = false;
		}
        if(tagsOpen) { //don't show tags and icons at the same time
			$('#tag_box').hide();
            $('#tag_name').val('');
			tagsOpen = false;
		}

        if(!iconsOpen) {
			$('#icon_box').show();
			iconsOpen = true;

            //If icons have not yet loaded, load them
            if($('.icon_choice').length <= 1) {
                //Add the "no icon" div in javascript because it was displaying weirdly in html
                var tempDiv = $('<div>').appendTo('#all_icons').addClass('icon_choice selectedIcon').attr('id', 'no_icon');
                $('<img>').appendTo(tempDiv).attr({'data-src': 'images/icons/x.svg', title: 'No icon'}).addClass('iconic-md').hide();
                var iconEl;
                iconic.inject('#no_icon img', {
                    each: function (svg) {
                        iconEl = $(svg);
                    }
                }, function (count) {
                    iconEl.show();
                });

                $.getJSON("server_side/listIcons.php", function(data) {

                    for(var i = 0; i < data.length; i++) {
                        var tempDiv = $('<div>').appendTo('#all_icons').addClass('icon_choice').attr('id', 'iconDiv_' + data[i].replace(/\.svg/, ''));
                        $('<img>').appendTo(tempDiv).attr({'data-src': 'images/icons/' + data[i], id: data[i].replace(/\.svg/, '') + '_icon', title: data[i].replace(/\.svg/, '')}).addClass('iconic-md').hide();
                        var iconEl;
                        iconic.inject('#' + data[i].replace(/\.svg/, '') + '_icon', {
                            each: function (svg) {
                                iconEl = $(svg);
                            }
                        }, function (count) {
                            iconEl.show();
                        });
                    }
                    selectIcon($.data($('#toolbar2')[0], 'node').object); //outline the current icon

                }).fail(function(jqXHR, textStatus, errorThrown) {
                    alert("An error occured while trying to load icons. Please check your internet connection and try again later.");
                });
            }
            else
                selectIcon($.data($('#toolbar2')[0], 'node').object); //outline the current icon
		}
		else { //toggle
			$('#icon_box').hide();
			iconsOpen = false;
		}
	});
    //ICONS EVENTS AND FUNCTIONS
    $(document).on('click', '.icon_choice', function(e) {
        var tempNode = $.data($('#toolbar2')[0], 'node').object;
        tempNode.icon = $(this).attr('id').replace('iconDiv_', '');
        if(tempNode.icon == 'no_icon') tempNode.icon = 'none';
        $('#icon_node' + tempNode.id).remove(); //delete the old icon

        if(tempNode.icon != 'none') { //Otherwise don't add an icon
            $('<img>').appendTo(tempNode.element).attr({'data-src': 'images/icons/' + tempNode.icon + '.svg', id: 'icon_node' + tempNode.id}).addClass('iconic-md').hide();
            var iconEl;
            iconic.inject('#icon_node' + tempNode.id, { //inject the new icon
                each: function (svg) {
                    iconEl = $(svg);
                }
            }, function (count) {
                iconEl.show();
            });
        }

		save({action: 'update', id: tempNode.id, icon: tempNode.icon});

        $('#icon_box').hide();
        iconsOpen = false;
	});
    function selectIcon(node) {
        $('.selectedIcon').removeClass('selectedIcon'); //deselect the previous icon
        if(node.icon != 'none') { //outline the current icon
            $('#iconDiv_' + node.icon).addClass('selectedIcon');
        }
        else {
            $('#no_icon').addClass('selectedIcon');
        }
    }

	$(document).on('click', '#tool2_img_5', function() { // Inputs/Outputs
	});

	$(document).on('click', '#tool2_img_6', function() { // Manage tags
		if(!tagsOpen) {
			$('#tag_box').show();
			tagsOpen = true;
		}
		else { //toggle
			$('#tag_box').hide();
			$('#tag_name').val('');
			tagsOpen = false;
		}

		if(colorChanging) { //don't show tags and colors at the same time
			$('#colorChoices').hide();
			colorChanging = false;
		}
        if(iconsOpen) { //don't show tags and icons at the same time
			$('#icon_box').hide();
			iconsOpen = false;
		}
	});
	//TAGS EVENTS
	$(document).on('click', '#add_tag', function(e) {
		addTagEvent();
	});
	$(document).on('keydown', function(e) {
		if(e.which == 13 && $('#tag_name').is(":focus")) {
			addTagEvent();
		}
	});
	function addTagEvent() {
		var title = $('#tag_name').val();
		var node = $.data($('#toolbar2')[0], 'node').object;
		if(title != '') {
			node.addTag(id--, title);
			$('#tag_name').val('');

			save({action: 'insert', what2Add: 'tag', node_id: node.id, title: title}, node.tags[node.tags.length - 1]);
		}
	}
	$(document).on('click', '.tag_x', function(e) {
		var tag = $.data($(this).parent('.tag')[0], 'tag').object;
		tag.deleteTag();
	});

	$(document).on('click', '#tool2_img_7', function() { // Sublink
	});
});
