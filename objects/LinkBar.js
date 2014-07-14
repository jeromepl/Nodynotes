function LinkBar(id, node1, node2) {
	this.id = id;
	this.node1 = node1;
	this.node2 = node2;
	
	this.element = $('<div>').appendTo('#nodesArea').addClass('linkBar').attr('id', 'linkbar' + this.id);
	$.data(this.element[0], 'linkBar', {object: this});
	
	this.refreshPos  = function() {
		var ele1 = this.node1.element; // node 1
		var ele2 = this.node2.element; // node 2
		var offsetHeight = this.element[0].offsetHeight;
		
		this.x1 = ele1.position().left + ele1[0].offsetWidth/2 - offsetHeight/4;
		this.y1 = ele1.position().top + ele1[0].offsetHeight/2 - offsetHeight/2;
		this.x2 = ele2.position().left + ele2[0].offsetWidth/2 - offsetHeight/4;
		this.y2 = ele2.position().top + ele2[0].offsetHeight/2 - offsetHeight/2;	
		this.deltaX = this.x2 - this.x1;
		this.deltaY = this.y2 - this.y1;
	
		this.angle = Math.atan(this.deltaY / this.deltaX);
		this.angle = this.angle / Math.PI * 180; //convert in degrees
		this.length = Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));
		
		this.top = this.y1 + this.deltaY/2;
		this.left = this.x1 + this.deltaX/2 - this.length/2;
		
		this.element.css({width: this.length, 
			webkitTransform: "rotate(" + this.angle + "deg)",
			MozTransform: "rotate(" + this.angle + "deg)",
			msTransform: "rotate(" + this.angle + "deg)",
			OTransform: "rotate(" + this.angle + "deg)",
			top: this.top,
			left: this.left});
	};
	
	this.refreshPos(); //init
	
	this.deleteLink = function() {
		this.element.remove();
		save({action: 'delete', what2Del: 'link', link_id: this.id});
		
		for(var i = 0; i < linkBars.length; i++) {
			if(this === linkBars[i]) { //find the index of the link bar
				linkBars.splice(i, 1);
				break;
			}
		}
	}
}
