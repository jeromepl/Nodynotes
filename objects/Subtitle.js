function Subtitle(id, position, title, text, node) {
	this.id = id;
	this.position = position; //starts from 0
	this.title = title;
	this.text = text;
	this.top = 0;
	this.left = 0;
	this.node = node;
	this.isChanging = false;
	this.isSelected = false;
	this.moveInfo = {}; // Info about the movement of the node (setted in the mousedown/mouseup/mousemove events)
	
	this.xPos = [52, 75, 86, 75, 52];
	
	if (this.position < 4) {
		this.left = this.xPos[this.position];
	}
	else this.left = this.xPos[4];
	
	this.top = -25 + this.position * 25;
	this.element = $('<h4>').appendTo(this.node.element).addClass('subtitle').text(this.title).css({top: this.top * this.node.scaleFactor, left: this.left}).attr('id', 'subtitle' + this.id);
	$.data(this.element[0], 'subtitle', {object: this}); //save the object's reference to be able to act on it in event listeners
	
	this.paddingTop = this.element.css('padding-top');
	this.paddingLeft = this.element.css('padding-left');

	if (this.position == 4) {
		this.ellipsis = $('<h4>').appendTo(this.node.element).addClass('subtitle ellipsis').text('...'); //create an ellipsis
	}
	if (this.position >= 4) {
		this.element.hide();
	}
	
	this.selected = function() {
		this.node.selected();
		this.isSelected = true;
		//show the new title and text corresponding to the subtitle
		$('#showContent p').html(this.text); //html so that <br> tags are not removed
		$('#showContent h1').text(this.title);
        $('#tool2_img_2').attr('title', 'Delete Subtitle');
		
		this.element.css('border', 'solid 2px #09F');
		
		$.data($('#toolbar2')[0], 'subtitle', {object: this});
		$.data($('#showContent')[0], 'subtitle', {object: this}); //add the subtitle in the showContent element
		selectedType = 'subtitle';
	}
	
	this.changeContent = function() {
		changingContent = true;
		this.isChanging = true;
		$('#content_title input').show().val(this.title).select();
		this.text = br2ln(this.text);
		$('#content_text textArea').show().val(this.text).css('height', $('#content_text p').innerHeight());
		$('#content_title h1').hide();
		$('#content_text p').hide();
		$('#changeContent').show();
		$('#changeContentButton').hide();
		$('#changeContent_change').show();
		$('#changeContent_cancel').show();
		
		changeContentType = 'subtitle';
		selectedType = 'subtitle';
	}
	
	this.setContent = function(saveIt) {
		changingContent = false;
		this.isChanging = false;
		if(saveIt) {
			this.title = $('#content_title input').val().replace(/(<([^>]+)>)/ig,"");
			this.text = nl2br($('#content_text textarea').val());
			this.element.text(this.title);
			$('#showContent p').html(this.text);
			$('#showContent h1').text(this.title);
						
			save({action: 'update', subtitle: this.title, text: this.text, id: this.id});
		}
		$('#content_title input').hide();
		$('#content_text textArea').hide();
		$('#content_title h1').show();
		$('#content_text p').show();
					
		$('#changeContentButton').show();
		$('#changeContent_change').hide();
		$('#changeContent_cancel').hide();
	}
	
	this.moveSubtitle = function(up) {
		if(up) {
			this.position -= 1;
			//make sure position exists
			if(ellipsisNode) { //if it's not null
				if(this.position > this.node.subtitles.length - 1) this.position = this.node.subtitles.length - 1;
			}
			else if(this.position > 3) this.position = 3;
			
			if(this.position < 0) this.position = 0;
			
			for(var i = 0; i < this.node.subtitles.length; i++) {
				if(this.node.subtitles[i].position == this.position && this.node.subtitles[i] !== this) { //find other subtitles with the same position
					this.node.subtitles[i].position += 1;
					this.node.subtitles[i].top = -25 + this.node.subtitles[i].position * 25;
					if(this.node.subtitles[i].position > 4) this.node.subtitles[i].left = this.xPos[4];
					else this.node.subtitles[i].left = this.xPos[this.node.subtitles[i].position];
					
					save({action: 'update', subtitle_position: this.node.subtitles[i].position, id: this.node.subtitles[i].id}); //save the new position
				}
			}
		}
		else {
			this.position += 1;
			//make sure position exists
			if(ellipsisNode || this.node.subtitles.length < 4) {
				if(this.position > this.node.subtitles.length - 1) this.position = this.node.subtitles.length - 1;
			}
			else if(this.position > 3) this.position = 3;
			
			if(this.position < 0) this.position = 0;
			
			for(var i = 0; i < this.node.subtitles.length; i++) {
				if(this.node.subtitles[i].position == this.position && this.node.subtitles[i] !== this) {
					this.node.subtitles[i].position -= 1;
					this.node.subtitles[i].top = -25 + this.node.subtitles[i].position * 25;
					if(this.node.subtitles[i].position > 4) this.node.subtitles[i].left = this.xPos[4];
					else this.node.subtitles[i].left = this.xPos[this.node.subtitles[i].position];
					
					save({action: 'update', subtitle_position: this.node.subtitles[i].position, id: this.node.subtitles[i].id}); //save the new position
				}
			}
		}
		
		this.refreshPosition();
		
		//then update the subtitles position
		for(var i = 0; i < this.node.subtitles.length; i++) {
			if(this.node.subtitles[i].element && this.node.subtitles[i] !== this) {
				this.node.subtitles[i].element.css({top: this.node.subtitles[i].top, left: this.node.subtitles[i].left});
			}
		}
		
		//saving of the subtitle moved is done in nodes.php
	}
	
	this.refreshPosition = function() {
		this.top = -25 + this.position * 25;
		if(this.position > 4) this.left = this.xPos[4];
		else this.left = this.xPos[this.position];
	}
	
	this.showSubtitle = function() {
		this.element.css({'max-width': 'none', 'z-index': 2});
		this.node.element.css('z-index', 2);
	}
	
	this.hideSubtitle = function() {
		this.element.css({'max-width': subMaxWidth, 'z-index': 0});
		this.node.element.css('z-index', 1);
	}
	
	this.deleteSubtitle = function() {
		this.element.remove();
		save({action: 'delete', what2Del: 'subtitle', sub_id: this.id});
		
		var highPos = 0;
		var index = 0;
		for(var i = 0; i < this.node.subtitles.length; i++) {
			if(this === this.node.subtitles[i]) index = i; //find the index of the subtitle
			else if(this.node.subtitles[i].position > this.position) {
				this.node.subtitles[i].position--;
				this.node.subtitles[i].refreshPosition();
				this.node.subtitles[i].element.css({top: this.node.subtitles[i].top, left: this.node.subtitles[i].left}); //refresh position
				save({action: 'update', subtitle_position: this.node.subtitles[i].position, id: this.node.subtitles[i].id}); //save new position
				
				if(this.node.subtitles[i].position == 3) this.node.subtitles[i].element.show(); //if it was hidden before, show it
				
				if(this.node.subtitles[i].position > highPos) highPos = this.node.subtitles[i].position; //to delete the ellipsis if < 4
			}
			else if(this.node.subtitles[i].position > highPos) highPos = this.node.subtitles[i].position; //to delete the ellipsis if < 4
		}
		
		if(highPos < 4) { //remove the ellipsis if no more than 4 subtitles
			for(var i = 0; i < this.node.subtitles.length; i++) {
				if(this.node.subtitles[i].ellipsis) this.node.subtitles[i].ellipsis.remove();
			}
		}
		
		this.node.subtitles.splice(index, 1); //delete at the very end
	}
}
