function Node(title, text, color, icon, xPos, yPos, id) {
	this.isScaled = false;
	this.scaleFactor = 1;
	this.isSelected = false;
	this.isExpanded = false;
	this.title = title.replace(/(<([^>]+)>)/ig,""); //remove html elements
	this.text = text;
	this.color = '#' + color;
	this.icon = icon;
	this.id = id;
	this.subtitles = [];
	this.tags = [];
	this.moveInfo = {}; // Info about the movement of the node (setted in the mousedown/mouseup/mousemove events)

	this.element = $('<div>').appendTo('#nodesArea').addClass('node').css({top: yPos, left: xPos, background: 'radial-gradient(#999 40%,' + this.color + ' 65%)'}).attr('id', 'node' + this.id);
	$.data(this.element[0], 'node', {object: this}); //save the object's reference to be able to act on it in event listeners

	this.titleElement = $('<h3>').appendTo(this.element).addClass('nodeTitle').html(this.title);

    $('<span>').appendTo(this.element); // this empty span allows the image to be vertically centered (put it anyway in case an iconis added later)
	if(icon != 'none') { //if there is an icon
		$('<img>').appendTo(this.element).attr({'data-src': 'images/icons/' + this.icon + '.svg', id: 'icon_node' + this.id}).addClass('iconic-md').hide();
		var iconEl;
		iconic.inject('#icon_node' + this.id, {
			each: function (svg) {
				iconEl = $(svg);
			}
		}, function (count) {
			iconEl.show();
		});
	}

	//add an element inside the tagbox to contain all tags of this node
	$('<div>').appendTo('#all_tags').attr('id', 'tags' + this.id).hide();

	this.paddingTop = this.titleElement.css('padding-top');
	this.paddingLeft = this.titleElement.css('padding-left');

	//add a subtitle
	this.addSubtitle = function(id, position, title, text) {
		this.subtitles.push(new Subtitle(id, position, title, text, this));
	}

	//add a tag
	this.addTag = function(id, title) {
		this.tags.push(new Tag(id, title, this));
	}

	//scaling variables
	this.initVal = {
			width: this.element.width(),
			height: this.element.height(),

			titleWidth: this.titleElement.width(),
			titleHeight: this.titleElement.height(),
			titleTop: this.titleElement.position().top,
			titleLeft: this.titleElement.position().left,
			titleFontSize: parseInt(this.titleElement.css('font-size')),
			titlePaddingTop: parseInt(this.titleElement.css('padding-top'))
		};
	this.addedVal = { // so that the origin point of the scaling is the center of the circle
			top: 0,
			left: 0
		};
	this.scale = function(factor) {
		if(!this.isScaled) {
			this.addedVal.top = (this.initVal.height * factor - this.initVal.height) / 2;
			this.addedVal.left = (this.initVal.width * factor - this.initVal.width) / 2;

			this.element.css({width: this.initVal.width * factor, height: this.initVal.height * factor});
			this.element.css({top: this.element.position().top - this.addedVal.top, left: this.element.position().left - this.addedVal.left});
			this.titleElement.css({width: this.initVal.titleWidth * factor, height: this.initVal.titleHeight * factor,
				top: this.initVal.titleTop * factor, left: this.initVal.titleLeft * factor,
				fontSize: this.initVal.titleFontSize * factor, paddingTop: this.initVal.titlePaddingTop * factor });

			this.scaleFactor = factor;
			this.isScaled = true;

			this.showTitle();
		}
		//put this one out to be able to reset it whenever subtitles are being moved
		for(var i = 0; i < this.subtitles.length; i++) {
			this.subtitles[i].element.css({top: this.subtitles[i].top * factor, left: this.subtitles[i].left * factor});
			if(this.subtitles[i].ellipsis) {
				this.subtitles[i].ellipsis.css({top: (-25 + 4 * 25) * factor, left: this.subtitles[i].xPos[4] * factor});
			}
		}
	}

	this.resetScale = function() {
		if(this.isScaled && !this.isSelected) {
			this.element.css({width: this.initVal.width, height: this.initVal.height});
			this.element.css({top: this.element.position().top + this.addedVal.top, left: this.element.position().left + this.addedVal.left});
			this.titleElement.css({width: this.initVal.titleWidth, height: this.initVal.titleHeight,
				top: this.initVal.titleTop, left: this.initVal.titleLeft,
				fontSize: this.initVal.titleFontSize, paddingTop: this.initVal.titlePaddingTop });
			if($('#newTitle')[0]) this.titleElement.css('padding-top', '0'); // remove the padding if the title is being modified

			for(var i = 0; i < this.subtitles.length; i++) {
				this.subtitles[i].element.css({top: this.subtitles[i].top, left: this.subtitles[i].left});
				if(this.subtitles[i].ellipsis) {
					this.subtitles[i].ellipsis.css({top: -25 + 4 * 25, left: this.subtitles[i].xPos[4]});
				}
			}

			this.isScaled = false;
			this.scaleFactor = 1;
			this.addedVal.top = 0;
			this.addedVal.left = 0;

			this.hideTitle();
		}
	}

	this.showTitle = function() {
		this.titleElement.css('min-width', this.titleElement.css('width'));
		this.titleElement.css('width', 'auto');
	}

	this.hideTitle = function() {
		this.titleElement.css('min-width', nodeTitleMinWidth);
	}

	this.selected = function() {
		$('#showContent').show();
		$('#showContent p').html(this.text); //html so that <br> tags are not removed
		$('#showContent h1').text(this.title);
        $('#tool2_img_2').attr('title', 'Delete Node');

		/*if(this.element.position().left + $('#nodesArea').position().left > $('#showContent').outerWidth() + 30) {*/ // to show the content shower to the right or left of the element
			$('#showContent').css({top: this.element.position().top - 25, left: this.element.position().left - 280});
			$('#showContent #pointer').attr('class', 'pointerRight');
		/*}
		else {
			$('#showContent').css({top: this.element.position().top - 25, left: this.element.position().left
				+ this.element.outerWidth() + 30});
			$('#showContent #pointer').attr('class', 'pointerLeft');
		}*/

		selectedNode = this;
		this.isSelected = true;

		this.expandSubtitles();
		for(var i = 0; i < this.subtitles.length; i++) {
			this.subtitles[i].showSubtitle(); //need to be before the scale so that it acts on all subtitles
		}
		this.scale(1.1); //so that the node stays scaled

		$('.node:not(.board_node)').css('opacity', '0.6');
		$('.linkBar').css('opacity', '0.3');
		this.element.css('opacity', '1');
		this.element.css('z-index', '2');

		var distLeft = this.element.position().left + this.element.outerWidth() / 2 - $('#toolbar2').outerWidth() / 2 + $('#nodesArea').position().left;
		var distTop = this.element.position().top - 100 + $('#nodesArea').position().top;
		$('#toolbar2').css({left: distLeft, top: distTop});
		$('#toolbar2').show();

		$('#tags' + this.id).css('display', 'inline-block'); //show the good set of tags (use css to show them as inline-blocks)

		$.data($('#toolbar2')[0], 'node', {object: this});
		$.data($('#showContent')[0], 'node', {object: this}); //save the node in the showContent element
		selectedType = 'node';
	}

	this.deselected = function() {
		$('#showContent').hide(); //remove the content shower
		$('.node').css('opacity', '1');
		$('.linkBar').css('opacity', '1');

		selectedNode = null;
		this.isSelected = false;

		this.retractSubtitles();
		for(var i = 0; i < this.subtitles.length; i++) { //reset subtitle
			this.subtitles[i].hideSubtitle();
			if(this.subtitles[i].isSelected) {
				this.subtitles[i].element.css('border', 'none');
				this.subtitles[i].isSelected = false;
			}
		}
		this.resetScale();
		this.element.css('z-index', '1');

		$('#toolbar2').hide();
		$('#tags' + this.id).hide(); //hide tags for the next selected node

		if(colorChanging) {
			$('#colorChoices').hide();
			colorChanging = false;
		}
		else if(tagsOpen) {
			$('#tag_box').hide();
			$('#tag_name').val('');
			tagsOpen = false;
		}
        else if(iconsOpen) {
			$('#icon_box').hide();
			iconsOpen = false;
		}
	}

	this.changeContent = function() {
		changingContent = true;
		$('#content_title input').show().val(this.title).select();
		this.text = br2nl(this.text);
		$('#content_text textArea').show().val(this.text).css('height', $('#content_text p').innerHeight());
		$('#content_title h1').hide();
		$('#content_text p').hide();
		$('#changeContent').show();
		$('#changeContentButton').hide();
		$('#changeContent_change').show();
		$('#changeContent_cancel').show();

		changeContentType = 'node';
		selectedType = 'node';
	}

	this.setContent = function(saveIt) {
		changingContent = false;
		if(saveIt) {
			this.title = $('#content_title input').val().replace(/(<([^>]+)>)/ig,"");
			this.text = nl2br($('#content_text textarea').val());
			this.titleElement.text(this.title);
			$('#showContent p').html(this.text);
			$('#showContent h1').text(this.title);

			save({action: 'update', title: this.title, text: this.text, id: this.id});
		}
		$('#content_title input').hide();
		$('#content_text textArea').hide();
		$('#content_title h1').show();
		$('#content_text p').show();

		$('#changeContentButton').show();
		$('#changeContent_change').hide();
		$('#changeContent_cancel').hide();
	}

	this.expandSubtitles = function() {
		for(var i = 0; i < this.subtitles.length; i++) {
			this.subtitles[i].element.show();
			if(this.subtitles[i].ellipsis) this.subtitles[i].ellipsis.hide();
		}
		this.isExpanded = true;
        this.element.css('z-index', 2);
		ellipsisNode = this; //save the node's reference to know which ellipsis was clicked
	}

	this.retractSubtitles = function() {
		for(var i = 0; i < this.subtitles.length; i++) {
			if(this.subtitles[i].position >= 4) this.subtitles[i].element.hide();
			if(this.subtitles[i].ellipsis) this.subtitles[i].ellipsis.show();
		}
		this.isExpanded = false;
        this.element.css('z-index', 1);
		ellipsisNode = null;
	}

	this.deleteNode = function() {
		deleteLinks(this);

		this.element.remove();
		save({action: 'delete', what2Del: 'node', node_id: this.id});
		//deleting subtitles related to the node is done in php

		this.deselected();
		if(changingContent) this.setContent(false);

		for(var i = 0; i < nodes.length; i++) {
			if(this === nodes[i]) { //find the index of the node
				nodes.splice(i, 1);
				break;
			}
		}
	}
}
