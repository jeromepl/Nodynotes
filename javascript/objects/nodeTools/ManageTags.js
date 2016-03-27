//Allows to add, delete or look at tags
function ManageTags(toolbar) {

    this.boxElement = $('#tag_box');
    this.fieldElement = $('#tag_name'); //the text field used to type a new tag name

    Tool.call(this, toolbar, $('#nodeTool_5'), true);

    //HELPER METHODS
    this.addTag = function(name) {
        if(name != '') {
            var node = this.toolbar.getNodeRef();
            node.addTag(tempId--, name);

            var tag = node.tags[node.tags.length - 1];
            saver.save({action: 'insert', what2Add: 'tag', node_id: node.id, title: name}, Saver.types.CONTENT, true, tag);
        }
        this.fieldElement.val(''); //Remove whatever was in the text field
    };

    this.suggestTags = function() { //Query from the DB similar tags that have previously been typed by the user
        $.getJSON("server_side/last_tags.php?query=" + this.fieldElement.val(), function(data) {

            $('#tag_suggestions').show();
            $('.tag_suggestion').remove(); //remove all previous suggestions

            for(var i = 0; i < data.length; i++) {
                $('<div>').appendTo('#tag_suggestions').addClass('tag_suggestion').text(data[i]);
            }

            if(data.length == 0) $('#tag_suggestions').hide(); //Do not show the box if there are no suggestions

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("An eror occured while trying to get the tag suggestions\n" + textStatus + ": " + errorThrown);
        });
    };


    //EVENTS
    $(document).on('click', '#add_tag', {context: this}, function(e) { //Add a tag
        e.data.context.addTag(e.data.context.fieldElement.val());
    });

    $(document).on('click', '.tag_x', {context: this}, function(e) {
        $.data($(this).parent('.tag')[0], 'object').reference.delete();
    });

    //EVENTS FOR TAG SUGGESTIONS
    $(document).on('keyup', '#tag_name', {context: this}, function(e) {
		if(e.which == 13) { //Enter key pressed
			e.data.context.addTag(e.data.context.fieldElement.val());
            $('#tag_suggestions').hide();
		}
        else { //show new tag suggestions
            e.data.context.suggestTags();
        }
	});
    $(document).on('focus', '#tag_name', {context: this}, function(e) {
        e.data.context.suggestTags();
    });
    $(document).on('blur', '#tag_name', function(e) {
        $('#tag_suggestions').hide();
    });
    $(document).on('mousedown', '.tag_suggestion', {context: this}, function(e) { //Have to use mousedown in order for this event to trigger before the blur event triggers!
        e.data.context.addTag($(this).text());
        $('#tag_suggestions').hide();
    });

}

ManageTags.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
ManageTags.prototype.constructor = ManageTags;

ManageTags.prototype.actionOn = function() {

    this.fieldElement.val(''); //reset the text field to be empty
    $('.tag').hide(); //Hide all previous tags
    $('.tag-of-node' + this.toolbar.getNodeRef().id).show(); //Show only the tags attached to the selected node

    this.boxElement.show();
};

ManageTags.prototype.actionOff = function() {
    this.boxElement.hide();
};
