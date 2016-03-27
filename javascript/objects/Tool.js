function Tool(toolbar, element, togglable) {

    this.toolbar = toolbar;
    this.element = element;
    this.togglable = togglable; //Whether the tool is click-on, click-off or not

    if(User.canEdit)
        $.data(this.element[0], 'object', {reference: this}); //To trigger the right function when clicking on a tool
}

//The next 2 methods should be overriten by any object that extends Tool
Tool.prototype.actionOn = function() {
};
Tool.prototype.actionOff = function() {
};

Tool.prototype.select = function() {
    this.actionOn();
    if(this.togglable) {
        this.toolbar.selectedTool = this;
        this.element.addClass('selected');
    }
};

Tool.prototype.deselect = function() {
    this.actionOff();
    if(this.togglable) {
        this.toolbar.selectedTool = null;
        this.element.removeClass('selected');
    }
};

Tool.prototype.mouseClicked = function() {
    var previousTool = this.toolbar.selectedTool;
    if(previousTool && this.togglable) { //Deselect the previous tool (only if the newly clicked tool is selectable, aka togglable)
        previousTool.deselect();
    }

    if(previousTool != this) {
        this.select(); //And select the new one (only if the tool wasn't clicked again to close it)
    }
    else if(this.toolbar instanceof BoardToolbar) { //For the BOARD TOOLBAR, there should always be a selected tool (the Move tool)
        this.toolbar.tools[0].select();
    }

    if(this.toolbar instanceof BoardToolbar && !(this instanceof Undo)) { //When switching of board tool, all nodes and subtitles should always be deselected, except for the Undo Tool
        board.deselectAllNodes();
    }
};
