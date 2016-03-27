function DeleteTool(toolbar) {
    Tool.call(this, toolbar, $('#boardTool_2'), true);

    //EVENTS
    $(document).on('mouseenter', '.node, .subtitle:not(.ellipsis), .linkbar', function(e) { //Highlight a node or subtitle that is about to be deleted in red
        if(board.boardToolbar.selectedTool instanceof DeleteTool) {
            var obj = $.data(this, 'object').reference; //either a Node or a Subtitle
            if(obj instanceof Node) {
                obj.element.css('background-color', '#e54e4e');
                obj.titleElement.css('background-color', '#d32a2a');
                obj.ellipsis.css('background-color', '#e54e4e');

                //change all subtitle's background
                for(var i = 0; i < obj.subtitles.length; i++) {
                    obj.subtitles[i].element.css('background-color', '#e54e4e');
                }
            }
            else if(obj instanceof Subtitle) {
                obj.element.css('background-color', '#e54e4e');
            }
            else if(obj instanceof Linkbar) {
                obj.element.css('background-color', '#e54e4e');
            }
        }
    });

    $(document).on('mouseleave', '.node, .subtitle:not(.ellipsis), .linkbar', function(e) {
        if(board.boardToolbar.selectedTool instanceof DeleteTool) {
            var obj = $.data(this, 'object').reference;
            if(obj instanceof Node) {
                obj.element.css('background-color', obj.color);
                obj.titleElement.css('background-color', Styles.nodeTitleBgColor);

                if(obj.subtitles.length > 4) //Would get an error if there are no subtitles to retrieve the background color from
                    obj.ellipsis.css('background-color', Styles.subtitleBgColor);

                //change all subtitle's background
                for(var i = 0; i < obj.subtitles.length; i++) {
                    obj.subtitles[i].element.css('background-color', Styles.subtitleBgColor);
                }
            }
            else if(obj instanceof Subtitle) {
                obj.element.css('background-color', Styles.subtitleBgColor);
            }
            else if(obj instanceof Linkbar) {
                obj.element.css('background-color', Styles.linkbarBgColor);
            }
        }
    });

    //Actually delete the object when clicking on it
    $(document).on('click', '.node, .subtitle:not(.ellipsis), .linkbar', function(e) {
        if(board.boardToolbar.selectedTool instanceof DeleteTool) {
            $.data(this, 'object').reference.delete();
        }
    });


    //Also, small event to expand the subtitles just like in the MoveTool
    $(document).on('click', '.ellipsis', function(e) {
        if(board.boardToolbar.selectedTool instanceof DeleteTool) {
            $.data(this, 'object').reference.ellipsisClicked();
        }
    });
}

DeleteTool.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
DeleteTool.prototype.constructor = DeleteTool;

DeleteTool.prototype.actionOn = function() {
};

DeleteTool.prototype.actionOff = function() {
};
