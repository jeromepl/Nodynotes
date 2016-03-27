function Saver() {

    this.lastOperations = []; //Stack of all saving operations
}

Saver.prototype.save = function(data, type, log, object, previous, callback) { //log is a boolean that specifies whether the action can be un-done or not

    if(User.canEdit) {
        if(log)
            this.lastOperations.push({data: data, type: type, object: object, previous: previous});

        if(User.canSave)
            this.toServer(data, type, object, callback);
    }

};

Saver.prototype.toServer = function(data, type, object, callback) { //object is optional (should only be specified when creating a new object)
    var saveScript; //Determine whether the save or saveBoard php script needs to be called
    if(type == Saver.types.BOARD)
        saveScript = "saveBoard.php";
    else
        saveScript = "save.php";

    $.post("server_side/" + saveScript, data, function(answer) { //returns the number of nodes changed or the new id
        console.log(data);
        console.log(answer);

        if(data.action == 'insert' && object) {
            object.id = answer; //When creating a new object, the id is specified by the server and thus the local id needs to be updated
        }

        if(callback)
            callback();
    })
    .fail(function(jqXHR, textStatus, errorThrown) { //if there is an error
        //TODO localStorage save
        alert("An error occured while trying to save. Please check your internet connection and try again later.");
    });
};

Saver.prototype.undo = function() {
    if(this.lastOperations.length > 0) {

        var operation = this.lastOperations.pop();

        switch(operation.data.action) {
            case 'insert':
                undoInsert(operation);
                break;
            case 'delete':
                undoDelete(operation);
                break;
            case 'update':
                undoUpdate(operation);
                break;
        }
    }
};

function undoInsert(operation) {

    if(operation.object instanceof Node || operation.object instanceof Subtitle)
        operation.object.deselect(); //Hide the content shower and the node toolbar

    operation.object.delete(false); //false means its not going to log the save

}

function undoDelete(operation) {

    switch(operation.data.what2Del) {
        case 'node':
            var node = operation.object;
            board.addNode(node);
            node.containerElement.show();

            saver.save({action: 'insert', what2Add: 'node', board_id: board.id, xPos: node.xPos, yPos: node.yPos, color: node.color.substr(1), icon: node.icon}, Saver.types.CONTENT, false, node, {},
                    function() { //Callback
                        saver.save({action: 'update', title: activateHtml(node.title), text: activateHtml(node.text), id: node.id}, Saver.types.CONTENT, false); //Save the content

                        //Those are in the callback since they all require the correct node id to be saved
                        for(var i = 0; i < operation.previous.subtitles.length; i++) { //restore subtitles
                            undoDelete({data: {what2Del: 'subtitle'}, object: operation.previous.subtitles[i]});
                        }
                        for(var i = 0; i < operation.previous.tags.length; i++) {
                            undoDelete({data: {what2Del: 'tag'}, object: operation.previous.tags[i]});
                        }
                        for(var i = 0; i < operation.previous.linkbars.length; i++) {
                            undoDelete({data: {what2Del: 'link'}, object: operation.previous.linkbars[i]});
                        }

                    });
            break;
        case 'subtitle':
            var subtitle = operation.object;
            subtitle.node.subtitles.push(subtitle);

            subtitle.element.show();
            //Need to move down all other subtitles...
            for(var i = 0; i < subtitle.node.subtitles.length; i++) {
                if(subtitle != subtitle.node.subtitles[i] && subtitle.position <= subtitle.node.subtitles[i].position) {
                    subtitle.node.subtitles[i].moveDown();
                    subtitle.node.subtitles[i].hide(); //This only hides the subtitle if over or after the ellipsis
                }
            }

            saver.save({action: 'insert', what2Add: 'subtitle', node_id: subtitle.node.id, pos: subtitle.position}, Saver.types.CONTENT, false, subtitle, {},
                       function(){
                           saver.save({action: 'update', subtitle: activateHtml(subtitle.title), text: activateHtml(subtitle.text), id: subtitle.id}, Saver.types.CONTENT, false);
                       });
            break;
        case 'link':
            var linkbar = operation.object;
            board.addLinkbar(linkbar);
            linkbar.element.show();
            saver.save({action: 'insert', what2Add: 'link', node1_id: linkbar.node1.id, node2_id: linkbar.node2.id}, Saver.types.CONTENT, false, linkbar);
            break;
        case 'tag':
            var tag = operation.object;
            tag.node.tags.push(tag);
            tag.element.show();
            tag.element.attr('class', 'tag tag-of-node' + tag.node.id); //Need to reset the id in the class name since this tag could have been deleted along with its node
            saver.save({action: 'insert', what2Add: 'tag', node_id: tag.node.id, title: tag.title}, Saver.types.CONTENT, false, tag);
            break;
    }
}

function undoUpdate(operation) {
    if(operation.data.xPos) { //Updating a node's position
        var node = operation.object;
        node.moveTo(operation.previous.xPos, operation.previous.yPos);
        saver.save({action: 'update', xPos: node.xPos, yPos: node.yPos, id: node.id}, Saver.types.CONTENT, false);
    }
    else if(operation.data.title) { //Updating a node's content
        operation.object.setContent(operation.previous.title, operation.previous.text, false);

        if(board.contentShower.element.is(':visible'))
            board.contentShower.linkTo(operation.object); //Need to refresh the content of the content shower
    }
    else if(operation.data.icon) { //Updating a node's icon
        var node = operation.object;
        node.setIcon(operation.previous);
        saver.save({action: 'update', id: node.id, icon: node.icon}, Saver.types.CONTENT, false);
    }
    else if(operation.data.color) { //Updating a node's color
        var node = operation.object;
        node.setColor(operation.previous);
        saver.save({action: 'update', id: node.id, color: node.color.substr(1)}, Saver.types.CONTENT, false); // remove the '#'
    }
    else if(operation.data.subtitle_position) { //Updating a subtitle's position
        var node1 = operation.object, node2 = operation.previous.otherSub;

        node1.position = operation.previous.position;
        node2.position = operation.previous.otherPos;

        node1.updatePosition();
        node2.updatePosition();

        saver.save({action: 'update', subtitle_position: node1.position, id: node1.id}, Saver.types.CONTENT, false);
        saver.save({action: 'update', subtitle_position: node2.position, id: node2.id}, Saver.types.CONTENT, false);
    }
    else if(operation.data.subtitle) { //Updating a subtitle's content
        operation.object.setContent(operation.previous.subtitle, operation.previous.text, false);

        if(board.contentShower.element.is(':visible'))
            board.contentShower.linkTo(operation.object); //Need to refresh the content of the content shower
    }
}

Saver.types = {
    CONTENT: 0,
    BOARD: 1
};
