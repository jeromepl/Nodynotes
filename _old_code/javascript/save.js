function save(data, object, selectedNode, newLinkBar) { //object is optional (used to change the object's id when creating a new one)
													//SelectedNode and linkBar are used to add a linkBar if a node is selected when clicking the 'add' button (also optional)
	$('#saving').stop(true, true); //stop the current animation if there is one
	$('#saving').show();

	$.post("server_side/save.php", data,
			function(answer) { //returns the number of nodes changed or the new id
				console.log(data);
				console.log(answer);
				if(data.action == 'insert' && object) {
					object.id = answer;
                    object.element.attr('id', object.element.attr('id').replace(/[0-9\-]+/, answer));

					//Only save link bar when the node id is known (in the case a node is added directly to another node)
					if(data.what2Add == 'node' && selectedNode && newLinkBar)
						save({action: 'insert', what2Add: 'link', node1_id: selectedNode.id, node2_id: object.id}, newLinkBar);
					if(data.what2Add == 'tag') {
						$('#tags' + object.node.id + ' #tag_x_-1').attr('id', 'tag_x_' + answer); //also change the id of the tag element (actually the x-icon element)
						$('#tag_x_' + object.id).show(); //show the x
					}
				}
				$('#saving').delay(700).fadeOut(1000);
			})
		.fail(function(jqXHR, textStatus, errorThrown) { //if there is an error
    		alert("An error occured while trying to save. Please check your internet connection and try again later.");
 		 });
}

function saveBoard(data) {
	//no animation for boards related saves except for setting public in board_properties for visual feedback
    if(data.public) {
        $('#saving').stop(true, true); //stop the current animation if there is one
        $('#saving').show();
    }

	$.post("server_side/saveBoard.php", data,
			function(answer) { //returns the number of nodes changed or the new id
				console.log(data);
				console.log(answer);

				if(data.action == 'insert') {
					var x = $('#nodesContainer').outerWidth() / 2.2;
					var y = $('#nodesContainer').outerHeight() / 2.6;
					$.post("server_side/save.php", {action: 'insert', what2Add: 'node', board_id: answer, xPos: x, yPos: y, color: '00d7dd', icon: 'none'},
						function(answer2) {
							window.location.href = "board/" + answer + "/node_id=" + answer2;
						});
				}

                if(data.public) $('#saving').delay(700).fadeOut(1000);
			})
		.fail(function(jqXHR, textStatus, errorThrown) { //if there is an error
			alert("An error occured while trying to save. Please check your internet connection and try again later.");
		});
}
