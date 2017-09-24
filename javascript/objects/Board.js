function Board(id, callback) { //Constructor of Board, second parameter is optional
    this.id = id;

    this.xPos = 0;
    this.yPos = 0;

    this.element = $('#board');
    this.containerElement = $('#boardContainer');
    this.backgroundText = $('#backgroundText');

    this.nodes = [];
    this.linkbars = [];
    this.contentShower = new ContentShower();

    this.moveInfo = {}; //variables used for dragging the board
    this.moveInfo.moving = false;

    this.locked = false; //Locking prevents the board from being modified

    /** CONSTANT VARIABLES **/
    this.nodeOpacity = 0.6;
    this.linkOpacity = 0.3;
    this.deceleration = 0.5;

    //Add the toolbars
    this.boardToolbar = new BoardToolbar(true);
    this.nodeToolbar = new NodeToolbar(true);

    //For the deceleration when moving the board
    this.decelerationInterval;

    if(User.canSee)
        this.loadData(callback); //loads the nodes and stuff via ajax
    else
        this.backgroundText.text("This board isn't shared with you");
}

Board.prototype.loadData = function(callback) {
    var that = this;

    $.getJSON("server_side/getNodes.php?board_id=" + that.id, function(data) {
        //console.log(data);

        that.xPos = parseInt(data.board.xPos, 10);
        that.yPos = parseInt(data.board.yPos, 10);
        that.element.css({left: that.xPos, top: that.yPos}); //move the board to the last saved location

        for(var i = 0; i < data.nodes.length; i++) { //add a node
            var nodeID = parseInt(data.nodes[i].id, 10);
            that.nodes.push(new TextNode(nodeID, data.nodes[i].title, data.nodes[i].xPos, data.nodes[i].yPos, data.nodes[i].text, data.nodes[i].color, data.nodes[i].icon));

            for(var j = 0; j < data.nodes[i].subtitles.length; j++) { // add subtitles to that node
                var subID = parseInt(data.nodes[i].subtitles[j].id, 10);
				that.nodes[that.nodes.length - 1].addSubtitle(subID, data.nodes[i].subtitles[j].position, data.nodes[i].subtitles[j].title, data.nodes[i].subtitles[j].text);
			}

			for(var j = 0; j < data.nodes[i].tags.length; j++) { //add tags to that node
                var tagID = parseInt(data.nodes[i].tags[j].id, 10);
				that.nodes[that.nodes.length - 1].addTag(tagID, data.nodes[i].tags[j].title);
			}
        }

        for(var i = 0; i < data.linkbars.length; i++) { //add a linkbar
			for(var j = 0; j < that.nodes.length; j++) {
				if(that.nodes[j].id == data.linkbars[i].node1_id) { //on trouve le premier node auquel ce linkbar est attaché (all nodes should be loaded by now)
					for(var k = 0; k < that.nodes.length; k++) {
						if(that.nodes[k].id == data.linkbars[i].node2_id) { //...puis le second
							that.linkbars.push(new Linkbar(data.linkbars[i].id, that.nodes[j], that.nodes[k]));
							break;
						}
					}
					break;
				}
			}
        }

        //Everything has loaded, we can now remove the text saying it was loading
        that.backgroundText.parent().remove();
        
        if (callback)
            callback();

    }).fail(function(jqXHR, textStatus, errorThrown) { //if a connection error occurs
		alert("An error occured while trying to get your data. Please check your internet connection and try again later.");
	});
};

Board.prototype.deselectAllNodes = function() { //Also deselects all subtitles!
    for(var i = 0; i < this.nodes.length; i++) {
        if(this.nodes[i].selected) {
            this.nodes[i].deselect();
        }
        else if(this.nodes[i].subtitleListExpanded) {
            this.nodes[i].retractSubtitleList();
        }
    }
};

Board.prototype.fade = function() {
    $('.node_container').css('opacity', '0.6'); //decrease all nodes and linkbars' opacity
    $('.linkbar').css('opacity', '0.3');
};

Board.prototype.unfade = function() {
    $('.node_container').css('opacity', '1');
    $('.linkbar').css('opacity', '1');
};

Board.prototype.lock = function() { //Locks the board (nothing can be clicked on or dragged), for prompt messages
    /* How this works: Create a div that covers the entire site surface and that is over everything
    so that the user can't click on anything */
    if(!this.locked) {
        $('<div>').appendTo('body').attr('id', 'lock').css({position: 'absolute', width: '100%', height: '100%', 'z-index': '100'});
        this.locked = true;
    }
};

Board.prototype.unlock = function() {
    if(this.locked) {
        $('#lock').remove();
        this.locked = false;
    }
};

Board.prototype.addNode = function(node) {
    this.nodes.push(node);
};

Board.prototype.removeNode = function(node) {
    for(var i = 0; i < this.nodes.length; i++) {
        if(this.nodes[i] == node) {
            this.nodes.splice(i, 1);
            break;
        }
    }
};

