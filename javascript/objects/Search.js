function Search() {

    this.buttonElement = $('#search');
    this.boxElement = $('#search_box');
    this.resultsBoxElement = $('#search_results');
    this.noResultsElement = $('#search_noResults');

    this.selectedPosition = -1;

    $(document).on('click', '#search', {context: this}, function(e) {
        e.data.context.search($(this).val());
        e.data.context.open();
    });
    $(document).on('blur', '#search_box', {context: this}, function(e) {
        e.data.context.close();
    });

    $(document).on('keyup', '#search_box', {context: this}, function(e) {
        var that = e.data.context;
        switch(e.which) {
            case 13:
                if(that.selectedPosition > -1) { //If there are search results
                    board.deselectAllNodes();
                    var element = $.data($('.search_selected')[0], 'object').reference;
                    element.select();

                    if(element instanceof Node) //Center the element on the page
                        board.centerNode(element);
                    else if(element instanceof Subtitle)
                        board.centerNode(element.node);

                    that.close();
                }
                break;
            case 38: //Up arrow
                if(that.selectedPosition > 0) {
                    that.selectedPosition--;
                    $('.search_selected').removeClass('search_selected');
                    $('.search_result').eq(that.selectedPosition).addClass('search_selected');
                }
                break;
            case 40: //Down arrow
                if(that.selectedPosition < $('.search_result').size() - 1) {
                    that.selectedPosition++;
                    $('.search_selected').removeClass('search_selected');
                    $('.search_result').eq(that.selectedPosition).addClass('search_selected');
                }
                break;
            default:
                e.data.context.search($(this).val());
                break;
        }
    });
    $(document).on('mousedown', '.search_result', function(e) {
        board.deselectAllNodes();
        $.data(this, 'object').reference.select();
    });
}

Search.prototype.open = function() {
    if(this.boxElement.width() == 0) { //width() does not include margins and paddings which is perfect in this case
        var that = this;
        this.boxElement.animate({width: '250px', paddingLeft: '5px', paddingRight: '5px'}, {duration: 250, easing: 'swing', complete: function() {
            that.resultsBoxElement.show();
            that.noResultsElement.show();
        }});
    }
    this.boxElement.select(); //Select even if the input box is already open
};

Search.prototype.close = function() {
    if(this.boxElement.width() != 0) {
        this.boxElement.val('');
        this.resultsBoxElement.hide();
        this.boxElement.animate({width: '0', paddingLeft: '0', paddingRight: '0'}, {duration: 450, easing: 'swing'});
    }
};

Search.prototype.search = function(input) {
    $('.search_result').remove(); //Clears the results box
    this.selectedPosition = -1;

    if(input != '') {
        input = input.toLowerCase();
        var results = [];

        for(var i = 0; i < board.nodes.length; i++) {
            if(board.nodes[i].title.toLowerCase().indexOf(input) > -1 || board.nodes[i].text.toLowerCase().indexOf(input) > -1)
                results.push({type: 'node', object: board.nodes[i]});

            for(var j = 0; j < board.nodes[i].subtitles.length; j++) {
                if(board.nodes[i].subtitles[j].title.toLowerCase().indexOf(input) > -1 || board.nodes[i].subtitles[j].text.toLowerCase().indexOf(input) > -1)
                    results.push({type: 'subtitle', object: board.nodes[i].subtitles[j]});
            }

            for(var j = 0; j < board.nodes[i].tags.length; j++) {
                if(board.nodes[i].tags[j].title.toLowerCase().indexOf(input) > -1) {
                    results.push({type: 'node', object: board.nodes[i]}); //Tags are attached to nodes, thus display the node in the search results
                    break;
                }
            }
        }

        if(results.length == 0)
            this.noResultsElement.show();
        else {
            this.noResultsElement.hide();

            for(var i = 0; i < results.length; i++) {
                var current = $('<div>').appendTo(this.resultsBoxElement).addClass('search_result');
                $.data(current[0], 'object', {reference: results[i].object});

                //Add the images
                if(results[i].type == 'node')
                    $('<div>').appendTo(current).addClass('search_nodeResult');
                else if(results[i].type == 'subtitle')
                    $('<div>').appendTo(current).addClass('search_subtitleResult');

                var currentContent = $('<div>').appendTo(current).addClass('search_textResult');
                $('<h3>').appendTo(currentContent).html(results[i].object.title);
                $('<p>').appendTo(currentContent).html(results[i].object.text);
            }
        }

        this.selectedPosition = 0;
        $('.search_result').eq(this.selectedPosition).addClass('search_selected');
    }
};
