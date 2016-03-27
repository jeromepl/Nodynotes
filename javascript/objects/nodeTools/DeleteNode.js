//Deletes a Node OR a Subtitle (depending on what is selected)
function DeleteNode(toolbar) {

    Tool.call(this, toolbar, $('#nodeTool_2'), false);
}

DeleteNode.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
DeleteNode.prototype.constructor = DeleteNode;

DeleteNode.prototype.actionOn = function() {
    //Delete the object (no matter if it is a Subtitle or a Node)
    this.toolbar.object.deselect(); //Will hide the content shower and the node toolbar
    this.toolbar.object.delete();

    if(this.toolbar.object instanceof Subtitle) {
        this.toolbar.object.node.select(); //Select the Node if a subtitle was deleted (could also select the next subtitle?)
    }
};

//DeleteNode is special: It can delete a Node OR a Subtitle... Thus the text shown when hovering the tool (the 'tooltip') needs to be changed in function of what is selected
DeleteNode.prototype.setTooltip = function() {
    if(this.toolbar.object instanceof Node) {
        this.element.attr('title', Strings.deleteNodeTool);
    }
    else {
        this.element.attr('title', Strings.deleteSubtitleTool);
    }
};
