function BoardProperties(toolbar) {
    Tool.call(this, toolbar, $('#boardTool_6'), true);

    this.propertiesElement = $('#board_properties');
    this.boardTitleElement = $('#board_properties h1');
    this.newTitleElement = $('#board_newTitle');

    //EVENTS
    $(document).on('click', '#properties_close', {context: this}, function(e) { //Closes the Board properties
        e.data.context.deselect(); //Deselect the board properties tool
        board.boardToolbar.tools[0].select(); //and select the default tool (The Move tool)
    });

    $(document).on('click', "input[name='public_prop']", function(e) {
        $("#text_private_prop, #text_public_prop").hide(); //Hide both info texts before showing the correct one

        if($(this).val() == 'F') //If its private
            $("#text_private_prop").show();
        else
            $("#text_public_prop").show();

        saver.save({action: 'update', board_id: board.id, public: $(this).val()}, Saver.types.BOARD, false);
    });

    this.changeBoardTitle = function(newTitle) {
        if(newTitle != '') {
            this.newTitleElement.val('').hide();
            this.boardTitleElement.text(newTitle).show();

            saver.save({action: 'update', board_id: board.id, title: newTitle}, Saver.types.BOARD, false);
        }
    };
    $(document).on('click', '#board_changetitle', {context: this}, function(e) {
        var that = e.data.context;
        if(that.boardTitleElement.is(':visible')) { //If the title is NOT being edited
            that.boardTitleElement.hide();
            that.newTitleElement.val(that.boardTitleElement.text()).show().select();
        }
        else
            e.data.context.changeBoardTitle(that.newTitleElement.val());
    });
    $(document).on('keypress', '#board_newTitle', {context: this}, function(e) {
        var that = e.data.context;
        if(e.which == 13)
            that.changeBoardTitle(that.newTitleElement.val());
    });

    $(document).on('click', '#board_delete', function(e) {
        //TODO redirect to another board after deleting this one and verify if this is last user's board
        /*var del = confirm("Are you sure you want to delete this board? This action can't be undone!");
        if(del) saveBoard({action: 'delete', board_id: board_id});*/
        alert("We are currently working on this feature. Sorry for the inconvenience.");
    });
}

BoardProperties.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
BoardProperties.prototype.constructor = BoardProperties;

BoardProperties.prototype.actionOn = function() {
    this.propertiesElement.show();
};

BoardProperties.prototype.actionOff = function() {
    if(this.newTitleElement.is(':visible')) { //If the title is being modified, cancel the modifications and reset the UI
        this.newTitleElement.val('').hide();
        this.boardTitleElement.show();
    }

    this.propertiesElement.hide();
};
