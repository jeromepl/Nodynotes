function TextNode(id, title, xPos, yPos, text, color, icon) {

    Node.call(this, id, title, xPos, yPos);

    this.text = text; //escaping html elements is done in php
    this.color = "#" + color; //hex color
    this.icon = icon;

    this.setColor(this.color);
    //easier not to store the icon element in a variable because of the iconic injection. Instead the icon is given the id of this node

    //ICON
     $('<span>').appendTo(this.element); // this empty span allows the image to be vertically centered (put it anyway in case an icon is added later)
    this.setIcon(icon); //if there is an icon, inject it
}

TextNode.prototype = Object.create(Node.prototype); //create inheritance to object 'Node'
TextNode.prototype.constructor = TextNode;

TextNode.prototype.setColor = function(color) {

    if(color.charAt(0) != '#')//Check if the color is in hex. If not, convert it (Some browsers put everything in rgb now...)
        color = rgbToHex(color);

    this.color = color;
    this.element.css('background-color', this.color);
};

TextNode.prototype.setIcon = function(icon) {
    $('#icon_node' + this.id).remove(); //remove any previous icon
    this.icon = icon;

    if(this.icon != 'none') {
        $('<img>').appendTo(this.element).attr({'data-src': 'images/icons/' + this.icon + '.svg', id: 'icon_node' + this.id}).addClass('iconic-md').hide(); //hide to not show the injection process

        injectIcon('#icon_node' + this.id); //use the iconic API to inject the SVG
    }
};

TextNode.prototype.setContent = function(title, text, log) {
    log = (typeof log !== 'undefined') ? log : true; //Sets the default value of log to 'true'
    var previousTitle = this.title, previousText = this.text;

    this.title = title;
    this.text = text;
    this.titleElement.html(title);

    saver.save({action: 'update', title: activateHtml(this.title), text: activateHtml(this.text), id: this.id}, Saver.types.CONTENT, log, this, {title: previousTitle, text: previousText});
};

TextNode.prototype.select = function(subtitle) { //subtitle is optionnal. If specified, means a subtitle was selected
    Node.prototype.select.call(this, subtitle); //call the super method

    board.contentShower.linkTo(this);
};

TextNode.prototype.deselect = function() {
    Node.prototype.deselect.call(this); //call the super method

    board.contentShower.hide(); //hide the content shower
};

/** ALL EVENTS **/

TextNode.prototype.mouseMove = function(e) {
    Node.prototype.mouseMove.call(this, e); //call the super method

    if(this.moveInfo.moving) {
        if(Math.sqrt(Math.pow(e.clientX - this.moveInfo.startX, 2) + Math.pow(e.clientY - this.moveInfo.startY, 2)) > 2) {
            board.contentShower.hide(); //hide the content shower when dragging a selected node
            board.nodeToolbar.hide();
        }
    }
};
