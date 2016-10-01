function init_tools () {
    // {{{
    var toggle_empty_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 7 7, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4, m -46 10, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4, m -46 10, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4" fill="transparent" stroke="lightgray" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var toggle_empty_tool = {
        id: 'toggle-empty',
        description: 'Show/hide the empty cell indicator',
        select: function (ns, option) {
            ns.show_empty = !ns.show_empty;
        },
        icon_toolbar: toggle_empty_icon,
        icon_mouse: toggle_empty_icon,
    }

    // {{{
    var toggle_bold_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 5 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 43 10, h 6, a 4 4 0 1 1 0 8, a 5 5 0 1 1 0 10, h -6, m 1 0, v -18, m 0 8, h 5" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M 19 20, l 7 -7, v 4, h 7, v -4, l 7 7, l -7 7, v -4, h -7, v 4, l -7 -7" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var toggle_bold_tool = {
        id: 'toggle-bold',
        description: 'Toggle bold',
        work: function (ns, targets) {
            var all_bold = targets.every(function (x) {
                return x.bold;
            });
            for (var i = 0; i < targets.length; i++) {
                targets[i].bold = !all_bold;
            }
        },
        icon_toolbar: toggle_bold_icon,
        icon_mouse: toggle_bold_icon,
    };

    var colors = [
        [['#FF4500', 'Sunset Orange'],   ['#800000', 'Maroon']],
        [['#FF8C00', 'Dark Orange'],     ['#8B4500', 'Dark Orange 4']],
        [['#FFD700', 'Gold Yellow'],     ['#8B7500', 'Gold 4']],
        [['#7CFC00', 'Lawn Green'],      ['#008B00', 'Green 4']],
        [['#00FFFF', 'Aqua'],            ['#008B8B', 'Cyan 4']],
        [['#1E90FF', 'Dodger Blue'],     ['#104E8B', 'Dodger Blue 4']],
        [['#8000FF', 'Electric Indigo'], ['#4B0082', 'Indigo']],
        [['#BF3EFF', 'Dark Orchid 1'],   ['#68228B', 'Dark Orchid 4']],
        [['#FF00FF', 'Fuchsia'],         ['#8B008B', 'Magenta 4']],
        [['#FFFFFF', 'White'],           ['#000000', 'Black']],
        [['#D3D3D3', 'Light gray'],      ['#808080', 'Gray']],
    ];
    // {{{
    var paint_text_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 9 6, h 24, l 1 1, v 4, l -1 1, h -8, l -1 1, v 20, l -1 1, h -4, l -1 -1, v -20, l -1 -1, h -8, l -1 -1, v -4, l 1 -1" fill="{{ tool_values.pen_color || \''+ colors[0][0][0] +'\' }}" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 34 26, l 15 -15, l 1 1, l -15 15, l -1 -1" fill="brown" stroke="brown" stroke-linecap="round" stroke-linejoin="round"/><path d="M 33 27, l 1 1, a 5 5 0 0 1 -6 3, c 3 0 2 -4 5 -4" fill="gray" stroke="gray" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var paint_text_options = [];
    for (var i = 0; i < colors.length; i++) {
        var tmp = [];
        for (var j = 0; j < colors[i].length; j++) {
            tmp.push({
                'value': colors[i][j][0],
                'icon': '<svg viewbox="0 0 20 20" width="20" height="20">'+
                    '<rect width="20" height="20" fill="'+ colors[i][j][0] +'"/>'+
                    '</svg>',
                'description': colors[i][j][1],
            });
        }
        paint_text_options.push(tmp);
    }
    var paint_text_tool = {
        id: 'paint-text',
        description: 'Change text color',
        options: paint_text_options,
        value: paint_text_options[0][0].value,
        select: function (ns, value) {
            if (value) {
                this.value = value;
                return {'pen_color': value};
            }
        },
        work: function (ns, targets) {
            for (var i = 0; i < targets.length; i++) {
                targets[i].color = this.value;
            }
        },
        icon_toolbar: paint_text_icon,
        icon_mouse: paint_text_icon,
    };

    // {{{
    var export_json_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 8 5, v 30, h 25, v -5, m 0 -16, v -4, h -5, v -5, l 5 5, m -5 -5, h -20" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 17 14, v 16, h 20, v 5, l 17 -13, l -17 -13, v 5, h -20" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 20 17, h 4, m -1 0, v 8, a 2 2 0 1 1 -4 0" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 25 17, m 6 3, a 3 2.5 0 1 0 -3 2, a 3 2.5 0 1 1 -3 2" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 33 17, m 2 0, a 3 5 0 1 0 0 10, a 3 5 0 1 0 0 -10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 40 17, v 10, m 0 -10, l 5 10, v -10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var export_json_tool = {
        id: 'export-json',
        description: 'Export to JSON',
        select: function (ns, option) {},
        icon_toolbar: export_json_icon,
        icon_mouse: export_json_icon,
    }

    // {{{
    var import_json_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 8 5, v 30, h 22, v -5, m 0 -18, v -2, h -5, v -5, l 5 5, m -5 -5, h -17" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 17 12, m 0 9, l 17 -11, v 3, h 20, v 16, h -20, v 3, l -17 -11" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 27 16, h 4, m -1 0, v 8, a 2 2 0 1 1 -4 0" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 32 16, m 6 3, a 3 2.5 0 1 0 -3 2, a 3 2.5 0 1 1 -3 2" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 40 16, m 2 0, a 3 5 0 1 0 0 10, a 3 5 0 1 0 0 -10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 47 16, v 10, m 0 -10, l 5 10, v -10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var import_json_tool = {
        id: 'import-json',
        description: 'Import from JSON',
        select: function (ns, option) {},
        icon_toolbar: import_json_icon,
        icon_mouse: import_json_icon,
    }

    // {{{
    var export_rst_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 8 5, v 30, h 25, v -5, m 0 -16, v -4, h -5, v -5, l 5 5, m -5 -5, h -20" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 8 5, m 14 9, v 16, h 15, v 5, l 17 -13, l -17 -13, v 5, h -15" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 25 17, v 10, m 0 -10, h 3, a 3 3 0 1 1 0 6, h -3, m 3 0, l 3 4" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 33 17, m 6 3, a 3 2.5 0 1 0 -3 2, a 3 2.5 0 1 1 -3 2" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 40 17, h 6, m -3 0, v 10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var export_rst_tool = {
        id: 'export-rst',
        description: 'Export to RST',
        select: function (ns, option) {},
        icon_toolbar: export_rst_icon,
        icon_mouse: export_rst_icon,
    }

    return [
        toggle_empty_tool,
        toggle_bold_tool,
        paint_text_tool,
        export_json_tool,
        import_json_tool,
        export_rst_tool,
    ];
}
