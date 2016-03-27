//TODO Only for TextNodes! :O
function ChangeIcon(toolbar) {

    this.boxElement = $('#icon_box');

    Tool.call(this, toolbar, $('#nodeTool_4'), true);

    this.selectIcon = function() { //helper method to add the 'selectedIcon' class to an icon in the icon_box in the toolbar
        var node = this.toolbar.getNodeRef();

        $('.selectedIcon').removeClass('selectedIcon'); //deselect the previous icon
        if(node.icon != 'none') { //outline the current icon
            $('#iconDiv_' + node.icon).addClass('selectedIcon');
        }
        else {
            $('#no_icon').addClass('selectedIcon');
        }
    };

    //EVENTS
    $(document).on('click', '.icon_choice', {context: this}, function(e) { //Changes the icon of the selected node
        var icon_name = $(this).attr('id').replace('iconDiv_', '');
        if(icon_name == 'no_icon') {
            icon_name = 'none';
        }

        var node = e.data.context.toolbar.getNodeRef();
        var previousIcon = node.icon;
        node.setIcon(icon_name); //injects the new icon in the selected node
        e.data.context.selectIcon(); //also select the new icon in the icon_box

        saver.save({action: 'update', id: node.id, icon: icon_name}, Saver.types.CONTENT, true, node, previousIcon);
    });
}

ChangeIcon.prototype = Object.create(Tool.prototype); //create inheritance to object 'Tool'
ChangeIcon.prototype.constructor = ChangeIcon;

ChangeIcon.prototype.actionOn = function() {
    this.boxElement.show();

    //If icons have not yet loaded, load them
    if($('.icon_choice').length <= 1) {
        //Add the "no icon" div in javascript because it was displaying weirdly in html (idk why...)
        //All icons are placed in a wrapper div
        var wrapperDiv = $('<div>').appendTo('#all_icons').addClass('icon_choice selectedIcon').attr({'id': 'no_icon', title: 'No Icon'});
        $('<img>').appendTo(wrapperDiv).attr({'data-src': 'images/icons/x.svg'}).addClass('iconic-md').hide();
        injectIcon('#no_icon img');

        var that = this;
        $.getJSON("server_side/listIcons.php", function(data) {
            for(var i = 0; i < data.length; i++) {
                var name = data[i].replace(/\.svg/, ''); //remove the file extension from the name of the icon
                var wrapperDiv = $('<div>').appendTo('#all_icons').addClass('icon_choice').attr({'id': 'iconDiv_' + name, title: name});
                $('<img>').appendTo(wrapperDiv).attr({'data-src': 'images/icons/' + data[i], id: name + '_icon'}).addClass('iconic-md').hide();

                injectIcon('#iconDiv_' + name + ' img'); //inject the icon using Iconic
            }

            that.selectIcon(); //outline the current icon. Would trigger before server response when placed after the 'if' statement

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("An error occured while trying to load icons. Please check your internet connection and try again later.");
        });
    }
    else {
        this.selectIcon(); //outline the current icon
    }
};

ChangeIcon.prototype.actionOff = function() {
    this.boxElement.hide();
};
