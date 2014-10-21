function Board(id) {
    //Most variables are setted in the setup function
	this.id = id;
	this.nodes = [];
	this.linkBars = [];

    this.subMaxWidth = 0;
    this.nodeTitleMinWidth = 0;

    //other objects
    this.toolbar1 = Toolbar1(); //instantiate a toolbar (the one on the right side)

	$.getJSON("server_side/getNodes.php?board_id=" + this.id, function(data) {
		//console.log(data);
		loadData(data);

	}).fail(function(jqXHR, textStatus, errorThrown) {
		alert("An error occured while trying to get your data. Please check your internet connection and try again later.");
        // Offline should go here... load data using another method
	});

	function loadData(data) {
		for(var i = 0; i < data.nodes.length; i++) { //nodes
			this.nodes.push(new Node(data.nodes[i].title, data.nodes[i].text, data.nodes[i].color, data.nodes[i].icon, data.nodes[i].xPos, data.nodes[i].yPos, data.nodes[i].id));

			for(var j = 0; j < data.nodes[i].subtitles.length; j++) { //subtitles
				this.nodes[this.nodes.length - 1].addSubtitle(data.nodes[i].subtitles[j].id, data.nodes[i].subtitles[j].position, data.nodes[i].subtitles[j].title, data.nodes[i].subtitles[j].text);
			}

			for(var j = 0; j < data.nodes[i].tags.length; j++) { //tags
				this.nodes[this.nodes.length - 1].addTag(data.nodes[i].tags[j].id, data.nodes[i].tags[j].title);
			}
		}

		for(var i = 0; i < data.linkBars.length; i++) { //link bars
			for(var j = 0; j < this.nodes.length; j++) {
				if(this.nodes[j].id == data.linkBars[i].node1_id) { //on trouve le premier node auquel ce lien est attaché
					for(var k = 0; k < this.nodes.length; k++) {
						if(this.nodes[k].id == data.linkBars[i].node2_id) { //puis le second
							this.linkBars.push(new LinkBar(data.linkBars[i].id, this.nodes[j], this.nodes[k]));
							break;
						}
					}
					break;
				}
			}
		}

		setup(); //function called when the data has loaded
	}

	function setup() { //function called when the data has loaded
		this.subMaxWidth = $('.subtitle').css('max-width'); //récupère la valeur spécifiée dans le css
		this.nodeTitleMinWidth = $('.node').css('min-width');

        if(searchedFor) {
            if(searchedFor.charAt(1) =='n') //it's a node
                $.data($(searchedFor)[0], 'node').object.select();
            else if(searchedFor.charAt(1) =='s') //it's a subtitle
                $.data($(searchedFor)[0], 'subtitle').object.select();
        }
	}
}
