function Node(id, title, xPos, yPos) {

    this.id = id;
    this.title = title; //escaping html elements is done in php
    this.xPos = xPos;
    this.yPos = yPos;

    /** CONSTANT VARIABLES **/
    this.scaleFactor = 1.1;

    this.subtitles = [];
    this.tags = [];

    this.moveInfo = {}; //all variables required to move the node
    this.moveInfo.moving = false;

    this.selected = false; //if the node is selected
    this.selectedSubtitle = null; //Keeps the reference to the selected subtitle. Used to not deselect the node when clicking if a subtitle is selected

    this.subtitleListExpanded = false; //Whether all subtitles are shown or not (i.e. if the ellipsis is hidden or not)

    this.containerElement = $('<div>').appendTo(board.element).addClass('node_container').css({top: this.yPos + 'px', left: this.xPos + 'px'}); //Contains the node and the subtitles (so that the subtitles are not inside the node div for easier event handling)
    this.element = $('<div>').appendTo(this.containerElement).addClass('node'); //the html node element (a div)
    this.titleElement = $('<h3>').appendTo(this.element).addClass('nodeTitle').html(this.title);

    $.data(this.element[0], 'object', {reference: this}); //save the object's reference to be able to act on it in event listeners

    //ELLIPSIS for subtitles (shows only if there are more than 4)
    this.ellipsis = $('<h4>').appendTo(this.containerElement).addClass('subtitle ellipsis').text('...'); //create an ellipsis
    this.ellipsis.hide();
    $.data(this.ellipsis[0], 'object', {reference: this}); //Save the reference of the node to be able to expand the subtitle list when clicked
};

Node.prototype.addSubtitle = function(id, position, title, text) {
    this.subtitles.push(new Subtitle(id, position, title, text, this));

    if(this.subtitles.length > 4) //show the ellipsis if there are enough subtitles
        this.ellipsis.show();
};

Node.prototype.removeSubtitle = function(subtitle) { //deleting is handled in the Subtitle class
    for(var i = 0; i < this.subtitles.length; i++) {
        if(this.subtitles[i] == subtitle) {
            this.subtitles.splice(i, 1);
            break;
        }
    }
};

Node.prototype.addTag = function(id, title) {
    this.tags.push(new Tag(id, title, this));
};

Node.prototype.removeTag = function(tag) { //deleting is handled in the Tag class
    for(var i = 0; i < this.tags.length; i++) {
        if(this.tags[i] == tag) {
            this.tags.splice(i, 1);
            break;
        }
    }
};

Node.prototype.select = function(subtitle) { //subtitle is optionnal. If specified, means a subtitle was selected
    this.selected = true;

    if(subtitle)
        this.selectedSubtitle = subtitle;

    this.expandSubtitleList();

    board.fade(); //decrease all nodes and linkbars' opacity
    this.containerElement.css('opacity', '1'); //don't change the opacity of the selected node
    this.containerElement.css('z-index', '3'); //put the selected node on top of the others
    this.scaleUp(); //scale it up (might already be scaled up because of mouseEnter)

    board.nodeToolbar.linkTo(this); //show the node Toolbar
};

Node.prototype.deselect = function() {
    this.selected = false;
    this.selectedSubtitle = null;

    board.unfade(); //reset the opacity of all nodes and linkbars
    this.containerElement.css('z-index', '1'); //also reset the z-index
    this.resetScale(); //and reset the scale

    this.retractSubtitleList();

    board.nodeToolbar.hide();

    //deselect all subtitles
    for(var i = 0; i < this.subtitles.length; i++) {
        if(this.subtitles[i].selected) {
            this.subtitles[i].deselect();
        }
    }
};

Node.prototype.moveTo = function(x, y) { //Update the Node's position
    this.xPos = x;
    this.yPos = y;
    this.containerElement.css({top: this.yPos, left: this.xPos});

    for(var i = 0; i < board.linkbars.length; i++) { //refresh the position of the linkbars everytime
        if(board.linkbars[i].node1 === this || board.linkbars[i].node2 === this) { //if this linkbar is attached to the node that moved
            board.linkbars[i].refreshPos();
        }
    }
};

Node.prototype.scaleUp = function() {
    this.containerElement.css('transform', 'scale(' + this.scaleFactor + ')');
    this.containerElement.css('z-index', '3');
    this.showTitle();
};

Node.prototype.resetScale = function() {
    this.containerElement.css('transform', 'scale(1)');
    this.containerElement.css('z-index', '1'); //also reset the z-index
    this.hideTitle();
};

Node.prototype.showTitle = function() {
    this.titleElement.css('width', 'auto');
};

