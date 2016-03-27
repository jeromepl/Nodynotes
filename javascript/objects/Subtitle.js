function Subtitle(id, position, title, text, node) {

    this.id = id;
	this.position = position; //vertical position (starts at 0)
	this.title = title;
	this.text = text;
    this.node = node;

    this.selected = false;

    this.moveInfo = {}; //all variables required to move the subtitle
    this.moveInfo.moving = false;

    /** CONSTANT VARIABLES **/
    this.xPositions = [52, 75, 86, 75, 52];
    this.spaceBetween = 25; //Nb of pixels between two subtitles
    this.ellipsisPosition = 4;

    this.top = 0; //Are set up in updatePosition()
    this.left = 0;

    this.element = $('<h4>').appendTo(this.node.containerElement).addClass('subtitle').html(this.title);
    this.updatePosition();

    $.data(this.element[0], 'object', {reference: this}); //save the object's reference to be able to act on it in event listeners

    this.hide();
}

Subtitle.prototype.updatePosition = function() {
    if (this.position < this.ellipsisPosition)
		this.left = this.xPositions[this.position];
	else
        this.left = this.xPositions[this.ellipsisPosition]; //all the remaining subtitles are aligned horizontally

    this.top = -25 + this.position * this.spaceBetween;

    this.element.css({top: this.top, left: this.left});
};

Subtitle.prototype.setContent = function(title, text, log) {
    log = (typeof log !== 'undefined') ? log : true; //Sets the default value of log to 'true'
    var previousSub = this.title, previousText = this.text;

    this.title = title;
    this.text = text;
    this.element.html(title);

    saver.save({action: 'update', subtitle: activateHtml(this.title), text: activateHtml(this.text), id: this.id}, Saver.types.CONTENT, log, this, {subtitle: previousSub, text: previousText});
};

Subtitle.prototype.select = function() {
    this.node.select(this); //this sends the reference to this subtitle

    this.selected = true;
    board.contentShower.linkTo(this); //show the content shower
    board.nodeToolbar.linkTo(this); //show the node Toolbar
    this.element.addClass('subtitle_selected'); //highlights the subtitle (adds a colored border)
};

Subtitle.prototype.deselect = function() { //When this is called the node is either also deselected or the contentShower is linked to the node itself (this no need to hide the content shower)
    this.element.removeClass('subtitle_selected');
    this.selected = false;
    this.node.selectedSubtitle = null; //no subtitle selected on the node anymore
};

Subtitle.prototype.show = function() { //when this is called it also means the node is selected
    this.element.show();
    this.showText();
};

Subtitle.prototype.hide = function() { //when this is called it also means the node is not selected
	if(this.position >= this.ellipsisPosition) //hide all subtitles after or at position 4
		this.element.hide();
    this.hideText();
};

Subtitle.prototype.showText = function() { //Show all the text if a subtitle's content is too long
    this.element.css({'max-width': 'none', 'z-index': 2, 'background-color': Styles.boardBgColor});
};

Subtitle.prototype.hideText = function() {
    this.element.css({'max-width': Styles.subtitleMaxWidth, 'z-index': 0, 'background-color': Styles.subtitleBgColor});
};

Subtitle.prototype.moveUp = function() { //Move up ON THE SCREEN
    this.position--;
    this.updatePosition();

    saver.save({action: 'update', subtitle_position: this.position, id: this.id}, Saver.types.CONTENT, false, this);
};

Subtitle.prototype.moveDown = function() {
    this.position++;
    this.updatePosition();

    saver.save({action: 'update', subtitle_position: this.position, id: this.id}, Saver.types.CONTENT, false, this);
};

Subtitle.prototype.delete = function(log) {
    log = (typeof log !== 'undefined') ? log : true; //Sets the default value of log to 'true'
    this.element.hide();
    this.node.removeSubtitle(this);

    for(var i = 0; i < this.node.subtitles.length; i++) { //Need to reposition all following subtitles (move them all up)
        if(this.node.subtitles[i].position > this.position) {
            this.node.subtitles[i].moveUp();
        }
    }

    this.node.expandSubtitleList(); //Expand and retract to refresh wich subtitles should be shown, which should be hidden, and if an ellipsis should be shown
    this.node.retractSubtitleList();

    saver.save({action: 'delete', what2Del: 'subtitle', sub_id: this.id}, Saver.types.CONTENT, log, this);
};

/** ALL EVENTS **/
Subtitle.prototype.mouseEnter = function(e) {
    this.node.containerElement.css('z-index', '3');
    this.showText();
};

Subtitle.prototype.mouseLeave = function(e) {
    if(!this.node.selected && !this.node.subtitleListExpanded) { //Do not retract the subtitles if the list is expanded or if the ndoe is selected
        this.node.containerElement.css('z-index', '1');
        this.hideText(); //only hide if the node is not selected
    }
};

Subtitle.prototype.mouseDown = function(e) {
    this.moveInfo.moving = true;
    this.moveInfo.startX = e.clientX; //starting position
    this.moveInfo.startY = e.clientY;
    this.moveInfo.lastX = e.clientX;
    this.moveInfo.lastY = e.clientY;
};

Subtitle.prototype.mouseMove = function(e) {
    if(User.canEdit && this.moveInfo.moving) {
        this.left += (e.clientX - this.moveInfo.lastX);
        this.top += (e.clientY - this.moveInfo.lastY);
        this.element.css({top: this.top, left: this.left});

        //Check if other subtitles need to move
        for(var i = 0; i < this.node.subtitles.length; i++) {
            if(this.node.subtitles[i] != this) {
                if(((this.node.subtitles[i].position > this.position && this.node.subtitles[i].top < this.top)
                  || (this.node.subtitles[i].position < this.position && this.node.subtitles[i].top > this.top))
                  && (this.node.subtitleListExpanded || this.node.subtitles[i].position < this.ellipsisPosition)) { //If the subtitle list isn't expanded, do not move subtitles on or after the ellipsis
                    var temp = this.position; //Swap the two positions. DO NOT JUST INCREMENT OR DECREMENT (Doesn't work if users moves the subtitles too fast.)
                    this.position = this.node.subtitles[i].position;
                    this.node.subtitles[i].position = temp;
                    this.node.subtitles[i].updatePosition();

                    saver.save({action: 'update', subtitle_position: this.position, id: this.id}, Saver.types.CONTENT, true, this, {position: temp, otherSub: this.node.subtitles[i], otherPos: this.position});
                    saver.save({action: 'update', subtitle_position: temp, id: this.node.subtitles[i].id}, Saver.types.CONTENT, false);
                }
            }
        }

        this.moveInfo.lastX = e.clientX; //get the new position for the next update
        this.moveInfo.lastY = e.clientY;
    }
};

Subtitle.prototype.mouseUp = function(e) {
    if(this.moveInfo.moving) {
        this.moveInfo.moving = false;

        //Select or deselect the subtitle if it was clicked, not dragged
        if(Math.sqrt(Math.pow(e.clientX - this.moveInfo.startX, 2) + Math.pow(e.clientY - this.moveInfo.startY, 2)) <= 2) {
            if(!this.selected) {
                board.deselectAllNodes(); //Deselect all the other nodes
                this.select(); //if the subtitle is not selected, select it (also selects the node)
            }
        }
        else { //It was dragged
            this.updatePosition();
        }
    }
};
