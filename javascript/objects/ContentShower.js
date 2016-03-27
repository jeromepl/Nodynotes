/** Class that manages the content shower used for TextNodes **/
function ContentShower() {
    this.element = $('#showContent');
    this.titleElement = $('#content_title h1');
    this.textElement = $('#content_text p');

    //Input fields to edit the node/subtitle's content
    this.titleField = $('#content_title input');
    this.textField = $('#content_text textarea');

    //Icons/buttons used to modify the node/subtitle's content
    this.editButton = $('#changeContentButton');
    this.applyButton = $('#changeContent_change');
    this.cancelButton = $('#changeContent_cancel');

    this.editing = false;

    if(!User.canEdit) //Hide the option to edit text if the user is not allowed to
        this.editButton.hide();

    //HELPER METHODS
    this.reset = function() {
        this.titleElement.show();
        this.textElement.show();

        this.titleField.hide();
        this.titleField.val('');
        this.textField.hide();
        this.textField.val('');

        if(User.canEdit)
            this.editButton.show();
        this.applyButton.hide();
        this.cancelButton.hide();

        this.editing = false;
    };

    //EVENTS
    $(document).on('click', '#changeContentButton', {context: this}, function(e) { //Edit
        e.data.context.editSelected();
    });

    $(document).on('click', '#changeContent_change', {context: this}, function(e) { //Apply changes
        var that = e.data.context;
        that.object.setContent(escapeHtml(that.titleField.val()), nl2br(escapeHtml(that.textField.val())));
        that.textElement.html(that.object.text); //set the title and the text of the content shower to the ones of this node
        that.titleElement.html(that.object.title);
        that.reset();
    });

    $(document).on('click', '#changeContent_cancel', {context: this}, function(e) { //Cancel changes
        e.data.context.reset();
    });

    $(document).on('keyup', '#content_title input', {context: this}, function(e) {
        if(e.which == 13) { //Enter key pressed
            e.data.context.textField.focus();
		}
	});
}

ContentShower.prototype.linkTo = function(object) {
    if(object instanceof Node || object instanceof Subtitle) { //verify if the var node is a Node or a Subtitle object
        this.object = object; //store the node reference in order to modify its content later

        this.textElement.html(this.object.text); //set the title and the text of the content shower to the ones of this node
        this.titleElement.html(this.object.title);

        if(object instanceof Subtitle) {
            this.element.css({top: this.object.node.yPos - 25, left: this.object.node.xPos - this.element.outerWidth() - 18}); //position the content shower relative to the node
        }
        else { //its a Node
            this.element.css({top: this.object.yPos - 25, left: this.object.xPos - this.element.outerWidth() - 18});
        }

        this.element.show();
    }
};

ContentShower.prototype.hide = function() {
    this.element.hide();

    //Reset the look of the content shower in case the node/subtitle was being modified
    this.reset();
};

//This method is not in the events since it allows an outside code (such as the AddNode tool) to put the content shower in the 'edit' mode
ContentShower.prototype.editSelected = function() {
    this.titleElement.hide();
    this.textElement.hide();

    this.titleField.show();
    this.titleField.val(activateHtml(this.object.title));
    this.textField.show();
    this.textField.val(activateHtml(br2nl(this.object.text)));

    this.editButton.hide();
    this.applyButton.show();
    this.cancelButton.show();

    //Select the title field
    this.titleField.select();

    this.editing = true;
    if(board.nodeToolbar.selectedTool) //If a tool is selected, deselect it so that user can't modify the content while changing the icon, for example
        board.nodeToolbar.selectedTool.deselect();
};
