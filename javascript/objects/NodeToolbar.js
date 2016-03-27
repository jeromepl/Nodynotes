function NodeToolbar() {

    if(User.canEdit)
        this.element = $('#nodeToolbar');

    this.tools = [];
    this.selectedTool = null;

    //Add all tools
    if(User.canEdit) {
        this.tools.push(new AddSubtitle(this));
        this.tools.push(new DeleteNode(this));
        this.tools.push(new ChangeColor(this));
        this.tools.push(new ChangeIcon(this));
        this.tools.push(new ManageTags(this));
    }

    $(document).on('click', '.nodeTool', function(e) { //Event listener for node tools
        if(!board.contentShower.editing) { //User can only use tools if the content of the node/subtitle is not being edited
            $.data(this, 'object').reference.mouseClicked(); //Note that "this" refers to the DOM element
        }
    });
}

NodeToolbar.prototype.linkTo = function(object) {
    if(User.canEdit && (object instanceof Node || object instanceof Subtitle)) {
        this.object = object;
        var node = this.getNodeRef();

        //Position the toolbar (centered)
        this.element.css({top: node.yPos - this.element.outerHeight() - 42, left: node.xPos + node.element.outerWidth() / 2 - this.element.outerWidth() / 2});

        this.element.show();

        this.tools[1].setTooltip(); //Special case: The DeleteNode tool. Can delete either a Node or a Subtitle, thus change the tooltip based on what is selected
    }
};

NodeToolbar.prototype.hide = function() {
    if(User.canEdit) {
        this.element.hide();

        for(var i = 0; i < this.tools.length; i++) { //Deselect all the tools
            this.tools[i].deselect(); //Use deselect instead of actionOff because it will also remove the '.selected' class
        }
    }
};

NodeToolbar.prototype.getNodeRef = function() { //Since either a subtitle or a node can be selected, I needed an easy way to retrieve in both cases the reference of the node
    if(this.object instanceof Node) {
        return this.object;
    }
    else {
        return this.object.node;
    }
};
