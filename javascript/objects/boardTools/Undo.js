function Undo(toolbar) {

    Tool.call(this, toolbar, $('#boardTool_5'), false);
}

Undo.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
Undo.prototype.constructor = Undo;

Undo.prototype.actionOn = function() {
    saver.undo();
};
