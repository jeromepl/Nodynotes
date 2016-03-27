function MoveTool(toolbar) {

    Tool.call(this, toolbar, $('#boardTool_1'), true);

    //EVENTS

    //moving (and selecting) the nodes
    $(document).on('mousedown touchstart', '.node', function(e) {
        if (e.type == 'touchstart') //touch support
            e = e.originalEvent.changedTouches[0];

        //Nothing should move if a node/subtitle is being edited, or if the move tool is not selected
        if(!board.contentShower.editing && (board.boardToolbar.selectedTool instanceof MoveTool)) {
            $.data(this, 'object').reference.mouseDown(e);
        }
    });

    //MOVING (and selected) THE SUBTITLES
    $(document).on('mousedown touchstart', '.subtitle', function(e) {
        if (e.type == 'touchstart') //touch support
            e = e.originalEvent.changedTouches[0];

        //Nothing should move if a node/subtitle is being edited, or if the move tool is not selected
        if(!board.contentShower.editing && (board.boardToolbar.selectedTool instanceof MoveTool)) {
            var obj = $.data(this, 'object').reference;
            if($(this).is('.ellipsis')) {
                obj.ellipsisClicked(); //If the user clicked an ellipsis, do not select it. Instead, expand the list of subtitles of that node (Note: the reference in ellipsis is to a node)
            }
            else {
                obj.mouseDown(e);
            }
        }
        //NOTE: if the subtitle is an ellipsis, the reference points to the node, which means the subtitles list of that node will be expanded
    });
}

MoveTool.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
MoveTool.prototype.constructor = MoveTool;
