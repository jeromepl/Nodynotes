function Tag(id, title, node) {
	this.id = id;
	this.title = title;
	this.node = node;
	
	this.element = $('<div>').prependTo('#tags' + this.node.id).addClass('tag'); //set the id to the node's id to be able to select tags easily
	this.titleElement = $('<h5>').appendTo(this.element).text(this.title);
	$('<img>').appendTo(this.element).attr({src: 'images/x.svg', id: 'tag_x_' + this.id}).addClass('iconic-sm tag_x');
	var id = this.id;
	iconic.inject('#tag_x_' + this.id, {}, function (count) {
		$('#tag_x_' + id).show();
	});
	
	$.data(this.element[0], 'tag', {object: this}); //save the object reference in each element
	
	this.deleteTag = function() {
		this.element.remove();
		save({action: 'delete', what2Del: 'tag', tag_id: this.id});
		
		for(var i = 0; i < this.node.tags.length; i++) {
			if(this === this.node.tags[i]) this.node.tags.splice(i, 1); //delete at the very end
		}
	}
}