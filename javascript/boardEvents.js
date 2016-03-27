$(function() { //put this for jQuery (wait for DOM availability)
    $(document).on('mousedown touchstart', function(e) {
        if (e.type == 'touchstart') //touch support
            e = e.originalEvent.changedTouches[0];

        if(e.target === $('#boardContainer')[0] || $(e.target).hasClass('linkbar')) { //clicked on the background or a linkbar
            board.mouseDown(e);
        }
    });

    $(document).on('mousemove touchmove', function(e) {
        if (e.type == 'touchmove') //touch support
            e = e.originalEvent.changedTouches[0];

        board.mouseMove(e);
        for(var i = 0; i < board.nodes.length; i++) {
            board.nodes[i].mouseMove(e); //move nodes

            for(var j = 0; j < board.nodes[i].subtitles.length; j++) {
                board.nodes[i].subtitles[j].mouseMove(e); //move subtitles
            }
        }
    });

    $(document).on('mouseup touchend', function(e) {
        if (e.type == 'touchend') //touch support
            e = e.originalEvent.changedTouches[0];

        board.mouseUp(e);
        for(var i = 0; i < board.nodes.length; i++) {
            board.nodes[i].mouseUp(e);

            for(var j = 0; j < board.nodes[i].subtitles.length; j++) {
                board.nodes[i].subtitles[j].mouseUp(e);
            }
        }
    });

    //Shortcuts
    $(document).keydown(function(e) {
        if (e.keyCode == 90 && e.ctrlKey) { //Ctrl + Z
            saver.undo();
        }
    });

    //SCALING THE NODES
    $(document).on('mouseenter', '.node', function(e) {
        $.data(this, 'object').reference.mouseEnter(e);
    });
    $(document).on('mouseleave', '.node', function(e) {
        $.data(this, 'object').reference.mouseLeave(e);
    });

    //EXPAND AND RETRACT THE SUBTITLES' TEXT (does not apply to ellipsis)
    $(document).on('mouseenter', '.subtitle:not(.ellipsis)', function(e) {
        $.data(this, 'object').reference.mouseEnter(e);
    });
    $(document).on('mouseleave', '.subtitle:not(.ellipsis)', function(e) {
        $.data(this, 'object').reference.mouseLeave(e);
    });

});