Node.prototype.hideTitle = function() {
    this.titleElement.css('width', Styles.nodeTitleMinWidth); //set the width equal to the minimum width to limit the size
};

Node.prototype.expandSubtitleList = function() { //To show all subtitles
    for(var i = 0; i < this.subtitles.length; i++) {
        this.subtitles[i].show();
    }
    this.ellipsis.hide();

    this.subtitleListExpanded = true;
};

Node.prototype.retractSubtitleList = function() {
    for(var i = 0; i < this.subtitles.length; i++) {
        this.subtitles[i].hide();
    }
    if(this.subtitles.length > 4) //show the ellipsis if there are enough subtitles
        this.ellipsis.show();

    this.subtitleListExpanded = false;
};

Node.prototype.delete = function(log) {
    log = (typeof log !== 'undefined') ? log : true; //Sets the default value of log to 'true'
    var previousSubs = this.subtitles.slice(0), previousTags = this.tags.slice(0); //slice(0) is equal to cloning
    var previousLinks = [];

    for(var i = this.subtitles.length - 1; i >= 0; i--) { //delete all subtitles linked to this node
        this.subtitles[i].delete(false);
    }
    for(var i = this.tags.length - 1; i >= 0; i--) { //delete all tags linked to this node
        this.tags[i].delete(false);
    }
    for(var i = board.linkbars.length - 1; i >= 0; i--) {
        if(board.linkbars[i].node1 == this || board.linkbars[i].node2 == this) {
            previousLinks.push(board.linkbars[i]);
            board.linkbars[i].delete(false); //calls the method removeLinkbar in Board
        }
    }

    this.containerElement.hide();
    board.removeNode(this);

    saver.save({action: 'delete', what2Del: 'node', node_id: this.id}, Saver.types.CONTENT, log, this, {subtitles: previousSubs, tags: previousTags, linkbars: previousLinks});
};

/** ALL EVENTS **/
Node.prototype.mouseEnter = function(e) {
    this.scaleUp();
};

Node.prototype.mouseLeave = function(e) {
    if(!this.selected) { //shrink the node only if the mouse leaves it and it is NOT selected
        this.resetScale();
    }
};

Node.prototype.mouseDown = function(e) {
    this.moveInfo.moving = true;
    this.moveInfo.startX = e.clientX; //starting position
    this.moveInfo.startY = e.clientY;
    this.moveInfo.lastX = e.clientX; //starting position
    this.moveInfo.lastY = e.clientY;
    this.moveInfo.startPosX = this.xPos;
    this.moveInfo.startPosY = this.yPos;
};

Node.prototype.mouseMove = function(e) {
    if(User.canEdit && this.moveInfo.moving) {
        this.moveTo(this.xPos + (e.clientX - this.moveInfo.lastX), this.yPos + (e.clientY - this.moveInfo.lastY)); //Update the Node's position (also updates the linkbars)

        this.moveInfo.lastX = e.clientX; //get the new position for the next update
        this.moveInfo.lastY = e.clientY;

        if(Math.sqrt(Math.pow(e.clientX - this.moveInfo.startX, 2) + Math.pow(e.clientY - this.moveInfo.startY, 2)) > 2) {
            if(this.selected) {
                board.unfade(); //Unfade the rest of the nodes when a selected node is being dragged
                board.nodeToolbar.hide(); // ...and hide the toolbar
            }
        }
    }
};

Node.prototype.mouseUp = function(e) {
    if(this.moveInfo.moving) {
        this.moveInfo.moving = false;

        //Select or deselect the node if the node was clicked, not dragged
        if(Math.sqrt(Math.pow(e.clientX - this.moveInfo.startX, 2) + Math.pow(e.clientY - this.moveInfo.startY, 2)) <= 2) {
            if(!this.selected) {
                board.deselectAllNodes(); //Deselect all the other nodes
                this.select(); //if the node is not selected, select it
            }
            else if(this.selectedSubtitle) { //if a subtitle is selected, do not deselect the node, only the subtitle
                this.select(); //reselect to show the right content in the content shower
                this.selectedSubtitle.deselect(); //sets selectedSubtitle to null
            }
            else {
                this.deselect();
                this.scaleUp(); //Don't change the scale because the mouse is still over it
            }
        }
        else {
            if(this.selected) //If a node is selected and then dragged, deselect it
                this.deselect();

            saver.save({action: 'update', xPos: this.xPos, yPos: this.yPos, id: this.id}, Saver.types.CONTENT, true, this, {xPos: this.moveInfo.startPosX, yPos: this.moveInfo.startPosY});
        }
    }
};

Node.prototype.ellipsisClicked = function(e) {
    this.expandSubtitleList();
};
