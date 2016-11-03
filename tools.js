function init_tools (new_cell) {
    // {{{
    var toggle_empty_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 7 7, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4, m -46 10, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4, m -46 10, h 4, m 10 0, h 4, m 10 0, h 4, m 10 0, h 4" fill="transparent" stroke="lightgray" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var toggle_empty_tool = {
        id: 'toggle-empty',
        description: 'Show/hide the empty cell indicator',
        select: function (ns, value) {
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
        [['#FFFFFF', 'White'], ['#FFECE6', 'Toothpaste Pink'],    ['#FFA280', 'My Red'],     ['#FF4500', 'Sunset Orange'],   ['#800000', 'Maroon']],
        [['#DFDFDF', '87%'],   ['#FFE8CC', 'Toothpaste Orange'],  ['#FFC680', 'My Orange'],  ['#FF8C00', 'Dark Orange'],     ['#8B4500', 'Dark Orange 4']],
        [['#BFBFBF', '75%'],   ['#FFF7CC', 'Toothpaste Yellow'],  ['#FFEC80', 'My Yellow'],  ['#FFD700', 'Gold Yellow'],     ['#8B7500', 'Gold 4']],
        [['#9F9F9F', '62%'],   ['#E6FFCC', 'Toothpaste Green'],   ['#BFFF80', 'My Green'],   ['#7CFC00', 'Lawn Green'],      ['#008B00', 'Green 4']],
        [['#808080', '50%'],   ['#CCFFFF', 'Toothpaste Cyan'],    ['#99FFFF', 'My Cyan'],    ['#00FFFF', 'Aqua'],            ['#008B8B', 'Cyan 4']],
        [['#606060', '37%'],   ['#CCE6FF', 'Toothpaste Blue'],    ['#80BFFF', 'My Blue'],    ['#1E90FF', 'Dodger Blue'],     ['#104E8B', 'Dodger Blue 4']],
        [['#404040', '25%'],   ['#E6CCFF', 'Toothpaste Indigo'],  ['#BF80FF', 'My Indigo'],  ['#8000FF', 'Electric Indigo'], ['#4B0082', 'Indigo']],
        [['#202020', '12%'],   ['#EECCFF', 'Toothpaste Orchid'],  ['#DD99FF', 'My Orchid'],  ['#BF3EFF', 'Dark Orchid 1'],   ['#68228B', 'Dark Orchid 4']],
        [['#000000', 'Black'], ['#FFCCFF', 'Toothpaste Magenta'], ['#FF80FF', 'My Magenta'], ['#FF00FF', 'Fuchsia'],         ['#8B008B', 'Magenta 4']],
    ];
    // {{{
    var paint_text_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 9 6, h 24, l 1 1, v 4, l -1 1, h -8, l -1 1, v 20, l -1 1, h -4, l -1 -1, v -20, l -1 -1, h -8, l -1 -1, v -4, l 1 -1" fill="{{ tool_values.pen_color || \''+ colors[0][0][0] +'\' }}" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 34 26, l 15 -15, l 1 1, l -15 15, l -1 -1" fill="brown" stroke="brown" stroke-linecap="round" stroke-linejoin="round"/><path d="M 33 27, l 1 1, a 5 5 0 0 1 -6 3, c 3 0 2 -4 5 -4" fill="gray" stroke="gray" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var color_options = [];
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
        color_options.push(tmp);
    }
    var paint_text_tool = {
        id: 'paint-text',
        description: 'Change text color',
        options: color_options,
        value: color_options[0][0].value,
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
    var paint_cell_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 17 20, l 14 14, a 7 2 -45 1 0 14 -14, l -14 -14, a 7 2 -45 1 1 -14 14" fill="lightgray" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 17 20, a 7 2 -45 1 1 14 -14, a 7 2 -45 1 1 -14 14" fill="#b0b0b0" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 22 25, a 7 2 -45 1 0 14 -14, l 4 4, a 7 2 -45 0 1 -14 14, l -4 -4" fill="{{ tool_values.bucket_color || \''+ colors[0][0][0] +'\' }}" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 24 17, l -6 0, l -1 1, a 15 1 -85 1 0 2 2" fill="{{ tool_values.bucket_color || \''+ colors[0][0][0] +'\' }}" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var paint_cell_tool = {
        id: 'paint-cell',
        description: 'Change cell color',
        options: color_options,
        value: color_options[0][0].value,
        select: function (ns, value) {
            if (value) {
                this.value = value;
                return {'bucket_color': value};
            }
        },
        work: function (ns, targets) {
            for (var i = 0; i < targets.length; i++) {
                targets[i].background = this.value;
            }
        },
        icon_toolbar: paint_cell_icon,
        icon_mouse: paint_cell_icon,
    };

    // {{{
    var export_rst_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 8 5, v 30, h 25, v -5, m 0 -16, v -4, h -5, v -5, l 5 5, m -5 -5, h -20" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 8 5, m 14 9, v 16, h 15, v 5, l 17 -13, l -17 -13, v 5, h -15" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 25 17, v 10, m 0 -10, h 3, a 3 3 0 1 1 0 6, h -3, m 3 0, l 3 4" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 33 17, m 6 3, a 3 2.5 0 1 0 -3 2, a 3 2.5 0 1 1 -3 2" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 40 17, h 6, m -3 0, v 10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var export_tool = {
        id: 'export',
        description: 'Export to ...',
        options: [
            [{
                value: 'RST',
                description: 'RST'
            }],
            [{
                value: 'CSV',
                description: 'CSV'
            }],
            [{
                value: 'JSON',
                description: 'JSON'
            }],
        ],
        select: function (ns, value) {
            if (value === undefined || value == 'RST') {
                var table = _.map(ns.table, function (row) {
                    return _.map(row, function (cell) {
                        return cell.text.split('\n');
                    });
                });

                var row_height = _.map(table, function (row) {
                    return _.chain(row).map(function (lines) {
                        return lines.length;
                    }).max().value();
                });

                var col_width = _.chain(table)
                    .unzip()
                    .map(function (col) {
                        return _.chain(col).flatten().map(function (line) {
                            return line.replace(/[\u4e00-\u9fcc]/g, 'aa').length;
                        }).max().value();
                    }).value();

                var hori_line = col_width.reduce(function (memo, width) {
                    return memo + '-'.repeat(width + 2) + '+';
                }, '+');

                function ljust (text, width) {
                    return text + ' '.repeat(width - text.replace(/[\u4e00-\u9fcc]/g, 'aa').length);
                }

                ns.output = table.reduce(function (memo, row) {
                    return memo
                        + _.chain(row).unzip()
                        .reduce(function (memo, partial_row) {
                            return memo + '\n|' + _.map(partial_row, function (text, colx) {
                                return text ? ' ' + ljust(text, col_width[colx] + 1) : ljust('', col_width[colx] + 2);
                            }).join('|') + '|';
                        }, '')
                        .value() + '\n' + hori_line;
                }, hori_line);
            } else if (value == 'CSV') {
                ns.output = Papa.unparse(_.map(ns.table, function (row) {
                    return _.map(row, function (cell) {
                        return cell.text;
                    });
                }));
            }
        },
        icon_toolbar: export_rst_icon,
        icon_mouse: export_rst_icon,
    }

    // {{{
    var import_csv_icon = '<rect width="60" height="40" fill="transparent" stroke="black"/><path d="M 8 5, v 30, h 22, v -5, m 0 -18, v -2, h -5, v -5, l 5 5, m -5 -5, h -17" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 17 12, m 0 9, l 17 -11, v 3, h 17, v 16, h -17, v 3, l -17 -11" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 32 18, a 3 5 0 1 0 0 6" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 34 16, m 6 3, a 3 2.5 0 1 0 -3 2, a 3 2.5 0 1 1 -3 2" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/><path d="M 42 16, l 2.5 10, l 2.5 -10" fill="transparent" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>';
    // }}}
    var import_tool = {
        id: 'import',
        description: 'Import from ...',
        options: [
            [{
                value: 'CSV',
                description: 'CSV'
            }],
            [{
                value: 'JSON',
                description: 'JSON'
            }],
        ],
        select: function (ns, value) {
            console.log(value);
            if (value == undefined || value == 'CSV') {
                var data = Papa.parse(document.getElementById('input').value);
                ns.table = _.map(data.data, function (row) {
                    return _.map(row, function (text) {
                        return new_cell(text);
                    });
                });
            }
        },
        icon_toolbar: import_csv_icon,
        icon_mouse: import_csv_icon,
    }

    return [
        toggle_empty_tool,
        toggle_bold_tool,
        paint_text_tool,
        paint_cell_tool,
        export_tool,
        import_tool,
    ];
}
