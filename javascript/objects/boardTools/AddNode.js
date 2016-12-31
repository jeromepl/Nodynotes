function AddNode(toolbar) {

    Tool.call(this, toolbar, $('#boardTool_4'), false);
}

AddNode.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
AddNode.prototype.constructor = AddNode;

AddNode.prototype.actionOn = function() {
    //Center the new node
    var x = board.containerElement.outerWidth() / 2 - board.nodes[0].element.outerWidth() / 2 - board.element.position().left;
    var y = board.containerElement.outerHeight() / 2 - board.nodes[0].element.outerHeight() / 2 - board.element.position().top;

    var newNode = new TextNode(tempId--, Strings.newNodeTitle, x, y, Strings.newNodeText, '00d7dd', 'none');
    
    board.addNode(newNode);
    var oldNode = board.nodeToolbar.element.is(":visible")? board.nodeToolbar.getNodeRef() : null;
    
    saver.save({action: 'insert', what2Add: 'node', board_id: board.id, xPos: x, yPos: y, color: '00d7dd', icon: 'none'}, Saver.types.CONTENT, true, newNode, null, function() {
        
        //Also add a link if a node is already selected when adding a new node (BEFORE SELECTING otherwise the toolbar is shown and attached to a new node)
        if(oldNode) {
            var linkbar = new Linkbar(tempId--, oldNode, newNode);
            board.addLinkbar(linkbar);
            saver.save({action: 'insert', what2Add: 'link', node1_id: oldNode.id, node2_id: newNode.id}, Saver.types.CONTENT, true, linkbar);
        }
        
        //Select the node and start editing it
        newNode.select();
        board.contentShower.editSelected(); //Put the content shower in the 'edit' mode to quicly type a new title and text
    });
};
