function LinkTool(toolbar) {

    Tool.call(this, toolbar, $('#boardTool_3'), true);

    //Variables used to create a fake link (a link from a node to the cursor)
    //The idea is to create a linkbar linked to an invisble node and to simulate if that node was moving to move the linkbar
    this.firstNode = null;
    this.fakeNode;
    this.fakeLink;

    //EVENTS
    $(document).on('mousedown', '.node', {context: this}, function(e) {
        var that = e.data.context;
        if(board.boardToolbar.selectedTool instanceof LinkTool) { //Same as (board.boardToolbar.selectedTool instanceof LinkTool)

            var node = $.data(this, 'object').reference;
            if(that.firstNode == null) { //If this is the first node clicked
                that.firstNode = node;

                var x = e.clientX - board.xPos;
                var y = e.clientY - board.yPos;
                that.fakeNode = new Node(null, null, x, y);
                that.fakeNode.element.hide(); //That fake node should be invisible to the user!

                that.fakeLink = new Linkbar(null, that.firstNode, that.fakeNode);
            }
            else { //If this is the second node clicked
                if(node != that.firstNode) { //Only add a link if the first and second nodes are different
                    var linkbar = new Linkbar(tempId--, that.firstNode, node);
                    board.addLinkbar(linkbar); //Add a new linkbar to the board

                    saver.save({action: 'insert', what2Add: 'link', node1_id: that.firstNode.id, node2_id: node.id}, Saver.types.CONTENT, true, linkbar);
                }

                //Reset the tool
                that.firstNode = null;
                that.fakeLink.element.hide();
            }
        }
    });

    $(document).on('mousemove', {context: this}, function(e) {
        var that = e.data.context;
        if((board.boardToolbar.selectedTool instanceof LinkTool) && that.firstNode != null) {
            var x = e.clientX - board.xPos;
            var y = e.clientY - board.yPos;
            that.fakeNode.moveTo(x, y);
            that.fakeLink.refreshPos();
        }
    });

    $(document).on('mouseenter', '.node', {context: this}, function(e) { //Snap the fake link to a node when the mouse is over it
        var that = e.data.context;
        var node = $.data(this, 'object').reference;
        if((board.boardToolbar.selectedTool instanceof LinkTool) && that.firstNode != null && that.firstNode != node) {
            that.fakeLink.node2 = node;
        }
    });

    $(document).on('mouseleave', '.node', {context: this}, function(e) {
        var that = e.data.context;
        var node = $.data(this, 'object').reference;
        if((board.boardToolbar.selectedTool instanceof LinkTool) && that.firstNode != null && that.firstNode != node) {
            that.fakeLink.node2 = that.fakeNode;
        }
    });

    $(document).on('mouseup', {context: this}, function(e) { //Cancel the linkbar if right-clicking
        var that = e.data.context;
        if(e.which == 3 && (board.boardToolbar.selectedTool instanceof LinkTool) && that.firstNode != null) {
            that.firstNode = null; //Cancel the link that was being drawn
            that.fakeLink.element.hide();
        }
    });
}

LinkTool.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
LinkTool.prototype.constructor = LinkTool;

LinkTool.prototype.actionOn = function() {
};

LinkTool.prototype.actionOff = function() {
    if(this.firstNode != null) { //There is currently a link linked to one node only
        this.firstNode = null;
        this.fakeLink.element.hide();
    }
};
