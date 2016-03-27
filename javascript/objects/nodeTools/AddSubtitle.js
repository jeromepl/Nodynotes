function AddSubtitle(toolbar) {

    Tool.call(this, toolbar, $('#nodeTool_1'), false);
}

AddSubtitle.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
AddSubtitle.prototype.constructor = AddSubtitle;

AddSubtitle.prototype.actionOn = function() {

    var nodeRef = this.toolbar.getNodeRef();

    nodeRef.addSubtitle(tempId--, nodeRef.subtitles.length, Strings.newSubtitleTitle, Strings.newSubtitleText);

    var subtitle = nodeRef.subtitles[nodeRef.subtitles.length - 1];
    board.deselectAllNodes(); //deselect all nodes and subtitles (Otherwise two subtitles could be highlighted at the same time
    subtitle.select(); //Select the newly added subtitle
    board.contentShower.editSelected(); //Put the content shower in the 'edit' mode to quicly type a new title and text

    saver.save({action: 'insert', what2Add: 'subtitle', node_id: nodeRef.id, pos: subtitle.position}, Saver.types.CONTENT, true, subtitle);
};
