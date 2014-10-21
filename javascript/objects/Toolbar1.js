function Toolbar1() {
    var selectedTool = 1;
    var tool_colors = ['90F', '4140E1', '00D7DD', '2F2', 'FF0', 'FFA500']; //keys 4 and 5 are currently unused

    selectTool(1); //default tool is Move/Select

    //Tools: Move/Select, Delete, Link, Add, Undo, Board Properties

    function selectTool(toolID) {
        if(!changingContent && !addingBoard) { //do not select the tool if content is being changed

            if(selectedNode) selectedNode.deselect(); //deselect node

            if(selectedTool == 6 && toolID == 6) toolID = 1; //If the user wants to close the board properties box by re-clicking on the tool, select the default tool
            deselectTool(selectedTool); //deselect the previous tool

            var query = '#tool_img_' + toolID;
            selectedTool = toolID;
            $(query).addClass('activeTool').css('border-left', '5px #' + tool_colors[toolID - 1] + ' solid');
        }
    }

    function deselectTool(toolID) {
        var query = '#tool_img_' + toolID;
        $(query).removeClass('activeTool').css('border-left', 'none');

        if(toolID == 3 || toolID == 2) $('.node:not(.board_node)').css('cursor', 'move');
        if(toolID == 2) {
            $('#overlay_nodeDel').hide(); //just in case
            $('#overlay_subDelSingle').hide();
            $('#overlay_linkDel').hide();
        }
        else if(link_firstSelected && toolID == 3) { //reset the link tool
            $('#fakeLink').hide();
            link_firstSelected = null;
        }
        else if(toolID == 6) {
            $('#board_properties').hide();

            if($('#board_properties h1').css('display') == 'none') {
                $('#board_newTitle').val('').hide();
                $('#board_properties h1').show();
            }
        }
    }
}