Board.prototype.getNode = function(id) {
    for(var i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].id === id)
            return this.nodes[i];
    }
    return null;
};

Board.prototype.addLinkbar = function(linkbar) {
    this.linkbars.push(linkbar);
};

Board.prototype.removeLinkbar = function(linkbar) {
    for(var i = 0; i < this.linkbars.length; i++) {
        if(linkbar == this.linkbars[i]) { //find the index of the linkbar
            this.linkbars.splice(i, 1); //remove the linkbar from the array
            break;
        }
    }
};

Board.prototype.centerNode = function(node, skipAnimation) { //Centers a node on the page, second argument is optional
    this.xPos = -node.xPos - node.containerElement.width() / 2 + this.containerElement.width() / 2;
    this.yPos = -node.yPos - node.containerElement.height() / 2 + this.containerElement.height() / 2;

    //Animate the movement of the board
    if (skipAnimation)
        this.element.css({top: this.yPos, left: this.xPos});
    else
        this.element.animate({top: this.yPos, left: this.xPos}, 700, 'swing');

    saver.save({action: 'update', board_id: this.id, yPos: this.yPos, xPos: this.xPos}, Saver.types.BOARD, false); //Save the new position
};

Board.prototype.moveBy = function(x, y, animate) { // animate argument is optional
    this.xPos += x;
    this.yPos += y;
    
    //Animate the movement of the board
    if (animate)
        this.element.animate({top: this.yPos, left: this.xPos}, 300, 'swing');
    else
        this.element.css({top: this.yPos, left: this.xPos});
    
    saver.save({action: 'update', board_id: this.id, yPos: this.yPos, xPos: this.xPos}, Saver.types.BOARD, false); //Save the new position
}

/** ALL EVENTS **/
Board.prototype.mouseDown = function(e) {
    this.moveInfo.moving = true;
    this.moveInfo.startX = e.clientX; //Starting position
    this.moveInfo.startY = e.clientY;
    this.moveInfo.lastX = e.clientX;
    this.moveInfo.lastY = e.clientY;
    this.moveInfo.speedX = this.moveInfo.speedY = 0;

    if(this.decelerationInterval)
        clearInterval(this.decelerationInterval);
};

Board.prototype.mouseMove = function(e) {
    if(this.moveInfo.moving) {
        this.xPos += (e.clientX - this.moveInfo.lastX);
        this.yPos += (e.clientY - this.moveInfo.lastY);
        this.element.css({top: this.yPos, left: this.xPos}); //Move the board

        //For deceleration
        this.moveInfo.speedX = e.clientX - this.moveInfo.lastX;
        this.moveInfo.speedXSign = signum(this.moveInfo.speedX); //The initial sign
        this.moveInfo.speedY = e.clientY - this.moveInfo.lastY;
        this.moveInfo.speedYSign = signum(this.moveInfo.speedY);

        this.moveInfo.lastX = e.clientX; //get the new position for the next update
        this.moveInfo.lastY = e.clientY;
    }
}

Board.prototype.mouseUp = function(e) {
    if(this.moveInfo.moving) {
        this.moveInfo.moving = false;

        //Deselect all the nodes if the board was clicked, not dragged (and if no node/subtitle is being edited)
        if(!board.contentShower.editing) {
            if(Math.sqrt(Math.pow(e.clientX - this.moveInfo.startX, 2) + Math.pow(e.clientY - this.moveInfo.startY, 2)) <= 2) {
                this.deselectAllNodes();
            }
        }

        //Board deceleration
        var that = this;
        this.decelerationInterval = setInterval(function () {

            //Update the speed only if the board is still going in the initial direction
            if(that.moveInfo.speedXSign !=0 && signum(that.moveInfo.speedX) == that.moveInfo.speedXSign)
                that.moveInfo.speedX -= that.moveInfo.speedXSign * that.deceleration;
            if(that.moveInfo.speedYSign !=0 && signum(that.moveInfo.speedY) == that.moveInfo.speedYSign)
                that.moveInfo.speedY -= that.moveInfo.speedYSign * that.deceleration;

            //Move the board
            that.xPos += that.moveInfo.speedX;
            that.yPos += that.moveInfo.speedY;
            that.element.css({top: that.yPos, left: that.xPos});

            //Stop the loop when the board stops moving (or starts going in the opposite direction)
            if((signum(that.moveInfo.speedX) != that.moveInfo.speedXSign || that.moveInfo.speedXSign == 0)
                && (signum(that.moveInfo.speedY) != that.moveInfo.speedYSign || that.moveInfo.speedYSign == 0)) {

                //Save the new board position
                if(Math.sqrt(Math.pow(e.clientX - that.moveInfo.startX, 2) + Math.pow(e.clientY - that.moveInfo.startY, 2)) > 2) { //Save only if moved
                    saver.save({action: 'update', board_id: that.id, yPos: that.yPos, xPos: that.xPos}, Saver.types.BOARD, false);
                }

                clearInterval(that.decelerationInterval); //Stop the infinite loop
            }
        }, 17); //About 60fps

    }
};
