function Tag(id, title, node) {

    this.id = id;
    this.title = title;
    this.node = node;

    //Create the tag element in the toolbar's icon box
    this.element = $('<div>').prependTo('#all_tags').addClass('tag tag-of-node' + this.node.id); //add a class to the id of the node to be able to show a set of tags easily
	this.titleElement = $('<h5>').appendTo(this.element).text(this.title);
	$('<img>').appendTo(this.element).attr({src: 'images/icons/x.svg', id: 'tag_x_' + this.id}).addClass('iconic-md tag_x');

    injectIcon('#tag_x_' + this.id);

    $.data(this.element[0], 'object', {reference: this}); //Save the reference to this object in the tag elemnent to delete it easily
}

Tag.prototype.delete = function(log) {
    log = (typeof log !== 'undefined') ? log : true; //Sets the default value of log to 'true'
    this.element.hide();
    this.node.removeTag(this);

    saver.save({action: 'delete', what2Del: 'tag', tag_id: this.id}, Saver.types.CONTENT, log, this);
};
