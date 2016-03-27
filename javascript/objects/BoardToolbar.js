function BoardToolbar() {

    if(User.canEdit)
        this.element = $('#boardToolbar');

    this.tools = [];
    this.selectedTool = null;

    //Add all tools
    this.tools.push(new MoveTool(this));
    if(User.canEdit) {
        this.tools.push(new DeleteTool(this));
        this.tools.push(new LinkTool(this));
        this.tools.push(new AddNode(this));
        this.tools.push(new Undo(this));
        this.tools.push(new BoardProperties(this));
    }

    this.tools[0].select(); //Select the first tool (The Move tool)

    $(document).on('click', '.boardTool', function(e) { //Event listener for board tools
        if(!board.contentShower.editing) { //User can only use tools if the content of the node/subtitle is not being edited
            $.data(this, 'object').reference.mouseClicked(); //Note that "this" refers to the DOM element
        }
    });
}
