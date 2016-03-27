//TODO !Only TextNodes have a background-color!
function ChangeColor(toolbar) {

    this.colorBox = $('#colorChoices');

    Tool.call(this, toolbar, $('#nodeTool_3'), true);

    //EVENTS:

    $(document).on('mouseover', '.colorChoice', {context: this}, function(e) { //Send the reference to this object to be able to modify its values
        var that = e.data.context; //get the reference to the ChangeColor object
        that.toolbar.getNodeRef().element.css('background-color', $(this).css('background-color')); //Don't call node.setColor() in order not to save the color (this color is only there temporarily to show what it would look like)
    });

    $(document).on('mouseleave', '.colorChoice', {context: this}, function(e) {
        var that = e.data.context;
        var node = that.toolbar.getNodeRef();
        node.element.css('background-color', node.color);
    });

    $(document).on('click', '.colorChoice', {context: this}, function(e) {
        var that = e.data.context;
        var node = that.toolbar.getNodeRef();

        var previousColor = node.color;
        node.setColor($(this).css('background-color'));
        that.deselect(); //Deselect this tool. The color has been changed, so the user wants to do something else now

        saver.save({action: 'update', id: node.id, color: node.color.substr(1)}, Saver.types.CONTENT, true, node, previousColor); // remove the '#'
    });
}

ChangeColor.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
ChangeColor.prototype.constructor = ChangeColor;

ChangeColor.prototype.actionOn = function() {
    this.colorBox.show();
};

ChangeColor.prototype.actionOff = function() {
    this.colorBox.hide();
};
