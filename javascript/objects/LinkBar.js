function Linkbar(id, node1, node2) {

    this.id = id;
    this.node1 = node1;
    this.node2 = node2;

    this.element = $('<div>').appendTo(board.element).addClass('linkbar');
	$.data(this.element[0], 'object', {reference: this});

    this.refreshPos(); //initialize the linkbar
}

Linkbar.prototype.refreshPos = function() {
    var ele1 = this.node1.containerElement; // node 1
    var ele2 = this.node2.containerElement; // node 2

    this.x1 = ele1.position().left + ele1[0].getBoundingClientRect().width / 2; //boundingClientRect allows to get the size after scaling
    this.y1 = ele1.position().top + ele1[0].getBoundingClientRect().height / 2;
    this.x2 = ele2.position().left + ele2[0].getBoundingClientRect().width / 2;
    this.y2 = ele2.position().top + ele2[0].getBoundingClientRect().height / 2;
    this.deltaX = this.x2 - this.x1;
    this.deltaY = this.y2 - this.y1;

    this.angle = Math.atan(this.deltaY / this.deltaX); //find the angle of rotation
    this.angle = this.angle / Math.PI * 180; //convert in degrees
    this.length = Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));

    this.top = this.y1 + this.deltaY / 2;
    this.left = this.x1 + this.deltaX / 2 - this.length / 2;

    this.element.css({width: this.length,
        webkitTransform: "rotate(" + this.angle + "deg)",
        MozTransform: "rotate(" + this.angle + "deg)",
        msTransform: "rotate(" + this.angle + "deg)",
        OTransform: "rotate(" + this.angle + "deg)",
        top: this.top,
        left: this.left});
};

Linkbar.prototype.delete = function(log) {
    this.element.hide();
    board.removeLinkbar(this);

    log = (typeof log !== 'undefined') ? log : true; //Sets the default value of log to 'true'
    saver.save({action: 'delete', what2Del: 'link', link_id: this.id}, Saver.types.CONTENT, log, this);
};
