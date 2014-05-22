function Board(id) {
	this.id = id;
	this.nodes = [];
	this.linkBars = [];
	
	var that = this;
	
	$.getJSON("server_side/getNodes.php?board_id=" + this.id, function(data) {
		//console.log(data);
		for(var i = 0; i < data.nodes.length; i++) { //nodes
			that.nodes.push(new Node(data.nodes[i].title, data.nodes[i].text, data.nodes[i].color, data.nodes[i].icon, data.nodes[i].xPos, data.nodes[i].yPos, data.nodes[i].id));
			
			for(var j = 0; j < data.nodes[i].subtitles.length; j++) { //subtitles
				that.nodes[that.nodes.length - 1].addSubtitle(data.nodes[i].subtitles[j].id, data.nodes[i].subtitles[j].position, data.nodes[i].subtitles[j].title, data.nodes[i].subtitles[j].text);
			}
			
			for(var j = 0; j < data.nodes[i].tags.length; j++) { //tags
				that.nodes[that.nodes.length - 1].addTag(data.nodes[i].tags[j].id, data.nodes[i].tags[j].title);
			}
		}
		
		for(var i = 0; i < data.linkBars.length; i++) { //link bars
			for(var j = 0; j < that.nodes.length; j++) {
				if(that.nodes[j].id == data.linkBars[i].node1_id) {
					for(var k = 0; k < that.nodes.length; k++) {
						if(that.nodes[k].id == data.linkBars[i].node2_id) {
							that.linkBars.push(new LinkBar(data.linkBars[i].id, that.nodes[j], that.nodes[k]));
							break;
						}
					}
					break;
				}
			}
		}
		
		//assign global variables
		for(var i = 0; i < that.nodes.length; i++) {
			nodes.push(that.nodes[i]);
		}
		for(var i = 0; i < that.linkBars.length; i++) {
			linkBars.push(that.linkBars[i]);
		}
		
		setup(); //function called when the data has loaded
		
	}).fail(function(jqXHR, textStatus, errorThrown) {
		alert('Error receiving the nodes, subtitles and likbars: ' + errorThrown + ': ' + textStatus); 
	});
	
	function setup() { //function called when the data has loaded
		subMaxWidth = $('.subtitle').css('max-width');
		nodeTitleMinWidth = $('.node').css('min-width');
	}
}